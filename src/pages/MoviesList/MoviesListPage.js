import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MOVIES_LIST_URL, API_KEY } from '../../App.constants';
import axios from '../../utils/axios';
import MoviesList from '../../components/MoviesList/MoviesList';
import ListHeader from '../../components/ListHeader/ListHeader';

class MoviesListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      nextPage: 1,
      loading: false,
      totalPages: 1,
      sortCriterion: 'popularity.desc'
    };
  }

  componentDidMount() {
    const { nextPage, sortCriterion } = this.state;
    this.getMovies(nextPage, sortCriterion);

    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  getMovies(pageNumber, sortCriterion) {
    const url = `${MOVIES_LIST_URL}?api_key=${API_KEY}&page=${pageNumber}&sort_by=${sortCriterion}`;

    this.setState({ loading: true });

    axios
      .get(url)
      .then((res) => {
        const { movies } = this.state;

        this.setState({
          movies: movies.concat(res.data.results),
          nextPage: pageNumber + 1,
          loading: false,
          totalPages: res.total_pages
        });
      })
      .catch(() => {
        this.setState({
          movies: [],
          nextPage: 1,
          loading: false,
          totalPages: 1
        });
      });
  }

  handleChange = (value) => {
    this.setState({
      movies: [],
      nextPage: 1,
      sortCriterion: value
    });
    this.getMovies(1, value);
  };

  handleScroll() {
    const { nextPage, loading, totalPages, sortCriterion } = this.state;
    const bottomDistance = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;
    const thresdhold = window.innerHeight * 2;

    if (bottomDistance > thresdhold || loading || nextPage > totalPages) return;

    this.getMovies(nextPage, sortCriterion);
  }

  render() {
    const { movies, loading, sortCriterion } = this.state;
    return (
      <>
        <ListHeader sortCriterion={sortCriterion} onSelectChange={this.handleChange} />
        <MoviesList movies={movies} />
        {loading && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
      </>
    );
  }
}

export default MoviesListPage;
