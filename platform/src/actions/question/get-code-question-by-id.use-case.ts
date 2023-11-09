"use server";

import {
  GetCodeQuestionByIdOutput,
  GetCodeQuestionByIdUseCase,
} from "@/application/question/get-code-question-by-id.use-case";
import { Either, convertEitherToEitherJSON } from "@/utils/patterns";
import { getQuestionById } from "./get-question-by-id.use-case";
import { QuestionService } from "@/services/question.service";
import { PrismaRoomQuestionRepository } from "@/repositories/prisma/prisma-room-question.repository";
import { getUserById } from "../user/get-user-by-id.use-case";
import { getRoomById } from "../room/get-user-by-id.use-case";
import { GetUserUseCaseError } from "@/application/user/get-user-by-id.use-case";
import { GetRoomUseCaseError } from "@/application/room/get-room-by-id.use-case";
import { GetQuestionUseCaseError } from "@/application/question/get-question-by-id.use-case";

export async function getCodeQuestionById(
  userId: number,
  roomId: number,
  questionId: number
): Promise<
  Either<
    GetUserUseCaseError | GetRoomUseCaseError | GetQuestionUseCaseError,
    GetCodeQuestionByIdOutput
  >
> {
  const resultUser = await getUserById(userId);
  if (resultUser.isLeft()) {
    return resultUser;
  }

  const resultRoom = await getRoomById(roomId);
  if (resultRoom.isLeft()) {
    return resultRoom;
  }

  const resultQuestion = await getQuestionById(questionId);
  if (resultQuestion.isLeft()) {
    return resultQuestion;
  }

  const user = resultUser.value;
  const room = resultRoom.value;
  const question = resultQuestion.value;

  const roomQuestionRepository = new PrismaRoomQuestionRepository();
  const questionService = new QuestionService();
  const getCodeQuestionByIdUseCase = new GetCodeQuestionByIdUseCase(
    roomQuestionRepository,
    questionService
  );

  return await getCodeQuestionByIdUseCase.execute({
    user,
    room,
    question,
  });
}

export async function wrapperGetCodeQuestionByIdServerToClient(
  ...arags: Parameters<typeof getCodeQuestionById>
) {
  const ressult = await getCodeQuestionById(...arags);
  return convertEitherToEitherJSON(ressult);
}
