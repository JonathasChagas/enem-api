import { RateLimiter } from '@/lib/api/rate-limit';
import { NextRequest, NextResponse } from 'next/server';
import { getExams } from '@/lib/api/exams/get-exams';
import { handleAndReturnErrorResponse } from '@/lib/api/errors';

const rateLimiter = new RateLimiter();

export async function GET(request: NextRequest) {
    try {
        const { rateLimitHeaders } = rateLimiter.check(request);

        const exams = await getExams();

        return NextResponse.json(exams, { headers: rateLimitHeaders });
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}
