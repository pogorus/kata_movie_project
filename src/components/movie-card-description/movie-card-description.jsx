import React, { Component } from 'react';
import { Flex, Rate, Tag } from 'antd';
import format from 'date-fns/format';

import MovieCardImage from '../movie-card-image';
import { GenresConsumer } from '../genres-context';

import './movie-card-description.css';

export default class MovieCardDescription extends Component {
  state = {
    ratingColor: null,
  };

  formatOverview = (overview) => {
    if (overview.split(' ').length < 35) {
      return overview;
    }

    return overview.split(' ').slice(0, 35).join(' ') + ' ...';
  };

  getRatingColor = (rating) => {
    if (rating > 7) return '#66E900';
    else if (rating <= 7 && rating > 5) return '#E9D100';
    else if (rating <= 5 && rating > 3) return '#E97E00';
    else return '#E90000';
  };

  componentDidMount() {
    const color = this.getRatingColor(this.props.rating);
    this.setState({
      ratingColor: color,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.rating !== prevProps.rating) {
      const color = this.getRatingColor(this.props.rating);
      this.setState({
        ratingColor: color,
      });
    }
  }

  render() {
    const { title, release_date, genre_ids, overview, rating, src } = this.props;

    return (
      <div className="description-layer">
        <Flex className="descriptionSmall">
          <MovieCardImage className={'posterSmall'} src={src} />
          <Flex vertical justify="space-between" gap="8px" className="description_header">
            <Flex justify="space-between" align="start">
              <h5 className="movie_title">{title}</h5>
              <span className="movie_rating" style={{ borderColor: this.state.ratingColor }}>
                {rating ? rating : 0}
              </span>
            </Flex>
            <p className="release_date" style={{ fontSize: '12px' }}>
              {release_date ? format(release_date, 'MMMMMMMM dd, yyyy') : 'Unknown release date'}
            </p>
            <Flex wrap gap="5px">
              <GenresConsumer>
                {(genres) => {
                  return genre_ids.map((genre) => <Tag key={genre}>{genres[genre]}</Tag>);
                }}
              </GenresConsumer>
            </Flex>
          </Flex>
        </Flex>
        <p className="overview">{this.formatOverview(overview)}</p>
        <Rate count={10} onChange={this.props.onRate} value={rating} className="rating_bar" />
      </div>
    );
  }
}
