import {
  Question,
  QuestionRepository,
} from "@/repositories/question.repository";
import { Either, Right } from "@/utils/patterns";

type ListAllQuestionsOutput = Question[];

export class ListAllQuestionsUseCase {
  constructor(private questionRepo: QuestionRepository) {}

  async execute(): Promise<Either<never, ListAllQuestionsOutput>> {
    const categories = await this.questionRepo.getAll();
    return Right.create(categories);
  }
}
