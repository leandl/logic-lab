import { LANGUAGE_PYTHON_ID } from "@/config/rules";
import { Question } from "@/repositories/question.repository";
import { RoomQuestionRepository } from "@/repositories/room-question.repository";
import { Room } from "@/repositories/room.repository";
import { User } from "@/repositories/user.repository";
import { QuestionService } from "@/services/question.service";
import { Either, Right } from "@/utils/patterns";

type GetCodeQuestionByIdInput = {
  user: User;
  room: Room;
  question: Question;
};

export type GetCodeQuestionByIdOutput = {
  question: Question;
  code: string;
};

export class GetCodeQuestionByIdUseCase {
  constructor(
    private roomQuestionRepository: RoomQuestionRepository,
    private questionService: QuestionService
  ) {}

  async execute(
    input: GetCodeQuestionByIdInput
  ): Promise<Either<never, GetCodeQuestionByIdOutput>> {
    const { user, room, question } = input;

    const roomQuestion = await this.roomQuestionRepository.getOfUser(
      user.id,
      room.id,
      question.id,
      LANGUAGE_PYTHON_ID
    );

    if (roomQuestion && roomQuestion.code.trim() !== "") {
      return Right.create({
        question,
        code: roomQuestion.code,
      });
    }

    const codeQuestion = await this.questionService.generateFile(question);
    if (!roomQuestion) {
      await this.roomQuestionRepository.create({
        userId: user.id,
        roomId: room.id,
        questionId: question.id,
        languageId: LANGUAGE_PYTHON_ID,
        code: codeQuestion,
      });
    }

    return Right.create({
      question,
      code: codeQuestion,
    });
  }
}
