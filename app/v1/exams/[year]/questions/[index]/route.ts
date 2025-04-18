import { NextRequest } from 'next/server';
import { getSearchParamsAsObject } from '@/lib/utils';
import { GetQuestionDetailsQuerySchema } from '@/lib/zod/schemas/questions';
import { EnemApiError, handleAndReturnErrorResponse } from '@/lib/api/errors';
import { getExamDetails } from '@/lib/api/exams/get-exam-details';
import { getQuestionDetails } from '@/lib/api/questions/get-question-details';

type Params = {
    year: string;
    index: string;
};

export async function GET(
    request: NextRequest,
    { params }: { params: Params },
) {
    try {
        const searchParams = request.nextUrl.searchParams;

        let { language } = GetQuestionDetailsQuerySchema.parse(
            getSearchParamsAsObject(searchParams),
        );

        const exam = await getExamDetails(params.year);

        if (!exam) {
            throw new EnemApiError({
                code: 'not_found',
                message: `No exam found for year ${params.year}`,
            });
        }

        if (language && !exam.languages.find(lang => lang.value === language)) {
            throw new EnemApiError({
                code: 'bad_request',
                message: `Language ${language} not found in exam`,
            });
        }

        if (!language && exam.languages.length > 0) {
            language = exam.languages[0].value;
        }

        const questionDetails = await getQuestionDetails({
            year: params.year,
            index: params.index,
            language,
        });

        if (!questionDetails) {
            throw new EnemApiError({
                code: 'not_found',
                message: `Question ${params.index} not found in exam ${params.year}`,
            });
        }

        return Response.json(questionDetails);
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}
