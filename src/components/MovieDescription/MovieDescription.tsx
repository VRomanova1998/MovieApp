import { Flex, Typography } from 'antd';
import { format } from 'date-fns';
const { Text, Title } = Typography;

type Format = {
  id?: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
};

function shortOverview(text: string) {
  if (text.length < 250) return text;
  let newText = text.slice(0, 250);
  const last = newText.lastIndexOf(' ');
  newText = newText.slice(0, last);
  return newText + ' ...';
}

function releaseDate(date: string) {
  if (date) {
    return format(new Date(date), 'MMMM dd, yyyy');
  }
  return;
}

const MovieDescription = (props: Format) => (
  <div>
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
  </div>
);

export default MovieDescription;
