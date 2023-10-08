"use server";

import { UpdateQuestionUseCase } from "@/application/question/update-question.use-case";
import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question.repository";
import { QuestionCreate } from "@/repositories/question.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function updateQuestion(
  questionId: number,
  newQuestion: QuestionCreate
) {
  const prismaQuestionRepository = new PrismaQuestionRepository();
  const updateQuestionUseCase = new UpdateQuestionUseCase(
    prismaQuestionRepository
  );
  return updateQuestionUseCase.execute({
    questionId,
    question: newQuestion,
  });
}

export async function wrapperUpdateQuestionServerToClient(
  ...arags: Parameters<typeof updateQuestion>
) {
  const ressult = await updateQuestion(...arags);
  return convertEitherToEitherJSON(ressult);
}
