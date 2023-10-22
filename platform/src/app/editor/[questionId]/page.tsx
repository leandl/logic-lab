
import Editor from "./editor";
import { redirect } from "next/navigation";
import { ROUTE } from "@/config/route";
import { getQuestionById } from "@/actions/question/get-question-by-id.use-case";
import { QuestionService } from "@/services/question.service";
import { getCodeQuestionById } from "@/actions/question/get-code-question-by-id.use-case";

type PageEditorProps = {
  params: {
    roomId: string;
    questionId: string;
  }
}

export default async function PageEditor({ params }: PageEditorProps) {
  const questionId = Number(params.questionId);
  const isQuestionIdValid = Number.isInteger(questionId);

  if (!isQuestionIdValid) {
    redirect(ROUTE.APP.QUESTION.LIST);
  }

  const resultQuestion = await getCodeQuestionById(questionId);
  if (resultQuestion.isLeft()) {
    redirect(ROUTE.APP.QUESTION.LIST);
  }

  const { question, code } = resultQuestion.value;

  return <Editor question={question} initialCode={code} />
}
