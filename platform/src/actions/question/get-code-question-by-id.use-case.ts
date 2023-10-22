"use server";

import { GetCodeQuestionByIdUseCase } from "@/application/question/get-code-question-by-id.use-case";
import { convertEitherToEitherJSON } from "@/utils/patterns";
import { getQuestionById } from "./get-question-by-id.use-case";
import { QuestionService } from "@/services/question.service";

export async function getCodeQuestionById(questionId: number) {
  const result = await getQuestionById(questionId);

  if (result.isLeft()) {
    return result;
  }

  const question = result.value;
  const questionService = new QuestionService();
  const getCodeQuestionByIdUseCase = new GetCodeQuestionByIdUseCase(
    questionService
  );
  return getCodeQuestionByIdUseCase.execute(question);
}

export async function wrapperGetCodeQuestionByIdServerToClient(
  ...arags: Parameters<typeof getCodeQuestionById>
) {
  const ressult = await getCodeQuestionById(...arags);
  return convertEitherToEitherJSON(ressult);
}
