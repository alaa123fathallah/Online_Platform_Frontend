import { useParams } from "react-router-dom";
import CreateQuestion from "./CreateQuestion";

function QuizQuestions() {
  const { quizId } = useParams();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Add Questions</h1>

      <CreateQuestion quizId={Number(quizId)} />
    </div>
  );
}

export default QuizQuestions;
