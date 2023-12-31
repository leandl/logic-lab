import { listAllQuestionCategories } from "@/actions/question-category/list-all-question-categories.action";
import { FormQuestion } from "../../form-question";
import { redirect } from "next/navigation";
import { ROUTE } from "@/config/route";
import { getQuestionById } from "@/actions/question/get-question-by-id.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type QuestionUpdateProps = {
  params: {
    questionId: string;
  }
}

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function QuestionUpdate({ params }: QuestionUpdateProps) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) {
    redirect(ROUTE.APP.AUTH.LOGIN);
  }

  if (user.type !== "SUPERVISOR") {
    redirect(ROUTE.APP.HOME);
  }

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
