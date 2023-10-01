"use server";

import { CreateQuestionCategoryUseCase } from "@/application/question-categoty/create-question-categoty.use-case";
import { PrismaQuestionCategoryRepository } from "@/repositories/prisma/prisma-question-category.repository";
import { QuestionCategory } from "@/repositories/question-category.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function createQuestionCategory(
  newQuestionCategory: QuestionCategory
) {
  const prismaQuestionCategoryRepository =
    new PrismaQuestionCategoryRepository();
  const createQuestionCategoryUseCase = new CreateQuestionCategoryUseCase(
    prismaQuestionCategoryRepository
  );
  return createQuestionCategoryUseCase.execute(newQuestionCategory);
}

export async function wrapperCreateQuestionCategoryServerToClient(
  ...arags: Parameters<typeof createQuestionCategory>
) {
  const ressult = await createQuestionCategory(...arags);
  return convertEitherToEitherJSON(ressult);
}
