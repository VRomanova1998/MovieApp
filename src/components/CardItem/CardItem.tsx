/* eslint-disable import/order */
import './card-item.css';

import { format } from 'date-fns';

//import MovieDescription from '../MovieDescription/MovieDescription';
import { Card, Flex, Typography } from 'antd';
const { Text, Title } = Typography;

const shortOverview = (text: string) => {
  if (text.length < 280) return text;
  let newText = text.slice(0, 280);
  const last = newText.lastIndexOf(' ');
  newText = newText.slice(0, last);
  return newText + ' ...';
};

const releaseDate = (date: string) => {
  if (date) {
    return format(new Date(date), 'MMMM dd, yyyy');
  }
  return;
};

const CardItem: React.FC = (props) => (
  <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden' } }} className="cardItem">
    <Flex justify="flex-start">
      <img alt="avatar" src="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg" className="image" />
      <Flex vertical align="flex-start" justify="flex-start" className="description_container">
        <Title level={4} className="title" style={{ margin: 0 }}>
          {props.title}
        </Title>
        <Text type="secondary" className="text">
          {releaseDate(props.release_date)}
        </Text>
        <div>
          <Text keyboard className="text">
            Action
          </Text>
          <Text keyboard className="text">
            Drama
          </Text>
        </div>
        <Text className="text">{shortOverview(props.overview)}</Text>
      </Flex>
    </Flex>
  </Card>
);

export default CardItem;
