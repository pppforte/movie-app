import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import { TableCell, TableRow } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';

function Movie({ index, title, poster, rating, synopsis }) {
  return (
    <TableRow>
      <TableCell>
        <h1>{index}</h1>
      </TableCell>
      <TableCell>
        <MoviePoster poster={poster} alt={title} />
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
      <h2>{rating}</h2>
          <span className="star-rating">
            <span style={{ width:rating*10+"%" }}></span>
          </span>
      </TableCell>
      <TableCell>
        <LinesEllipsis text={synopsis} maxLine="1" />
      </TableCell>
    </TableRow>
  );
}

function MoviePoster({ poster, alt }) {
  return <img src={poster} alt={alt} />;
}

Movie.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  synopsis: PropTypes.string.isRequired
};

MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired
};

export default Movie;
