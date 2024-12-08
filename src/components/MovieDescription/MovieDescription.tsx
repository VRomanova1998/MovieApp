import { Flex, Typography } from 'antd';
const { Text, Title } = Typography;

const MovieDescription: React.FC = () => (
  <div>
    <Flex vertical align="flex-start" justify="space-between" style={{ padding: 20 }}>
      <Title level={3} style={{ margin: 0 }}>
        The way back
      </Title>
      <Text type="secondary">March 5, 2020</Text>
      <div>
        <Text keyboard>Action</Text>
        <Text keyboard>Drama</Text>
      </div>
      <Text>
        A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts
        to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
      </Text>
    </Flex>
  </div>
);

export default MovieDescription;
