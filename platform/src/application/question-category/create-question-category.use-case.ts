import {
  QuestionCategoryRepository,
  QuestionCategory,
  QuestionCategoryCreate,
} from "@/repositories/question-category.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum CreateQuestionCategoryUseCaseError {
  NAME_CATEGORY_IN_USE = "NAME_CATEGORY_IN_USE",
}

type CreateQuestionCategoryInput = QuestionCategoryCreate;

type CreateQuestionCategoryOutput = QuestionCategory;

export class CreateQuestionCategoryUseCase {
  constructor(private questionCategoryRepo: QuestionCategoryRepository) {}

  async execute(
    input: CreateQuestionCategoryInput
  ): Promise<
    Either<CreateQuestionCategoryUseCaseError, CreateQuestionCategoryOutput>
  > {
    const categoryExists = await this.questionCategoryRepo.findByName(
      input.name
    );
    const isCategoryUsing = Boolean(categoryExists);

    if (isCategoryUsing) {
      return Left.create(
        CreateQuestionCategoryUseCaseError.NAME_CATEGORY_IN_USE
      );
    }

    const newCategory = await this.questionCategoryRepo.create(input);
    return Right.create(newCategory);
  }
}
