"use server";

import { CreateQuestionUseCase } from "@/application/question/create-question.use-case";
import { PrismaQuestionRepository } from "@/repositories/prisma/prisma-question.repository";
import { PrismaRoomRepository } from "@/repositories/prisma/prisma-room.repository";
import { QuestionCreate } from "@/repositories/question.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function createQuestion(newQuestion: QuestionCreate) {
  const prismaQuestionRepository = new PrismaQuestionRepository();
  const prismaRoomRepository = new PrismaRoomRepository();

  const createQuestionUseCase = new CreateQuestionUseCase(
    prismaQuestionRepository,
    prismaRoomRepository
  );

  return createQuestionUseCase.execute(newQuestion);
}

export async function wrapperCreateQuestionServerToClient(
  ...arags: Parameters<typeof createQuestion>
) {
  const ressult = await createQuestion(...arags);
  return convertEitherToEitherJSON(ressult);
}
