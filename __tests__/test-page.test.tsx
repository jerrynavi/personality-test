import { render } from '@testing-library/react';
import { questions } from '../pages/api/get-questions';
import TestPage from '../pages/test-page';
import request from '../__mocks__/request';

describe('TestPage', () => {
  it('renders', () => {
    const rendered = render(<TestPage />);
    expect(rendered).toBeDefined();
  });

  test('questions should be fetched', () => {
    return request('/api/get-questions').then((data) => {
      expect(data).toEqual(questions);
    });
  });

  test('should only have one URL implemented', () => {
    expect.assertions(1);
    return request('/api/other-route').catch((error) => {
      expect(error).toEqual({
        error: 'Could not find requested route.',
      });
    });
  });
});
