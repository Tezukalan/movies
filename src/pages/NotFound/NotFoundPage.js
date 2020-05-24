import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/movies`);
  };

  return (
    <div className="not-found-content">
      Oops, page not found !
      <Button className="go-back-button" variant="outlined" color="primary" onClick={handleClick}>
        Go to movies list
      </Button>
    </div>
  );
};

export default NotFoundPage;
