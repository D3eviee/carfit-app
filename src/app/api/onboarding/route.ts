import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import {createSession} from "@/lib/session";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { fullname, phone, email, password } = await req.json()

        // check whether the user with that phone, email exsists
        const emailExists = await prisma.client.findUnique({ where: {email: email }})
        const phoneExist = await prisma.client.findUnique({ where: {phone: phone}})
        if (emailExists) return NextResponse.json({ error: "Użytkownik z podanym adresem email już istnieje" }, { status: 409 });
        if (phoneExist) return NextResponse.json({ error: "Użytkownik z podanym numerem telefonu już istnieje" }, { status: 409 });


        // if user does not exist: hash password and create user in the database
        const securePassword = await bcrypt.hash(password, 10)
        const user = await prisma.client.create({
            data: {
                name: fullname,
                email,
                phone,
                password: securePassword
            }
        })

        //create sesssion
        const session = await createSession(user)
        if (session.success) return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Wystąpił problem podczas próby rejestracji" + error }, { status: 500 });
    }
}
