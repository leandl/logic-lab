import {
  Question,
  QuestionRepository,
} from "@/repositories/question.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum UpdateQuestionUseCaseError {
  ID_INVALID = "ID_INVALID",
}

type GetQuestionByIdInput = number;

type GetQuestionByIdOutput = Question;

export class GetQuestionByIdUseCase {
  constructor(private questionRepo: QuestionRepository) {}

  async execute(
    input: GetQuestionByIdInput
  ): Promise<Either<UpdateQuestionUseCaseError, GetQuestionByIdOutput>> {
    const questionId = input;
    const question = await this.questionRepo.findById(questionId);

    if (!question) {
      return Left.create(UpdateQuestionUseCaseError.ID_INVALID);
    }

    return Right.create(question);
  }
}
