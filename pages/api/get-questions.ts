import { NextApiRequest, NextApiResponse } from 'next';

export interface Answer {
  id: string;
  text: string;
  weight: 'introvert' | 'extrovert';
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "You're really busy at work and a colleague is telling you their life story and personal woes. You:",
    answers: [
      {
        id: '1-1',
        text: "Don't dare to interrupt them",
        weight: 'introvert',
      },
      {
        id: '1-2',
        text: "Think it's more important to give them some of your time; work can wait",
        weight: 'extrovert',
      },
      {
        id: '1-3',
        text: 'Listen but with only half an ear',
        weight: 'introvert',
      },
      {
        id: '1-4',
        text: 'Interrupt and explain that you are really busy at the moment',
        weight: 'extrovert',
      },
    ],
  },
  {
    id: 2,
    text: "You've been sitting in the doctor's waiting room for more than 25 minutes. You:",
    answers: [
      {
        id: '2-1',
        text: 'Look at your watch every two minutes',
        weight: 'introvert',
      },
      {
        id: '2-2',
        text: 'Bubble with inner anger, but keep quiet',
        weight: 'introvert',
      },
      {
        id: '2-3',
        text: 'Explain to other equally impatient people in the room that the doctor is always running late',
        weight: 'extrovert',
      },
      {
        id: '2-4',
        text: 'Complain in a loud voice, while tapping your foot impatiently',
        weight: 'extrovert',
      },
    ],
  },
  {
    id: 3,
    text: "You're having an animated discussion with a colleague regarding a project that you're in charge of. You:",
    answers: [
      {
        id: '3-1',
        text: "Don't dare contradict them",
        weight: 'introvert',
      },
      {
        id: '3-2',
        text: 'Think that they are obviously right',
        weight: 'introvert',
      },
      {
        id: '3-3',
        text: 'Defend your own point of view, tooth and nail',
        weight: 'extrovert',
      },
      {
        id: '3-4',
        text: 'Continuously interrupt your colleague',
        weight: 'extrovert',
      },
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(questions);
  }
}
