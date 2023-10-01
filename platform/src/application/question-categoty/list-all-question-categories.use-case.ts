import {
  QuestionCategory,
  QuestionCategoryRepository,
} from "@/repositories/question-category.repository";
import { Either, Right } from "@/utils/patterns";

export enum ListAllQuestionCategoriesUseCaseError {
  CATEGORY_IN_USE = "CATEGORY_IN_USE",
}

type ListAllQuestionCategoriesOutput = QuestionCategory[];

export class ListAllQuestionCategoriesUseCase {
  constructor(private questionCategoryRepo: QuestionCategoryRepository) {}

  async execute(): Promise<
    Either<
      ListAllQuestionCategoriesUseCaseError,
      ListAllQuestionCategoriesOutput
    >
  > {
    const categories = await this.questionCategoryRepo.getAll();
    return Right.create(categories);
  }
}
