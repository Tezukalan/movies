let nextPage = 1;

export const concat = (newMovies, totalPages) => {
  nextPage += 1;

  return {
    type: 'CONCAT',
    newMovies,
    nextPage,
    totalPages
  };
};

export const reset = () => {
  nextPage = 1;

  return {
    type: 'RESET'
  };
};

export const setSort = (sort) => {
  return {
    type: 'SET_SORT',
    sort
  };
};
