import { prisma } from "@/lib/prisma";
import { Question as PrismaQuestion } from "@prisma/client";
import {
  Param,
  Question,
  QuestionCreate,
  QuestionRepository,
  Test,
  Variable,
} from "@/repositories/question.repository";

function converPrismaQuestionToQuestion(question: PrismaQuestion): Question {
  return {
    id: question.id,
    name: question.name,
    categoryId: question.categoryId,
    description: question.description,
    typeResult: question.typeResult as Variable,
    descriptionResult: question.descriptionResult,
    params: question.params as Param[],
    tests: question.tests as Test[],
  };
}

export class PrismaQuestionRepository implements QuestionRepository {
  async findById(questionId: number): Promise<Question | null> {
    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    return question && converPrismaQuestionToQuestion(question);
  }

  async findByName(questionName: string): Promise<Question | null> {
    const question = await prisma.question.findFirst({
      where: {
        name: questionName,
      },
    });

    return question && converPrismaQuestionToQuestion(question);
  }

  async getAll(): Promise<Question[]> {
    const categories = await prisma.question.findMany();
    return categories.map(converPrismaQuestionToQuestion);
  }

  async create(newQuestion: QuestionCreate): Promise<Question> {
    const question = await prisma.question.create({
      data: newQuestion,
    });

    return question && converPrismaQuestionToQuestion(question);
  }

  async update(
    questionId: number,
    newQuestion: QuestionCreate
  ): Promise<Question> {
    const question = await prisma.question.update({
      where: {
        id: questionId,
      },
      data: newQuestion,
    });

    return question && converPrismaQuestionToQuestion(question);
  }
}
