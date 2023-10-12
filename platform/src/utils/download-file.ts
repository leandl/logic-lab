import { Question } from "@/repositories/question.repository";

export function downloadFile(
  filename: string,
  content: string,
  typeFile?: string
) {
  const linkElement = window.document.createElement("a");
  linkElement.href = window.URL.createObjectURL(
    new Blob([content], { type: typeFile })
  );
  linkElement.download = filename;

  // Append anchor to body.
  document.body.appendChild(linkElement);
  linkElement.click();

  // Remove anchor from body
  document.body.removeChild(linkElement);
}

function convertQuestionToQuestionValidatorOlympics(question: Question) {
  return {
    name: question.name,
    description: question.description,
    "type-result": question.typeResult,
    "description-result": question.descriptionResult,
    params: question.params,
    tests: question.tests,
  };
}

export function downloadFileForValidatorOlympics(questions: Question[]) {
  const questionsValidatorOlympics = questions.map(
    convertQuestionToQuestionValidatorOlympics
  );

  return downloadFile(
    "data.json",
    JSON.stringify(questionsValidatorOlympics, null, 4),
    "text/json"
  );
}
