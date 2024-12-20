import { Tabs } from 'antd';
import { Component } from 'react';

import Rated from '../RenderComponent/RatedComponent';
import { Search } from '../RenderComponent/SearchComponent';
import GetResponse from '../GetResponse/GetResponse';
import { ModuleProps } from '../../types';

export default class ModuleTab extends Component<ModuleProps> {
  state = {
    ratings: {},
  };

  onChangeRating = (movieID: number, value: number) => {
    if (value === 0) {
      const url = `https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${this.props.guestSessionId}`;
      GetResponse(url, 'DELETE', 'application/json;charset=utf-8');
    }
    const newObj: { [key: string]: number } = this.state.ratings;
    const id = movieID.toString();
    newObj[id] = value;
    this.setState({
      ratings: newObj,
    });
  };

  render() {
    return (
      <Tabs
        centered
        destroyInactiveTabPane
        className="tabs-container"
        defaultActiveKey="1"
        items={[
          {
            label: 'Search',
            key: '1',
            children: <Search {...this.props} onChangeRating={this.onChangeRating} rating={this.state.ratings} />,
          },
          {
            label: 'Rated',
            key: '2',
            children: (
              <Rated
                guestSessionId={this.props.guestSessionId}
                rating={this.state.ratings}
                onChangeRating={this.onChangeRating}
              />
            ),
          },
        ]}
      />
    );
  }
}
