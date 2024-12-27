import React, { Component } from 'react';
import { Pagination } from 'antd';

import { CardList } from '../CardList/CardList';
import { myRatingRequest } from '../../helper';

interface Pro {
  guestSessionId: number;
  rating: { [key: string]: number };
  onChangeRating: (id: number, value: number) => void;
}

export default class Rated extends Component<Pro> {
  state = {
    dataMovie: [],
    guestId: this.props.guestSessionId,
    loading: false,
    error: false,
    currentPage: 1,
    totalResults: 1,
  };

  onChangePage = (page: number) => {
    this.setState({
      currentPage: page,
    });
  };

  componentDidMount = async () => {
    this.createGetResponse(this.state.guestId);
  };

  componentDidUpdate(prevProps: unknown, prevState: { currentPage: number }) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.createGetResponse(this.state.guestId);
    }
  }

  createGetResponse = (guestId: number) => {
    this.setState({
      loading: true,
      error: false,
    });
    myRatingRequest(guestId, this.state.currentPage).then((res) => {
      if (res === 'error') {
        this.setState({
          error: true,
        });
      }
      const dataRate = res.results;
      this.setState({
        dataMovie: dataRate,
        loading: false,
        totalResults: res.total_results,
      });
    });
  };
  render() {
    if (this.state.error) {
      return <div>Список оцененных Вами фильмов пуст</div>;
    }
    const data = this.state.dataMovie;
    const pagination =
      this.state.totalResults > 20 ? (
        <Pagination
          align="center"
          defaultCurrent={1}
          current={this.state.currentPage}
          total={this.state.totalResults}
          onChange={this.onChangePage}
          defaultPageSize={20}
          showSizeChanger={false}
        />
      ) : null;
    return (
      <React.Fragment>
        <CardList
          dataMovie={data}
          guestSessionId={this.state.guestId}
          rating={this.props.rating}
          onChangeRating={this.props.onChangeRating}
        />
        {pagination}
      </React.Fragment>
    );
  }
}
