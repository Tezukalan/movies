import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import { MOVIES_LIST_URL, API_KEY } from '../../App.constants';
import axios from '../../utils/axios';
import MoviesList from '../../components/MoviesList/MoviesList';
import ListHeader from '../../components/ListHeader/ListHeader';
import { concat, reset, setSort } from '../../actions';
import './MoviesListPage.css';

const MoviesListPage = ({ dispatch, movies, nextPage, totalPages, sort }) => {
  const loadingRef = useRef(false);
  const [loading, setLoadingState] = useState(loadingRef.current);
  const setLoading = (value) => {
    loadingRef.current = value;
    setLoadingState(loadingRef.current);
  };

  const getMovies = (next, newSortVal) => {
    const urlNextPage = next || nextPage;
    const urlSort = newSortVal || sort;
    const url = `${MOVIES_LIST_URL}?api_key=${API_KEY}&page=${urlNextPage}&sort_by=${urlSort}`;

    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        dispatch(concat(res.data.results, res.data.total_pages));
        setLoading(false);
      })
      .catch(() => {
        dispatch(reset());
        setLoading(false);
      });
  };

  const handleScroll = (next, total) => {
    const { clientHeight } = document.getElementById('list');
    const { scrollTop } = document.getElementById('listContainer');
    const bottomDistance = clientHeight - scrollTop - window.innerHeight + 64;
    const thresdhold = window.innerHeight;

    if (bottomDistance > thresdhold || loadingRef.current || next > total) return;

    getMovies();
  };

  const initMovies = () => {
    if (movies.length === 0) {
      getMovies();
    }
  };

  useEffect(initMovies, []);

  const handleChange = (val) => {
    dispatch(setSort(val));
    dispatch(reset());
    getMovies(1, val);
  };

  return (
    <div
      id="listContainer"
      className="list-container"
      onScroll={() => {
        handleScroll(nextPage, totalPages);
      }}
    >
      <ListHeader sortCriterion={sort} onSelectChange={handleChange} />
      <MoviesList movies={movies} />
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

MoviesListPage.propTypes = {
  // eslint-disable-next-line
  dispatch: PropTypes.any.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.moviesInfo.movies,
  nextPage: state.moviesInfo.nextPage,
  totalPages: state.moviesInfo.totalPages,
  sort: state.sort
});

export default connect(mapStateToProps)(MoviesListPage);
