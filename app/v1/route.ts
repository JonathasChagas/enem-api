import { document } from '@/lib/openapi';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export function GET(req: NextRequest) {
	const apiKey = req.headers.get('enem-api-key');
	
	if (!apiKey || apiKey !== process.env.ENEM_API_KEY) {
		return NextResponse.json (
			{ error: 'Forbidden: Missing or invalid API key' },
			{ status: 403 }
		);
	}

    return NextResponse.json(document);
}
