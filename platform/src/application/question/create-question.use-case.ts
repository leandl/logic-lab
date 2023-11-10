import { GENERAL_ROOM_NAME } from "@/config/rules";
import {
  QuestionRepository,
  Question,
  QuestionCreate,
} from "@/repositories/question.repository";
import { RoomRepository } from "@/repositories/room.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum CreateQuestionUseCaseError {
  NAME_QUESTION_IN_USE = "NAME_QUESTION_IN_USE",
}

type CreateQuestionInput = QuestionCreate;

type CreateQuestionOutput = Question;

export class CreateQuestionUseCase {
  constructor(
    private questionRepo: QuestionRepository,
    private roomRepo: RoomRepository
  ) {}

  async execute(
    input: CreateQuestionInput
  ): Promise<Either<CreateQuestionUseCaseError, CreateQuestionOutput>> {
    const questionExists = await this.questionRepo.findByName(input.name);
    const isQuestionUsing = Boolean(questionExists);

    if (isQuestionUsing) {
      return Left.create(CreateQuestionUseCaseError.NAME_QUESTION_IN_USE);
    }

    const newQuestion = await this.questionRepo.create(input);
    const room = await this.roomRepo.findByName(GENERAL_ROOM_NAME);

    await this.roomRepo.addQuestions(room!.id, [newQuestion.id]);

    return Right.create(newQuestion);
  }
}
