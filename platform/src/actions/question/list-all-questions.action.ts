"use server";

import { ListAllQuestionsUseCase } from "@/application/question/list-all-questions.use-case";
import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function listAllQuestions() {
  const prismaQuestionRepository = new PrismaQuestionRepository();

  const listAllQuestionsUseCase = new ListAllQuestionsUseCase(
    prismaQuestionRepository
  );
  return listAllQuestionsUseCase.execute();
}

export async function wrapperListAllQuestionsServerToClient(
  ...arags: Parameters<typeof listAllQuestions>
) {
  const ressult = await listAllQuestions(...arags);
  return convertEitherToEitherJSON(ressult);
}
