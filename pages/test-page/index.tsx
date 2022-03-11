import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSwr from 'swr';
import { QuestionRenderer } from '../../components';
import { Answer, Question } from '../api/get-questions';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TestPage() {
  const { data: questions, error } = useSwr<Question[], any>(
    '/api/get-questions',
    fetcher
  );
  const router = useRouter();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(-1);
  const [responses, setResponses] = useState<Record<string, Answer>>();

  const isFirstQuestion = activeQuestionIndex === 0;
  const isLastQuestion =
    questions && activeQuestionIndex === questions?.length - 1;

  const next = () => {
    if (!isLastQuestion) {
      setActiveQuestionIndex((idx) => {
        return idx + 1;
      });
    } else {
      // since nextjs doesn't support passing state in route
      // credit & discussion: https://github.com/vercel/next.js/discussions/23991#discussioncomment-1788801
      router.push('/results-page', undefined, {
        shallow: true,
        responses,
      } as any);
    }
  };

  const prev = () => {
    if (questions && activeQuestionIndex > 0) {
      setActiveQuestionIndex((idx) => {
        return idx - 1;
      });
    }
  };

  const recordResponse = (answer: Answer, questionId: number) => {
    let _responses: Record<string, Answer> = {};
    if (!responses) {
      _responses[questionId] = answer;
    } else {
      Object.assign(_responses, responses);
      _responses[questionId] = answer;
    }
    setResponses(_responses);
  };

  useEffect(() => {
    if (questions != null) {
      setActiveQuestionIndex(0);
    }
  }, [questions]);

  if (!questions) {
    return (
      <div className="flex justify-center items-center h-40 w-40 mx-auto">
        <p className="text-lg">Please wait, getting questions ready</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Personality Test - Are you an introvert or extrovert?</title>
      </Head>

      <main className="container mx-auto pt-16 relative">
        {questions.map((question, index) => (
          <QuestionRenderer
            key={question.id}
            question={question}
            totalQuestions={questions.length}
            questionIndex={index}
            recordResponse={recordResponse}
            {...(responses != null && {
              selectedAnswer: responses[question.id],
            })}
            isActive={activeQuestionIndex === index}
          />
        ))}

        <div className="max-w-3xl mx-auto px-4 mt-8 flex justify-between">
          {!isFirstQuestion && (
            <button className="btn" onClick={() => prev()}>
              Previous Question
            </button>
          )}
          <button
            className={`btn ${isFirstQuestion && 'flex-1'}`}
            onClick={() => next()}
          >
            {isLastQuestion ? 'All done!' : 'Next Question'}
          </button>
        </div>
      </main>
    </div>
  );
}
