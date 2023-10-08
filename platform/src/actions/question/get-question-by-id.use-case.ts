"use server";

import { GetQuestionByIdUseCase } from "@/application/question/get-question-by-id.use-case";
import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function getQuestionById(questionId: number) {
  const prismaQuestionRepository = new PrismaQuestionRepository();
  const getQuestionByIdUseCase = new GetQuestionByIdUseCase(
    prismaQuestionRepository
  );
  return getQuestionByIdUseCase.execute(questionId);
}

export async function wrapperGetQuestionByIdServerToClient(
  ...arags: Parameters<typeof getQuestionById>
) {
  const ressult = await getQuestionById(...arags);
  return convertEitherToEitherJSON(ressult);
}
