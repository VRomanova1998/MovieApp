import { Component } from 'react';
import { Card, Flex } from 'antd';

import MovieDescription from '../MovieDescription/MovieDescription';
import { ItemFormat, SearchProps } from '../../types';

import './card-item.css';

function getPoster(poster: string) {
  if (poster) {
    return `https://image.tmdb.org/t/p/original${poster}`;
  }
  return 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Out_Of_Poster.jpg';
}

class CardItem extends Component<ItemFormat & SearchProps> {
  render() {
    return (
      <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden' } }} className="cardItem movie-card_mobile">
        <Flex justify="flex-start" className="movie-card-container_mobile">
          <img alt="poster" src={getPoster(this.props.poster_path)} className="image image_mobile" />
          <MovieDescription {...this.props} />
        </Flex>
      </Card>
    );
  }
}

export default CardItem;
