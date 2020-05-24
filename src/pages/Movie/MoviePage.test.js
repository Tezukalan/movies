import React from 'react';
import { render, cleanup } from '@testing-library/react';
import MoviePage from './MoviePage';

afterEach(cleanup);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1
  }),
  useRouteMatch: () => ({ url: '/movie/1' })
}));

describe('MoviePage', () => {
  let moviePageContainer;

  beforeEach(() => {});

  it('displays 11 rows by default', () => {
    const setValue = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((initialValue) => [initialValue, setValue]);

    const { container } = render(<MoviePage />);

    moviePageContainer = container;

    expect(moviePageContainer.querySelectorAll('.movie-row-title')).toHaveLength(10);
  });
});
