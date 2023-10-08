import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

import { listAllQuestions } from "@/actions/question/list-all-questions.action";
import { Table, TableHeadRow as Head, TableRow as Row, TableCell as Cell } from "@/components/table";
import { DYNAMIC_ROUTE, ROUTE } from "@/config/route";

import "./question-list.scss";

export default async function QuestionList() {
  const resultQuestions = await listAllQuestions()
  if (resultQuestions.isLeft()) {
    redirect(ROUTE.APP.HOME);
  }

  const questions = resultQuestions.value;
  return (
    <Table className="page-list">
      <Head>
        <Cell col={10}>Nome</Cell>
        <Cell col={2}>
          <div className="container-action">
            <Link
              className="container-action"
              href={ROUTE.APP.QUESTION.CREATE}
            >
              <Plus /> Questão
            </Link>
          </div>
        </Cell>
      </Head>

      {questions.map((question) => (
        <Row key={question.id}>
          <Cell col={10}>{question.name}</Cell>
          <Cell col={2}>
            <div className="container-action">
              <Link href={DYNAMIC_ROUTE.APP.QUESTION.UPDATE(question.id)}>Editar</Link>
            </div>
          </Cell>
        </Row>
      ))}
    </Table>
  )
}
