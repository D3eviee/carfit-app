import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest){
    const token = req.cookies.get("ClientToken")?.value
    if(!token) return NextResponse.next();

    try{
        return NextResponse.next();
    }catch{
        return NextResponse.redirect(new URL('/', req.url))
    }
}

export const config = {
    matcher: ["/onboarding", "/sign-in"],
}