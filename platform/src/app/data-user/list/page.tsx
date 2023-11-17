import { redirect } from "next/navigation";
import Link from "next/link";

import { listAllUsers } from "@/actions/user/list-all-users.action";
import { Table, TableHeadRow as Head, TableRow as Row, TableCell as Cell } from "@/components/table";
import { DYNAMIC_ROUTE, ROUTE } from "@/config/route";

import "./list.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function UserList() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) {
    redirect(ROUTE.APP.AUTH.LOGIN);
  }

  if (user.type !== "SUPERVISOR") {
    redirect(ROUTE.APP.HOME);
  }

  const resultUsers = await listAllUsers();
  if (resultUsers.isLeft()) {
    redirect(ROUTE.APP.HOME);
  }

  const users = resultUsers.value;

  return (
    <Table className="page-list">
      <Head>
        <Cell col={12}>Nome</Cell>
      </Head>

      {users.map((user) => (
        <Row key={user.id}>
          <Cell col={10}>{user.name}</Cell>
          <Cell col={2}>
            <div className="container-action">
              <Link prefetch={false} href={DYNAMIC_ROUTE.APP.USER.DATA.SHOW(user.id)}>
                Informações
              </Link>
            </div>
          </Cell>
        </Row>
      ))}
    </Table>
  )
}
