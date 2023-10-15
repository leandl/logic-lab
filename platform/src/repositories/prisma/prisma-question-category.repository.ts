import { prisma } from "@/lib/prisma";
import { QuestionCategory as PrismaQuestionCategory } from "@prisma/client";
import {
  QuestionCategory,
  QuestionCategoryCreate,
  QuestionCategoryRepository,
} from "@/repositories/question-category.repository";

function convertPrismaQuestionCategoryToQuestionCategory(
  category: PrismaQuestionCategory
): QuestionCategory {
  return {
    id: category.id,
    name: category.name,
  };
}

export class PrismaQuestionCategoryRepository
  implements QuestionCategoryRepository
{
  async findById(categoryId: number): Promise<QuestionCategory | null> {
    const category = await prisma.questionCategory.findUnique({
      where: {
        id: categoryId,
      },
    });

    return (
      category && convertPrismaQuestionCategoryToQuestionCategory(category)
    );
  }

  async findByName(categoryName: string): Promise<QuestionCategory | null> {
    const category = await prisma.questionCategory.findFirst({
      where: {
        name: categoryName,
      },
    });

    return (
      category && convertPrismaQuestionCategoryToQuestionCategory(category)
    );
  }

  async getAll(): Promise<QuestionCategory[]> {
    const categories = await prisma.questionCategory.findMany();
    return categories.map(convertPrismaQuestionCategoryToQuestionCategory);
  }

  async create(newCategory: QuestionCategoryCreate): Promise<QuestionCategory> {
    const category = await prisma.questionCategory.create({
      data: { name: newCategory.name },
    });

    return (
      category && convertPrismaQuestionCategoryToQuestionCategory(category)
    );
  }
}
