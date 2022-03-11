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
      <div className="container mx-auto text-center pt-16">
        <h2 className="text-lg md:text-2xl mb-4">
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
          <>
            <p className="text-lg">Please wait, preparing your results</p>
            <div className="text-center text-gray-600 mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 mx-auto animate-spin"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg">Your personality is:</p>
            <p className="text-4xl font-medium capitalize">{personality}!</p>
            {personality === 'introvert' && (
              <p className="mt-4 max-w-md mx-auto text-base px-4">
                As an introvert you probably prefer calm, minimally stimulating
                environments. Introverts tend to feel drained after socializing
                and regain their energy by spending time alone.
                <br />
                <br />
                You may not necessarily be shy but you rather stay home most
                nights than go out to one social event after another. You enjoy
                quiet solitary activities and will usually choose the company of
                a few close friends over a wild party.
                <br />
                <br />
                <a
                  className="underline text-blue-600"
                  target="_blank"
                  rel="noreferrer"
                  href="https://introvertdear.com/what-is-an-introvert-definition/"
                >
                  <span>Source</span>
                </a>
              </p>
            )}
            {personality === 'extrovert' && (
              <p className="mt-4 max-w-md mx-auto text-base px-4">
                As an extrovert, you look outward rather than towards your inner
                thoughts. You are outgoing, expressive, and interested in
                what&apos;s going on around you.
                <br />
                <br />
                You probably enjoy parties and can move through the room with
                ease chatting with everyone whether you know them or not.
                <br />
                <br />
                <a
                  className="underline text-blue-600"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.vocabulary.com/dictionary/extroverted"
                >
                  <span>Source</span>
                </a>
              </p>
            )}
            <div className="mt-8">
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
