import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { MOVIE_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, DEFAULT_IMAGE_BASE_URL, DETAIL_POSTER_SIZE } from '../../App.constants';
import axios from '../../utils/axios';
import './MoviePage.css';

const MoviePage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [state, setState] = useState({
    movie: {
      title: '',
      subtitle: '',
      belongs_to_collection: [],
      status: '',
      releaseDate: '',
      popularity: 0,
      overview: '',
      vote_average: 0,
      vote_count: 0,
      spoken_languages: [],
      production_countries: [],
      production_companies: [],
      genres: []
    },
    imgSrc: ''
  });

  useEffect(() => {
    const url = `${MOVIE_URL}${id}?api_key=${API_KEY}`;
    window.scrollTo(0, 0);

    axios.get(url).then((res) => {
      const movie = res.data;
      const imgSrc = movie.backdrop_path
        ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`
        : `${DEFAULT_IMAGE_BASE_URL}${BACKDROP_SIZE}/defaultBackdrop.jpg`;
      setState({
        movie,
        imgSrc
      });
    });
  }, [id]);

  const handleScroll = () => {
    const headerEl = document.getElementById('movieHeader');
    const { scrollTop } = document.getElementById('movie');

    if (scrollTop > 20) {
      headerEl.classList.add('smaller');
    } else {
      headerEl.classList.remove('smaller');
    }
  };

  const goToMovies = () => {
    history.push('/movies');
  };

  const displayNames = (array) => {
    return array && array.length > 0 ? array.map((item) => item.name).join(', ') : '';
  };

  const displayImage = (item, pathProp) => {
    if (!item) return ``;
    if (item[pathProp]) {
      const imgSrc = `${IMAGE_BASE_URL}${DETAIL_POSTER_SIZE}${item[pathProp]}`;
      return <img key={item.id} src={imgSrc} alt={item.name} title={item.name} />;
    }
    return <span key={item.name}>{item.name}</span>;
  };

  const votesTemplate = `${state.movie.vote_average} by ${state.movie.vote_count} people`;

  return (
    <div id="movie" className="movie" onScroll={handleScroll}>
      <header id="movieHeader" className="movie-header" style={{ backgroundImage: `url(${state.imgSrc})` }}>
        <div className="movie-header-titles">
          <ArrowBackIosIcon className="movie-header-back" onClick={goToMovies} />
          <div className="movie-header-title">{state.movie.title}</div>
          <div className="movie-header-subtitle">{state.movie.tagline}</div>
        </div>
      </header>
      <div className="movie-content">
        <TableContainer className="movie-table" component={Paper}>
          <Table aria-label="movie information table">
            <TableBody>
              <TableRow>
                <TableCell className="movie-row-title">Overview</TableCell>
                <TableCell>{state.movie.overview}</TableCell>
              </TableRow>
              {state.movie.belongs_to_collection && (
                <TableRow>
                  <TableCell className="movie-row-title">Collection</TableCell>
                  <TableCell>{displayImage(state.movie.belongs_to_collection, 'poster_path')}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell className="movie-row-title">Status</TableCell>
                <TableCell>{state.movie.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="movie-row-title">Release date</TableCell>
                <TableCell>{state.movie.release_date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="movie-row-title">Popularity</TableCell>
                <TableCell>{state.movie.popularity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="movie-row-title">Type</TableCell>
                <TableCell className="movie-cell-type">
                  {!state.movie.adult && (
                    <span className="movie-cell-child" title="Kids friendly">
                      <ChildCareIcon />
                    </span>
                  )}
                  {displayNames(state.movie.genres)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="movie-row-title">Vote</TableCell>
                <TableCell>{votesTemplate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="movie-row-title">Spoken languages</TableCell>
                <TableCell>{displayNames(state.movie.spoken_languages)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="movie-row-title">Production countries</TableCell>
                <TableCell>{displayNames(state.movie.production_countries)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="movie-row-title">Production companies</TableCell>
                <TableCell className="movie-cell-companies">
                  {state.movie.production_companies.map((item) => displayImage(item, 'logo_path'))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MoviePage;
