import CardItem from '../CardItem/CardItem';

import './card-list.css';

interface CardListProps {
  dataArray: Array<object>;
}

type ItemFormat = {
  original_title?: string;
  release_date: string;
  overview: string;
  id?: number;
};

const CardList = (props: CardListProps) => {
  const itemMovieData = props.dataArray.map((item: ItemFormat) => {
    return <CardItem {...item} key={item.id} />;
  });
  console.log(itemMovieData);
  return <div className="card-list-container">{itemMovieData}</div>;
};

export { CardList };
