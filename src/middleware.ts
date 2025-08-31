import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/auth/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session && !pathname.startsWith("/account")) {
        return NextResponse.redirect(new URL("/account/login", request.url));
    }
    if (session && pathname.startsWith("/account")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};