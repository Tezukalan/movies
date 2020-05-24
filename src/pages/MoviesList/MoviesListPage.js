import React, { useEffect, useRef, useState, useReducer } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MOVIES_LIST_URL, API_KEY } from '../../App.constants';
import axios from '../../utils/axios';
import MoviesList from '../../components/MoviesList/MoviesList';
import ListHeader from '../../components/ListHeader/ListHeader';

const MoviesListPage = () => {
  let totalPages = 1;

  const sortRef = useRef('popularity.desc');
  const [sort, setSortState] = useState(sortRef.current);
  const setSort = (value) => {
    sortRef.current = value;
    setSortState(sortRef.current);
  };

  const loadingRef = useRef(false);
  const [loading, setLoadingState] = useState(loadingRef.current);
  const setLoading = (value) => {
    loadingRef.current = value;
    setLoadingState(loadingRef.current);
  };

  const nextPageRef = useRef(1);
  const [nextPage, setNextPageState] = useState(nextPageRef.current);
  const setNextPage = (value) => {
    nextPageRef.current = value;
    setNextPageState(nextPageRef.current);
  };

  const updateMovies = (prevMovies, action = { type: 'reset', newMovies: null }) => {
    if (action.type === 'concat') {
      return prevMovies.concat(action.newMovies);
    }
    return [];
  };
  const [movies, dispatchMovies] = useReducer(updateMovies, []);

  const getMovies = () => {
    const url = `${MOVIES_LIST_URL}?api_key=${API_KEY}&page=${nextPageRef.current}&sort_by=${sortRef.current}`;

    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        setNextPage(nextPageRef.current + 1);
        totalPages = res.data.total_pages;
        dispatchMovies({ type: 'concat', newMovies: res.data.results });
        setLoading(false);
      })
      .catch(() => {
        setNextPage(1);
        totalPages = 1;
        dispatchMovies();
        setLoading(false);
      });
  };

  const handleScroll = () => {
    const bottomDistance = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;
    const thresdhold = window.innerHeight * 2;

    if (bottomDistance > thresdhold || loadingRef.current || nextPage > totalPages) return;

    getMovies();
  };

  const initMovies = () => {
    getMovies();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };

  useEffect(initMovies, []);

  const handleChange = (value) => {
    setNextPage(1);
    setSort(value);
    dispatchMovies();
    getMovies();
  };

  return (
    <>
      <ListHeader sortCriterion={sort} onSelectChange={handleChange} />
      <MoviesList movies={movies} />
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default MoviesListPage;
