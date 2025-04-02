import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const apiKey = req.headers.get("enem-api-key");

	if (!apiKey || apiKey !== process.env.ENEM_API_KEY) {
		return NextResponse.json(
			{ error: "Forbidden: Missing or invalid API key" },
			{ status: 403 }
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/v1/:path*",
};