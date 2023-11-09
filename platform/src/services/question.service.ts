import { Question } from "@/repositories/question.repository";

type ResultValidationSuccess = {
  args: any[];
  expected_result: any;
  passed: boolean;
  result: any;
};

export type ResultVatidation = {
  error: string | null;
  extra: string | null;
  success: ResultValidationSuccess[] | null;
};

export class QuestionService {
  async generateFile(question: Question) {
    const rawResponse = await fetch(
      "http://localhost:5000/generate-file/python",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: question.name,
          description: question.description,
          "type-result": question.typeResult,
          "description-result": question.descriptionResult,
          params: question.params,
        }),
      }
    );

    const content = await rawResponse.json();
    return content.file_content as string;
  }

  async isValid(question: Question, code: string): Promise<ResultVatidation> {
    const rawResponse = await fetch(
      "http://localhost:5000/validate-exercise/python",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          "type-result": question.typeResult,
          params: question.params.map((param) => param.type),
          tests: question.tests,
        }),
      }
    );

    return await rawResponse.json();
  }
}
