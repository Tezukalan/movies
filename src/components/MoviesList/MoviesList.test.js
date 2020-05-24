import React from 'react';
import { render, cleanup } from '@testing-library/react';
import MoviesList from './MoviesList';
import { mockMovies } from '../../__mocks__/mocks';

afterEach(cleanup);

describe('MoviesList', () => {
  let moviesListConainer;

  beforeEach(() => {
    const movies = mockMovies;
    const { container } = render(<MoviesList movies={movies} />);

    moviesListConainer = container;
  });

  it('displays correct number of movie item', () => {
    expect(moviesListConainer.querySelectorAll('.grid-tile')).toHaveLength(2);
  });

  it('displays correct image', () => {
    const images = moviesListConainer.querySelectorAll('img');

    expect(images[0].src).toBe('http://image.tmdb.org/t/p/w500/poster-path1.jpg');
    expect(images[1].src).toBe('http://image.tmdb.org/t/p/w500/poster-path2.jpg');
  });

  it('displays correct title', () => {
    const titles = moviesListConainer.querySelectorAll('.grid-title');

    expect(titles[0].textContent).toBe('title 1');
    expect(titles[1].textContent).toBe('title 2');
  });

  it('displays correct vote count', () => {
    const voteCounts = moviesListConainer.querySelectorAll('.grid-vote-count');
    expect(voteCounts[0].textContent).toBe('3427 Votes');
    expect(voteCounts[1].textContent).toBe('513 Votes');
  });
});
