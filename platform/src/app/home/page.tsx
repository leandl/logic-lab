
import { getListAllByUserAndRoom } from "@/actions/question/get-list-question-by-user-and-room.action";

import { ExerciseCard } from "@/components/exercise-card/exercise-card";
import { DYNAMIC_ROUTE, ROUTE } from "@/config/route";
import { GENERAL_ROOM_ID } from "@/config/rules";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;


  if (!userId) {
    redirect(ROUTE.APP.AUTH.LOGIN);
  }

  const resultRoomQuestions = await getListAllByUserAndRoom(
    session.user.id,
    GENERAL_ROOM_ID,
  );
  if (resultRoomQuestions.isLeft()) {
    redirect(ROUTE.APP.QUESTION.LIST);
  }

  const roomQuestions = resultRoomQuestions.value;

  return (
    <div className="container">
      <div className="row">
        {roomQuestions.questions.map(question => (
          <Link
            prefetch={false}
            key={question.id}
            href={DYNAMIC_ROUTE.APP.EDITOR(roomQuestions.id, question.id)}
          >
            <div className="col-4">

              <ExerciseCard question={question} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
