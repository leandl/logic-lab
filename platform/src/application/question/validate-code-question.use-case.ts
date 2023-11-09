import { Question } from "@/repositories/question.repository";
import { RoomQuestionRepository } from "@/repositories/room-question.repository";
import { Room } from "@/repositories/room.repository";
import { User } from "@/repositories/user.repository";
import { QuestionService, ResultVatidation } from "@/services/question.service";
import { Either, Right } from "@/utils/patterns";

export type ValidateCodeQuestionInput = {
  user: User;
  room: Room;
  question: Question;
  code: string;
};

export type ValidateCodeQuestionOutput = ResultVatidation;

const LANGUAGE_PYTHON_ID = 1;
export class ValidateCodeQuestionUseCase {
  constructor(
    private roomQuestionRepository: RoomQuestionRepository,
    private questionService: QuestionService
  ) {}

  async execute(
    input: ValidateCodeQuestionInput
  ): Promise<Either<never, ValidateCodeQuestionOutput>> {
    const { user, room, question, code } = input;
    const result = await this.questionService.isValid(question, code);

    const passed = result.success?.every((r) => r.passed) ?? false;
    await this.roomQuestionRepository.update({
      userId: user.id,
      roomId: room.id,
      questionId: question.id,
      languageId: LANGUAGE_PYTHON_ID,
      code: code,
      passed: passed,
    });

    return Right.create(result);
  }
}
