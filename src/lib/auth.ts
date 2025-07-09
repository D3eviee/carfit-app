'use server'
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import prisma from './db';
import { createBusinessSession } from './session';

export const businessAuth = async () => {
    const cookieSession = await cookies();
    const token = cookieSession.get("ServiceToken")?.value

    if(!token) {
        return { success: false, id: null}
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        const { id } = decoded;
        return { success: true, id: id}
    } catch (err) {
        return {success: false,  error: `There was an error with your authorization: ${err}` };
    }
}

export const userAuth = async () => {
    const cookieSession = await cookies();
    const token = cookieSession.get("ClientToken")?.value

    if(!token) {
       return { success: false, id: null}
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        const { id } = decoded;
        return { success: true, id: id}
    } catch (err) {
        return {success: false,  error: `There was an error with your authorization: ${err}` };
    }
}

export const authRole = async () => {
    const user = await userAuth()
    const business = await businessAuth()

    if(user.success){
        return {
            role: "CLIENT",
            id: user.id
        }
    }
    else if(business.success){
        return {
            role: "BUSINESS",
            id: business.id,
        }
    }
    else return {id: "", role: "NONAUTHORIZED"}
} 

export const logout = async () => {
    const cookieSession = await cookies()

    const serviceToken = cookieSession.get("ServiceToken")?.value
    const clientToken = cookieSession.get("ClientToken")?.value

    if(clientToken) cookieSession.delete('ClientToken')   
    if(serviceToken) cookieSession.delete('ServiceToken')
        
    redirect('/')
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