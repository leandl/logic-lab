import { Language } from "@/entities/languange";
import {
  RoomQuestion,
  RoomQuestionCreate,
  RoomQuestionRepository,
  RoomQuestionUpdate,
} from "../room-question.repository";
import { prisma } from "@/lib/prisma";

const LANGUAGE_PYTHON_ID = 1;

type OneRoomQuestionRetorn = {
  code: string;
  passed: boolean;
  language: {
    name: string;
    id: number;
  };
  question: {
    name: string;
    id: number;
  };
  user: {
    name: string;
    id: number;
  };
  room: {
    name: string;
    id: number;
  };
};

function convertOneRoomQuestionRetornToRoomQuestion(
  data: OneRoomQuestionRetorn
): RoomQuestion {
  return {
    code: data.code,
    passed: data.passed,
    language: data.language.name as Language,
    languageId: data.language.id,
    questionId: data.question.id,
    questionName: data.question.name,
    roomId: data.room.id,
    roomName: data.room.name,
    userId: data.user.id,
    username: data.user.name,
  };
}

const querySelectIdAndName = {
  select: {
    id: true,
    name: true,
  },
};

export class PrismaRoomQuestionRepository implements RoomQuestionRepository {
  async get(
    userId: number,
    roomId: number,
    questionId: number,
    languageId: number
  ): Promise<RoomQuestion | null> {
    const roomQuestion = await prisma.userRoomQuestion.findUnique({
      select: {
        code: true,
        passed: true,
        language: querySelectIdAndName,
        question: querySelectIdAndName,
        user: querySelectIdAndName,
        room: querySelectIdAndName,
      },
      where: {
        userId_questionId_roomId_languageId: {
          languageId,
          questionId,
          roomId,
          userId,
        },
      },
    });

    return (
      roomQuestion && convertOneRoomQuestionRetornToRoomQuestion(roomQuestion)
    );
  }

  async create(data: RoomQuestionCreate): Promise<RoomQuestion> {
    const roomQuestion = await prisma.userRoomQuestion.create({
      data: {
        code: data.code,
        languageId: data.languageId,
        questionId: data.questionId,
        roomId: data.roomId,
        userId: data.userId,
      },
      select: {
        code: true,
        passed: true,
        language: querySelectIdAndName,
        question: querySelectIdAndName,
        user: querySelectIdAndName,
        room: querySelectIdAndName,
      },
    });
    return (
      roomQuestion && convertOneRoomQuestionRetornToRoomQuestion(roomQuestion)
    );
  }

  async update(data: RoomQuestionUpdate): Promise<RoomQuestion> {
    const roomQuestion = await prisma.userRoomQuestion.update({
      where: {
        userId_questionId_roomId_languageId: {
          languageId: data.languageId,
          questionId: data.questionId,
          roomId: data.roomId,
          userId: data.userId,
        },
      },
      data: {
        code: data.code,
        passed: data.passed,
      },
      select: {
        code: true,
        passed: true,
        language: querySelectIdAndName,
        question: querySelectIdAndName,
        user: querySelectIdAndName,
        room: querySelectIdAndName,
      },
    });
    return (
      roomQuestion && convertOneRoomQuestionRetornToRoomQuestion(roomQuestion)
    );
  }
}
