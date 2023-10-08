import {
  QuestionCategory,
  QuestionCategoryRepository,
} from "@/repositories/question-category.repository";
import { Either, Right } from "@/utils/patterns";

type ListAllQuestionCategoriesOutput = QuestionCategory[];

export class ListAllQuestionCategoriesUseCase {
  constructor(private questionCategoryRepo: QuestionCategoryRepository) {}

  async execute(): Promise<Either<never, ListAllQuestionCategoriesOutput>> {
    const categories = await this.questionCategoryRepo.getAll();
    return Right.create(categories);
  }
}
