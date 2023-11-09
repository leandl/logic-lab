"use server";

import { Either, convertEitherToEitherJSON } from "@/utils/patterns";
import { QuestionService } from "@/services/question.service";
import {
  ValidateCodeQuestionOutput,
  ValidateCodeQuestionUseCase,
} from "@/application/question/validate-code-question.use-case";
import { Question } from "@/repositories/question.repository";
import { PrismaRoomQuestionRepository } from "@/repositories/prisma/prisma-room-question.repository";
import { getUserById } from "../user/get-user-by-id.use-case";
import { getRoomById } from "../room/get-user-by-id.use-case";
import { GetUserUseCaseError } from "@/application/user/get-user-by-id.use-case";
import { GetRoomUseCaseError } from "@/application/room/get-room-by-id.use-case";

export async function validateCodeQuestion(
  userId: number,
  roomId: number,
  question: Question,
  code: string
): Promise<
  Either<GetUserUseCaseError | GetRoomUseCaseError, ValidateCodeQuestionOutput>
> {
  const resultUser = await getUserById(userId);
  if (resultUser.isLeft()) {
    return resultUser;
  }

  const resultRoom = await getRoomById(roomId);
  if (resultRoom.isLeft()) {
    return resultRoom;
  }

  const user = resultUser.value;
  const room = resultRoom.value;

  const roomQuestionRepository = new PrismaRoomQuestionRepository();
  const questionService = new QuestionService();
  const validateCodeQuestionUseCase = new ValidateCodeQuestionUseCase(
    roomQuestionRepository,
    questionService
  );

  return validateCodeQuestionUseCase.execute({
    user,
    room,
    question,
    code,
  });
}

export async function wrapperValidateCodeQuestionUseCaseServerToClient(
  ...arags: Parameters<typeof validateCodeQuestion>
) {
  const ressult = await validateCodeQuestion(...arags);
  return convertEitherToEitherJSON(ressult);
}
