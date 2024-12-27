import { Tabs } from 'antd';
import { Component } from 'react';

import Rated from '../RenderComponent/RatedComponent';
import { Search } from '../RenderComponent/SearchComponent';
import { ModuleProps } from '../../types';
import { deleteRating } from '../../helper';

export default class ModuleTab extends Component<ModuleProps> {
  state = {
    ratings: {},
  };

  onChangeRating = (movieID: number, value: number) => {
    if (value === 0) {
      deleteRating(movieID, this.props.guestSessionId);
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
