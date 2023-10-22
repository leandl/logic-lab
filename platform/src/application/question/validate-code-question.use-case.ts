import { Question } from "@/repositories/question.repository";
import { QuestionService } from "@/services/question.service";
import { Either, Right } from "@/utils/patterns";

export type ValidateCodeQuestionInput = {
  question: Question;
  code: string;
};

type ValidateCodeQuestionOutput = any;

export class ValidateCodeQuestionUseCase {
  constructor(private questionService: QuestionService) {}

  async execute(
    input: ValidateCodeQuestionInput
  ): Promise<Either<never, ValidateCodeQuestionOutput>> {
    const { question, code } = input;
    const result = await this.questionService.isValid(question, code);
    return Right.create(result);
  }
}
