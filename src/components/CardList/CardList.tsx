import CardItem from '../CardItem/CardItem';
import './card-list.css';

interface CardListProps {
  dataArray: object[];
}

type ItemFormat = {
  id?: number;
};

const CardList = (props: CardListProps) => {
  const itemMovieData = props.dataArray.map((item: ItemFormat) => {
    return <CardItem {...item} key={item.id} />;
  });
  return <div className="card-list-container">{itemMovieData}</div>;
};

export { CardList };
