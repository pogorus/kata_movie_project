import React from 'react';
import { Image } from 'antd';

import './movie-card-image.css';

const MovieCardImage = (props) => (
  <div className={props.className}>
    <Image src={`https://image.tmdb.org/t/p/original${props.src}`} />
  </div>
);
export default MovieCardImage;
