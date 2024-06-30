import { NextResponse } from 'next/server';

export function middleware(request) {
	const userAccessToken = request.cookies.get('accessToken');
	if (userAccessToken?.value) {
		if (request.nextUrl?.pathname && !request.nextUrl.pathname.startsWith('/dashboard')) {
			return NextResponse.redirect(new URL('/dashboard/overview', request.url));
		}
	} else {
		if (request.nextUrl?.pathname && request.nextUrl.pathname.startsWith('/dashboard')) {
			return NextResponse.redirect(new URL('/auth/login', request.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
