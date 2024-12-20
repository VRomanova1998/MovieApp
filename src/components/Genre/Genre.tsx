import { Typography } from 'antd';
import '../CardItem/card-item.css';
const { Text } = Typography;

type GenreFormat = {
  id: number;
  name: string;
};

const Genre = (props: { genreDataArr: GenreFormat[]; genreIds: Array<number> }) => {
  const genreArr = props.genreDataArr;
  const currentGenre = props.genreIds.map((item, index) => {
    const genre = genreArr.find((el: GenreFormat) => el.id === item)?.name;
    return (
      <Text keyboard className="text" key={index}>
        {genre}
      </Text>
    );
  });
  return <div className="genre_container">{props.genreIds.length !== 0 ? currentGenre : 'Жанры не указаны'}</div>;
};

export default Genre;
