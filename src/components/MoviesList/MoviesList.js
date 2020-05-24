import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from 'react-router-dom';

import { IMAGE_BASE_URL, POSTER_SIZE, DEFAULT_IMAGE_BASE_URL } from '../../App.constants';
import './MoviesList.css';

const MoviesList = (props) => {
  const { movies } = props;
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/movie/${id}`);
  };

  return (
    <div className="grid">
      <GridList cellHeight="auto" spacing={10} cols={4} className="grid-list">
        {movies.map((movie) => {
          const imgSrc = movie.poster_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
            : `${DEFAULT_IMAGE_BASE_URL}${POSTER_SIZE}/defaultPoster.jpg`;

          const votes = `${movie.vote_count} Votes`;

          const subTitleTemplate = (
            <>
              <Rating value={movie.vote_average / 2} precision={0.1} emptyIcon={<StarBorderIcon fontSize="inherit" />} readOnly />
              <span className="grid-vote-count">{votes}</span>
            </>
          );

          return (
            <GridListTile key={movie.id} classes={{ tile: 'grid-tile', imgFullHeight: 'grid-img' }} onClick={() => handleClick(movie.id)}>
              <img src={imgSrc} alt={movie.title} />
              <GridListTileBar
                className="grid-tile-bar"
                classes={{ title: 'grid-title', subtitle: 'grid-subtitle' }}
                title={movie.title}
                subtitle={subTitleTemplate}
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MoviesList;
