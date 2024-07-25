import React from 'react';
import { Flex } from 'antd';

import MovieCard from '../movie-card';

import './movie-card-list.css';

const MovieCardList = (props) => {
  const movieCards = props.movies.map((movie) => {
    return (
      <MovieCard key={movie.id} {...movie} rating={props.rating[movie.id]} onRate={(e) => props.onRate(e, movie.id)} />
    );
  });

  return (
    <Flex wrap gap="30px" justify="center" className="movie_card_list">
      {movieCards}
    </Flex>
  );
};

export default MovieCardList;
