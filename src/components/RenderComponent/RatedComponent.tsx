import React, { Component } from 'react';
import { Pagination } from 'antd';

import { CardList } from '../CardList/CardList';

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

  createGetResponse = async (guestId: number) => {
    this.setState({
      loading: true,
      error: false,
    });
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM4ZTAyY2I3YmVlYjBkNzZiYWZhZGVmMDY2MjhjMSIsIm5iZiI6MTczMzI1OTc5Mi4wODA5OTk5LCJzdWIiOiI2NzRmNzIxMGI2NjY4MzBiNmU0M2NiYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k-oCpffGpNFxpX8rP9OlmTrf8zt9mvGoiM0TE5hzlx4',
      },
    };

    const resRate = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?language=en-US&page=${this.state.currentPage}&sort_by=created_at.asc`,
      options
    );
    if (resRate.status === 404) {
      this.setState({
        error: true,
      });
    }
    const resRateJson = await resRate.json();
    const dataRate = await resRateJson.results;
    this.setState({
      dataMovie: dataRate,
      loading: false,
      totalResults: resRateJson.total_results,
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
