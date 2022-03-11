import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Answer } from '../api/get-questions';

let delayToMockLongProcessingTime: ReturnType<typeof setTimeout>;

export default function ResultsPage() {
  const state = typeof window !== 'undefined' && window.history?.state?.options;

  const hasResponsesAndResponsesAreValid = useMemo(
    () => state?.responses != null && Object.keys(state.responses).length === 3,
    [state]
  );
  const [processingResults, setProcessingResults] = useState(true);
  const [personality, setPersonality] = useState<string>();

  useEffect(() => {
    const handleResponses = () => {
      let introvertResponses = 0;
      let extrovertResponses = 0;
      const { responses } = state;
      const keys = Object.keys(responses);
      for (let i = 0; i < keys.length; i++) {
        const response: Answer = responses[keys[i]];
        switch (response.weight) {
          case 'introvert':
            introvertResponses += 1;
            break;
          case 'extrovert':
            extrovertResponses += 1;
            break;

          default:
            break;
        }
      }
      setPersonality(
        introvertResponses > extrovertResponses ? 'introvert' : 'extrovert'
      );
      clearTimeout(delayToMockLongProcessingTime);
      delayToMockLongProcessingTime = setTimeout(() => {
        setProcessingResults(false);
      }, 3000);
    };

    if (hasResponsesAndResponsesAreValid) {
      handleResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasResponsesAndResponsesAreValid]);

  if (!hasResponsesAndResponsesAreValid) {
    return (
      <div className="text-center">
        <h2 className="text-2xl mb-4">
          Looks like you didn&apos;t complete the test.
        </h2>
        <Link href="/test-page" passHref>
          <button className="btn">Go to Test Page</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Personality Test - Are you an introvert or extrovert?</title>
      </Head>

      <main className="container mx-auto text-center pt-16 relative">
        {processingResults ? (
          <p className="text-lg">Please wait, preparing your results</p>
        ) : (
          <>
            <p className="text-lg">Your personality is:</p>
            <p className="text-4xl font-medium capitalize">{personality}!</p>
            <div className="mt-4">
              <Link href="/test-page" passHref>
                <button className="btn">Take Test Again</button>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
