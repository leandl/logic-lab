import { listAllQuestionCategories } from "@/actions/question-category/list-all-question-categories.action";
import { FormQuestion } from "../../form-question";
import { redirect } from "next/navigation";
import { ROUTE } from "@/config/route";
import { getQuestionById } from "@/actions/question/get-question-by-id.use-case";

type QuestionUpdateProps = {
  params: {
    questionId: string;
  }
}


export default async function QuestionUpdate({ params }: QuestionUpdateProps) {
  const questionId = Number(params.questionId);
  const isQuestionIdValid = Number.isInteger(questionId);

  if (!isQuestionIdValid) {
    redirect(ROUTE.APP.QUESTION.LIST);
  }

  const [resultQuestion, resultCategories] = await Promise.all([
    getQuestionById(questionId),
    listAllQuestionCategories()
  ])

  if (resultCategories.isLeft() || resultQuestion.isLeft()) {
    redirect(ROUTE.APP.QUESTION.LIST);
  }

  const categories = resultCategories.value;
  const question = resultQuestion.value;
  return (
    <div>
      <FormQuestion
        question={question}
        categories={categories}
      />
    </div>
  )
}
