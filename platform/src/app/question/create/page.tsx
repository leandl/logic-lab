import { listAllQuestionCategories } from "@/actions/question-category/list-all-question-categories.action";
import { FormQuestion } from "../form-question";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTE } from "@/config/route";

export default async function QuestionCreate() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) {
    redirect(ROUTE.APP.AUTH.LOGIN);
  }

  if (user.type !== "SUPERVISOR") {
    redirect(ROUTE.APP.HOME);
  }

  const result = await listAllQuestionCategories();
  if (result.isLeft()) {
    return;
  }

  const categories = result.value;
  return (
    <div>
      <FormQuestion
        categories={categories}
      />
    </div>
  )
}
