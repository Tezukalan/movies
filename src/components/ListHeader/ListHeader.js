import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './ListHeader.css';

const ListHeader = (props) => {
  const { sortCriterion, onSelectChange } = props;

  const [state, setState] = React.useState({
    sortCriterion
  });

  const handleChange = (event) => {
    setState({
      sortCriterion: event.target.value
    });

    onSelectChange(event.target.value);
  };

  const sortTemplate = (
    <FormControl variant="outlined">
      <InputLabel htmlFor="sort-label">Sort by</InputLabel>
      <Select
        native
        value={state.sortCriterion}
        onChange={handleChange}
        label="Sort by"
        className="header-sort"
        inputProps={{
          name: 'sort',
          id: 'sort'
        }}
        data-testid="sort"
      >
        <option value="popularity.desc">Popularity</option>
        <option value="vote_average.desc">Vote average</option>
        <option value="vote_count.desc">Vote count</option>
        <option value="revenue.desc">Revenue</option>
        <option value="release_date.desc">Newest release date</option>
        <option value="release_date.asc">Oldest release date </option>
        <option value="primary_release_date.desc">Newest primary release date</option>
        <option value="primary_release_date.asc">Oldest primary release date</option>
      </Select>
    </FormControl>
  );

  return (
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <Typography variant="h6">MOVIES</Typography>

        <div className="header-input">{sortTemplate}</div>
      </Toolbar>
    </AppBar>
  );
};

ListHeader.propTypes = {
  sortCriterion: PropTypes.string.isRequired,
  onSelectChange: PropTypes.func.isRequired
};

export default ListHeader;
