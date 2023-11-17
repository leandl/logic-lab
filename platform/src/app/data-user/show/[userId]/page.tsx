import { getListAllByUserAndRoom } from "@/actions/question/get-list-question-by-user-and-room.action";
import { getUserById } from "@/actions/user/get-user-by-id.use-case";

import { ExerciseCard } from "@/components/exercise-card/exercise-card";
import { ROUTE } from "@/config/route";
import { GENERAL_ROOM_ID } from "@/config/rules";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const revalidate = 0;
export const dynamic = 'force-dynamic'

type DataUserProps = {
  params: {
    userId: string;
  }
}

export default async function DataUser({ params }: Readonly<DataUserProps>) {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user;


  if (!sessionUser?.id || sessionUser.type !== "SUPERVISOR") {
    redirect(ROUTE.APP.HOME);
  }

  const currentUserId = Number(params.userId);
  const isCurrentUserIdValid = Number.isInteger(currentUserId);

  if (!isCurrentUserIdValid) {
    redirect(ROUTE.APP.USER.DATA.LIST);
  }

  const resultUser = await getUserById(currentUserId)
  if (resultUser.isLeft()) {
    redirect(ROUTE.APP.USER.DATA.LIST);
  }

  const user = resultUser.value;
  const resultRoomQuestions = await getListAllByUserAndRoom(
    user.id,
    GENERAL_ROOM_ID,
  );

  if (resultRoomQuestions.isLeft()) {
    redirect(ROUTE.APP.USER.DATA.LIST);
  }

  const roomQuestions = resultRoomQuestions.value;

  return (
    <div className="container">
      <h1>{user.name}</h1>
      <hr />
      <div className="row">
        {roomQuestions.questions.map(question => (
          <div className="col-4" key={question.id}>
            <ExerciseCard question={question} />
          </div>
        ))}
      </div>
    </div>
  )
}
