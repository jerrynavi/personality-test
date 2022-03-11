import { Answer, Question } from '../pages/api/get-questions';

interface Props {
  question: Question;
  isActive: boolean;
  selectedAnswer?: Answer;
  totalQuestions: number;
  questionIndex: number;
  recordResponse: (answer: Answer, questionId: number) => void;
}

const QuestionRenderer = ({
  question,
  isActive,
  selectedAnswer,
  totalQuestions,
  questionIndex,
  recordResponse,
}: Props) => {
  return (
    <div
      className={`max-w-3xl mx-auto px-4 ${
        isActive
          ? 'opacity-100 relative'
          : 'opacity-0 absolute top-0 left-0 right-0 -z-10'
      }`}
    >
      <p className="text-center text-2xl mb-8">
        {questionIndex + 1} / {totalQuestions}
      </p>
      <h2 className="text-xl md:text-2xl">{question.text}</h2>
      <ol className="mt-4">
        {question.answers.map((answer, index) => (
          <li
            className={`border border-gray-300 rounded my-1 p-2 cursor-pointer hover:bg-gray-600 hover:text-white ${
              selectedAnswer?.id === answer.id && 'bg-gray-600 text-white'
            }`}
            onClick={() => recordResponse(answer, question.id)}
            key={index}
          >
            <div className="flex items-center">
              <span className="rounded inline-flex justify-center text-sm items-center p-1 h-6 w-6 mr-2 bg-gray-200 text-gray-900">
                {index + 1}
              </span>
              {answer.text}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default QuestionRenderer;
