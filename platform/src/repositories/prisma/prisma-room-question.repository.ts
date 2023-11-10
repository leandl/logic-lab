import { Language } from "@/entities/languange";
import {
  AllRoomQuestionOfUser,
  RoomQuestion,
  RoomQuestionCreate,
  RoomQuestionRepository,
  RoomQuestionUpdate,
} from "../room-question.repository";
import { prisma } from "@/lib/prisma";

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

type AllRoomQuestionOfUserRetorn = {
  name: string;
  id: number;
  questions: {
    question: {
      id: number;
      name: string;
      category: {
        name: string;
      };
      userRoomQuestions: {
        passed: boolean;
      }[];
    };
  }[];
};

function convertAllRoomQuestionOfUserRetornToAllRoomQuestionOfUser(
  data: AllRoomQuestionOfUserRetorn
): AllRoomQuestionOfUser {
  return {
    id: data.id,
    name: data.name,
    questions: data.questions.map((data) => ({
      id: data.question.id,
      name: data.question.name,
      category: data.question.category.name,
      passed: data.question.userRoomQuestions[0]?.passed || false,
    })),
  };
}

const querySelectIdAndName = {
  select: {
    id: true,
    name: true,
  },
};

export class PrismaRoomQuestionRepository implements RoomQuestionRepository {
  async getOfUser(
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

  async getAllOfUser(
    userId: number,
    roomId: number,
    languageId: number
  ): Promise<AllRoomQuestionOfUser | null> {
    const result = await prisma.room.findUnique({
      select: {
        id: true,
        name: true,
        questions: {
          select: {
            question: {
              select: {
                id: true,
                name: true,
                category: {
                  select: {
                    name: true,
                  },
                },
                userRoomQuestions: {
                  take: 1,
                  select: {
                    passed: true,
                  },
                  where: {
                    userId: userId,
                    languageId: languageId,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id: roomId,
      },
    });

    return (
      result &&
      convertAllRoomQuestionOfUserRetornToAllRoomQuestionOfUser(result)
    );
  }
}
