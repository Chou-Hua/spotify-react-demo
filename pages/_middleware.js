import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    const token = await getToken({
        req,
        secret: process.env["JWT_SECRET"],
    });
    const {pathname} = req.nextUrl

    // Allow the request if the following is true:
    // 1) it's a request to next-auth session
    // 2) the token exists

    if (pathname.includes('/api/auth') || token) {
        console.log('name', pathname);
        console.log('jwt', token);
        return NextResponse.next()
    }
    if (!token && pathname !== url.pathname) {
        return NextResponse.rewrite(url)
    }
}