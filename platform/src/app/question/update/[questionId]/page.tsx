
type QuestionUpdateProps = {
  params: {
    questionId: string;
  }
}

export default function QuestionUpdate({ params }: QuestionUpdateProps) {
  return (
    <div>{params.questionId}</div>
  )
}
