import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";
import bcrypt from "bcryptjs";
import { createSession } from "../../../lib/session";
import { z } from "zod";

export async function POST(req: NextRequest) {
    try {
        const {email, password } = await req.json();

        // Check if user already exists
        const existingUser = await prisma.client.findUnique({
            where: { email: email },
        })

        if(!existingUser){
            return NextResponse.json({ error: "Użytkownik nie istnieje" }, {status: 409});
        }else{
            const isPasswordValid = await bcrypt.compare(password, existingUser.password as string)
            if(isPasswordValid){
                const user = {
                    id: existingUser.id
                }

                await createSession(user)
                return NextResponse.json({ success: true}, { status: 201 },);
            }
            else{
                return NextResponse.json({ error: "Podane dane są nieprawidłowe" }, { status: 401 });
            }
        }
    } catch{
        return NextResponse.json({ error: "Wystąpił problem podczas próby logowania" }, { status: 500 });
    }
}
