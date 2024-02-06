import { NextResponse } from 'next/server';

export function middleware(request) {
	const accessToken = request.cookies.get('accessToken');
    console.log('accessToken', accessToken);
	if (accessToken?.value) {
		return NextResponse.redirect(new URL('/dashboard/overview', request.url));
	}
	return NextResponse.redirect(new URL('/auth/login', request.url));
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
