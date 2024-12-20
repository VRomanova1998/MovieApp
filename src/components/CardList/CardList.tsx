import CardItem from '../CardItem/CardItem';
import './card-list.css';
import { CardListProps } from '../../types';

const CardList = (props: CardListProps) => {
  const itemMovieData = props.dataMovie.map((item) => {
    console.log(item);
    return (
      <CardItem
        {...item}
        key={item.id}
        guestSessionId={props.guestSessionId}
        onChangeRating={props.onChangeRating}
        rating={props.rating}
      />
    );
  });
  return <div className="card-list-container">{itemMovieData}</div>;
};

export { CardList };
