import { Card, Flex } from 'antd';

import MovieDescription from '../MovieDescription/MovieDescription';

import './card-item.css';

type PropsFormat = {
  id?: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
};

function getPoster(poster: string) {
  if (poster) {
    return `https://image.tmdb.org/t/p/original${poster}`;
  }
  return 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Out_Of_Poster.jpg';
}

const CardItem = (prop: PropsFormat) => {
  return (
    <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden' } }} className="cardItem">
      <Flex justify="flex-start">
        <img alt="poster" src={getPoster(prop.poster_path)} className="image" />
        <MovieDescription
          poster_path={prop.poster_path}
          title={prop.title}
          release_date={prop.release_date}
          overview={prop.overview}
        />
      </Flex>
    </Card>
  );
};

export default CardItem;
