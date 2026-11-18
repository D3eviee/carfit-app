'use server'
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from './db';
import { createBusinessSession } from './session'

type AuthResult =
  | { success: true; id: string }
  | { success: false; message: string }

export type AuthRole =
  | { role: "CLIENT"; id: string }
  | { role: "BUSINESS"; id: string }
  | { role: "NONAUTHORIZED"; id: "" }

const verifyTokenCookie = async (cookieName: string): Promise<AuthResult> => {
    const cookieSession = await cookies()
    const token = cookieSession.get(cookieName)?.value
    if (!token) return { success: false, message: "Odmowa dostępu. Użytkownik niezalogowany" }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload
        if (typeof decoded.id !== "string") return { success: false, message: "Nieprawidłowy token" }
        return { success: true, id: decoded.id }
    } catch {
        return { success: false, message: "Sesja wygasła. Zaloguj się ponownie" }
    }
}

export const userAuth = async (): Promise<AuthResult> => verifyTokenCookie("ClientToken")
export const businessAuth = async (): Promise<AuthResult> => verifyTokenCookie("ServiceToken")

export const authRole = async (): Promise<AuthRole> => {
    const [user, business] = await Promise.all([userAuth(), businessAuth()])
    
    if (user.success) return { role: "CLIENT", id: user.id }
    if (business.success) return { role: "BUSINESS", id: business.id }
    return { role: "NONAUTHORIZED", id: "" }
}

export const logout = async () => {
  const cookieSession = await cookies()
  cookieSession.delete("ClientToken")
  cookieSession.delete("ServiceToken")
}


export const businessSignIn = async (data: { email: string; password: string }) => {
    try{
        const { email, password } = data
  
        const serviceData = await prisma.business.findUnique({
          where: { email }
        });
      
        if (!serviceData) {
          return { success: false, error: "Account with this email doesn't exist" };
        }
      
        const isPasswordValid = await bcrypt.compare(password, serviceData.password);
      
        if (!isPasswordValid) {
          return { success: false, error: "Invalid password" };
        }

        const session = await createBusinessSession(serviceData)
        if (session.success) {
            return {success: true, message: "User loged in"}
        }
        return {success: false, error: "Unexpected error occured"}

    }catch(error){
        return {success: false, error: `Unexpected error occured:  ${error}`}
    }
};
