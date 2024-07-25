import React from 'react';
import { Flex } from 'antd';

import MovieCardImage from '../movie-card-image';
import MovieCardDescription from '../movie-card-description';

import './movie-card.css';

const MovieCard = (props) => {
  const { poster_path, title, id, release_date, genre_ids, overview, rating } = props;

  return (
    <div className="movie_card_layer">
      <Flex gap="15" justify="space-between" className="movie_card">
        <MovieCardImage className={'posterBig'} src={poster_path} />
        <MovieCardDescription
          title={title}
          id={id}
          release_date={release_date}
          genre_ids={genre_ids}
          overview={overview}
          rating={rating}
          src={poster_path}
          onRate={(e) => {
            props.onRate(e);
          }}
        />
      </Flex>
    </div>
  );
};

export default MovieCard;
