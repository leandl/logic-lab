import { Question } from "@/repositories/question.repository";
import { QuestionService } from "@/services/question.service";
import { Either, Right } from "@/utils/patterns";

type GetCodeQuestionByIdInput = Question;

type GetCodeQuestionByIdOutput = {
  question: Question;
  code: string;
};

export class GetCodeQuestionByIdUseCase {
  constructor(private questionService: QuestionService) {}

  async execute(
    input: GetCodeQuestionByIdInput
  ): Promise<Either<never, GetCodeQuestionByIdOutput>> {
    const question = input;
    const codeQuestion = await this.questionService.generateFile(question);

    return Right.create({
      question,
      code: codeQuestion,
    });
  }
}
