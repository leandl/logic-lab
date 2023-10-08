import {
  QuestionRepository,
  Question,
  QuestionCreate,
} from "@/repositories/question.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum UpdateQuestionUseCaseError {
  ID_INVALID = "ID_INVALID",
  NAME_DIFFERENT_FROM_THE_ORIGINAL = "NAME_DIFFERENT_FROM_THE_ORIGINAL",
}

type UpdateQuestionInput = { questionId: number; question: QuestionCreate };

type UpdateQuestionOutput = Question;

export class UpdateQuestionUseCase {
  constructor(private questionRepo: QuestionRepository) {}

  async execute(
    input: UpdateQuestionInput
  ): Promise<Either<UpdateQuestionUseCaseError, UpdateQuestionOutput>> {
    const question = await this.questionRepo.findById(input.questionId);

    if (!question) {
      return Left.create(UpdateQuestionUseCaseError.ID_INVALID);
    }

    if (question.name !== input.question.name) {
      return Left.create(
        UpdateQuestionUseCaseError.NAME_DIFFERENT_FROM_THE_ORIGINAL
      );
    }

    const newQuestion = await this.questionRepo.update(
      input.questionId,
      input.question
    );
    return Right.create(newQuestion);
  }
}
