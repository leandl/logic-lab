"use server";

import { convertEitherToEitherJSON } from "@/utils/patterns";
import { QuestionService } from "@/services/question.service";
import {
  ValidateCodeQuestionInput,
  ValidateCodeQuestionUseCase,
} from "@/application/question/validate-code-question.use-case";

export async function validateCodeQuestion({
  code,
  question,
}: ValidateCodeQuestionInput) {
  const questionService = new QuestionService();
  const validateCodeQuestionUseCase = new ValidateCodeQuestionUseCase(
    questionService
  );
  return validateCodeQuestionUseCase.execute({ question, code });
}

export async function wrapperValidateCodeQuestionUseCaseServerToClient(
  ...arags: Parameters<typeof validateCodeQuestion>
) {
  const ressult = await validateCodeQuestion(...arags);
  return convertEitherToEitherJSON(ressult);
}
