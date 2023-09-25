import {
  QuestionCategory,
  QuestionCategoryRepository,
} from "@/repositories/question-category.repository";
import { Either, Right } from "@/utils/patterns";

export enum ListAllQuestionCategotiesUseCaseError {
  CATEGORY_IN_USE = "CATEGORY_IN_USE",
}

type ListAllQuestionCategotiesOutput = QuestionCategory[];

export class ListAllQuestionCategotiesUseCase {
  constructor(private questionCategoryRepo: QuestionCategoryRepository) {}

  async execute(): Promise<
    Either<
      ListAllQuestionCategotiesUseCaseError,
      ListAllQuestionCategotiesOutput
    >
  > {
    const categories = await this.questionCategoryRepo.getAll();
    return Right.create(categories);
  }
}
