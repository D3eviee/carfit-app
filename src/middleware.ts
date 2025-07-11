// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const BUSINESS_PATHS = ['/dashboard']
const USER_PATHS = ['/user']

const middlewareAuth = (req: NextRequest) => {
    const serviceToken = req.cookies.get("ServiceToken")?.value || null
    const clientToken = req.cookies.get("ClientToken")?.value || null

    if (serviceToken) return { role: "BUSINESS" }
    else if (clientToken) return { role: "CLIENT" }
    else return { role: "UNSIGNED" }
}

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const auth = middlewareAuth(req) 

    console.log(auth.role)

    // protected business routes
    if (BUSINESS_PATHS.some(path => pathname.startsWith(path))) {
        if (auth.role !== "BUSINESS") {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    // protected client routes
    if (USER_PATHS.some(path => pathname.startsWith(path))) {
        if (auth.role !== 'CLIENT') {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/user/:path*'],
}