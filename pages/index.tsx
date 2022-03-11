import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Personality Test - Are you an introvert or extrovert?</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto h-screen">
        <div className="py-10 flex h-full flex-col justify-center items-center text-center space-y-10">
          <h1 className="text-4xl">Personality Test</h1>
          <p className="text-xl max-w-lg">
            Are you an Introvert or an Extrovert?
            <br />
            We&apos;ve prepared a short quiz to help you find out. It will only
            take two minutes.
          </p>
          <Link href="test-page" passHref>
            <span className="btn">Start quiz</span>
          </Link>
        </div>
      </main>

      <footer>{/* @todo */}</footer>
    </div>
  );
}
