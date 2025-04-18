import { NextRequest, NextResponse } from 'next/server';
import { getExams } from '@/lib/api/exams/get-exams';
import { getExamDetails } from '@/lib/api/exams/get-exam-details';
import { EnemApiError, handleAndReturnErrorResponse } from '@/lib/api/errors';

const getExamsYears = async () => {
    const exams = await getExams();
    return exams.map(exam => exam.year);
};

export async function GET(
    request: NextRequest,
    { params }: { params: { year: string } },
) {
    try {
        const examYears = await getExamsYears();

        if (!examYears.includes(Number(params.year))) {
            throw new EnemApiError({
                code: 'not_found',
                message: `No exam found for year ${params.year}`,
            });
        }

        const exam = await getExamDetails(params.year);

        return NextResponse.json(exam);
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}
