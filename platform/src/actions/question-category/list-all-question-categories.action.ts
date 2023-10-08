"use server";

import { ListAllQuestionCategoriesUseCase } from "@/application/question-category/list-all-question-categories.use-case";
import { PrismaQuestionCategoryRepository } from "@/repositories/prisma/prisma-question-category.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function listAllQuestionCategories() {
  const prismaQuestionCategoryRepository =
    new PrismaQuestionCategoryRepository();

  const listAllQuestionCategoriesUseCase = new ListAllQuestionCategoriesUseCase(
    prismaQuestionCategoryRepository
  );
  return listAllQuestionCategoriesUseCase.execute();
}

export async function wrapperListAllQuestionCategoriesServerToClient(
  ...arags: Parameters<typeof listAllQuestionCategories>
) {
  const ressult = await listAllQuestionCategories(...arags);
  return convertEitherToEitherJSON(ressult);
}
