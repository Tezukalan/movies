const moviesInfo = (state = { movies: [], nextPage: 1, totalPages: 1 }, action) => {
  switch (action.type) {
    case 'CONCAT':
      return {
        movies: [...state.movies, ...action.newMovies],
        nextPage: action.nextPage,
        totalPages: action.totalPages
      };

    case 'RESET':
      return { movies: [], nextPage: 1, totalPages: 1 };

    default:
      return state;
  }
};

export default moviesInfo;
