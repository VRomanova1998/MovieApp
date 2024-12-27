import React, { Component } from 'react';
import { Flex, Typography, Rate } from 'antd';
import { format } from 'date-fns';

import { GenreDataConsumer } from '../GenreContext/GenreContext';
import '../CardItem/card-item.css';
import Genre from '../Genre/Genre';
import { ItemFormat, SearchProps } from '../../types';
import { createColorRating, postNewRating } from '../../helper';

const { Text, Title } = Typography;

class MovieDescription extends Component<ItemFormat & SearchProps> {
  releaseDate(date: string) {
    if (date) {
      return format(new Date(date), 'MMMM dd, yyyy');
    }
    return;
  }
  shortOverview(text: string) {
    if (text.length < 240) return text;
    let newText = text.slice(0, 240);
    const last = newText.lastIndexOf(' ');
    newText = newText.slice(0, last);
    return newText + ' ...';
  }
  handleChangeRate = (value: number) => {
    this.props.onChangeRating(this.props.id, value);
    if (value === 0) return;
    postNewRating(this.props.id, this.props.guestSessionId, value);
  };
  render() {
    const voteAverage = this.props.vote_average.toFixed(1);
    const colorClass = createColorRating(voteAverage);
    const className = 'rating ' + colorClass;
    const id = this.props.id.toString();
    return (
      <React.Fragment>
        <Flex vertical align="flex-start" className="description_container description_container_mobile">
          <Flex justify="space-between" className="header-movie-description">
            <Title level={4} className="title" style={{ margin: 0 }} rootClassName="title">
              {this.props.title}
            </Title>
            <span className={className}>{voteAverage}</span>
          </Flex>

          <Text type="secondary" className="text header-movie-description">
            {this.props.release_date ? this.releaseDate(this.props.release_date) : 'Дата проивзодства неизвестна'}
          </Text>
          <GenreDataConsumer>
            {(genreDataArr) => {
              return <Genre genreDataArr={genreDataArr} genreIds={this.props.genre_ids} />;
            }}
          </GenreDataConsumer>
          <Text className="text description">{this.shortOverview(this.props.overview)}</Text>
          <Rate
            allowHalf
            defaultValue={this.props.rating[id] || 0}
            count={10}
            className="rate"
            onChange={this.handleChangeRate}
          />
        </Flex>
      </React.Fragment>
    );
  }
}

export default MovieDescription;
