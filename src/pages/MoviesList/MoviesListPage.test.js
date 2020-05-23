import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import MoviesListPage from './MoviesListPage';

afterEach(cleanup);

describe('MoviesListPage', () => {
  beforeEach(() => {
    render(<MoviesListPage />);
  });

  it('has popularity sort by default', () => {
    expect(screen.getByTestId('sort').querySelector('select').value).toBe('popularity.desc');
  });
});
