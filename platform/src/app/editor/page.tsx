import { listAllQuestions } from "@/actions/question/list-all-questions.action";
import Editor from "./editor";
import { redirect } from "next/navigation";
import { ROUTE } from "@/config/route";

export default async function PageEditor() {
  const resultQuestions = await listAllQuestions()
  if (resultQuestions.isLeft()) {
    redirect(ROUTE.APP.HOME);
  }

  const questions = resultQuestions.value;
  return <Editor questions={questions} />
}
