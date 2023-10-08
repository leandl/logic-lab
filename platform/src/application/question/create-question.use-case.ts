import {
  QuestionRepository,
  Question,
  QuestionCreate,
} from "@/repositories/question.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum CreateQuestionUseCaseError {
  NAME_QUESTION_IN_USE = "NAME_QUESTION_IN_USE",
}

type CreateQuestionInput = QuestionCreate;

type CreateQuestionOutput = Question;

export class CreateQuestionUseCase {
  constructor(private questionRepo: QuestionRepository) {}

  async execute(
    input: CreateQuestionInput
  ): Promise<Either<CreateQuestionUseCaseError, CreateQuestionOutput>> {
    const questionExists = await this.questionRepo.findByName(input.name);
    const isquestionUsing = Boolean(questionExists);

    if (isquestionUsing) {
      return Left.create(CreateQuestionUseCaseError.NAME_QUESTION_IN_USE);
    }

    const newQuestion = await this.questionRepo.create(input);
    return Right.create(newQuestion);
  }
}
