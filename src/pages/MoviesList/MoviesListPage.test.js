import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import MoviesListPage from './MoviesListPage';

afterEach(cleanup);

describe('MoviesListPage', () => {
  let pageContainer;

  beforeEach(() => {
    const { container } = render(<MoviesListPage />);
    pageContainer = container;
  });

  it('has popularity sort by default', () => {
    expect(screen.getByTestId('sort').querySelector('select').value).toBe('popularity.desc');
  });

  it('should display loading', () => {
    expect(pageContainer.querySelector('.loading')).toBeTruthy();
  });
});
