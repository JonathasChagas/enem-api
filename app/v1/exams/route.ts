import { NextRequest, NextResponse } from 'next/server';
import { getExams } from '@/lib/api/exams/get-exams';
import { handleAndReturnErrorResponse } from '@/lib/api/errors';

export async function GET(request: NextRequest) {
    try {
        const exams = await getExams();

        return NextResponse.json(exams);
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}
