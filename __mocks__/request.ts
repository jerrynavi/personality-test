import { Question, questions } from '../pages/api/get-questions';

export default function request(url: string): Promise<Question[]> {
  return new Promise((resolve, reject) => {
    if (url !== '/api/get-questions') {
      reject({
        error: 'Could not find requested route.',
      });
    }
    resolve(questions);
  });
}
