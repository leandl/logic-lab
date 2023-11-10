import { CheckCircle } from "lucide-react";
import "./exercise-card.scss"

type ExerciseCardProps = {
  question: {
    name: string;
    category: string;
    passed: boolean;
  }
}

export function ExerciseCard({ question }: ExerciseCardProps) {
  return <div className="exercise-card">
    <div className="exercise-card-header">
      <h3>{question.name}</h3>
    </div>
    <p>{question.category}</p>
    {question.passed && (
      <div className="exercise-card-passed">
        <CheckCircle />
      </div>
    )}
  </div>
}
