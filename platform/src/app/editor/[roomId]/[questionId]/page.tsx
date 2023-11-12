
import Editor from "./editor";
import { redirect } from "next/navigation";
import { ROUTE } from "@/config/route";
import { getCodeQuestionById } from "@/actions/question/get-code-question-by-id.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type PageEditorProps = {
  params: {
    roomId: string;
    questionId: string;
  }
}

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function PageEditor({ params }: Readonly<PageEditorProps>) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const questionId = Number(params.questionId);
  const isQuestionIdValid = Number.isInteger(questionId);
  const roomId = Number(params.roomId);
  const isRoomIdValid = Number.isInteger(roomId);

  if (!userId || !isRoomIdValid || !isQuestionIdValid) {
    redirect(ROUTE.APP.HOME);
  }

  const resultQuestion = await getCodeQuestionById(
    session.user.id,
    roomId,
    questionId
  );
  if (resultQuestion.isLeft()) {
    redirect(ROUTE.APP.HOME);
  }

  const { question, code } = resultQuestion.value;

  return <Editor
    userId={userId}
    roomId={roomId}
    question={question}
    initialCode={code}
  />
}
