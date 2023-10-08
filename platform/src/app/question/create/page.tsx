import { listAllQuestionCategories } from "@/actions/question-category/list-all-question-categories.action";
import { FormQuestion } from "../form-question";

export default async function QuestionCreate() {
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
