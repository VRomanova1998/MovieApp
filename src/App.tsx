import { Component } from 'react';
import { debounce } from 'lodash';

import './App.css';
import NoConnectionError from './components/Errors/NoConnectionError';
import ModuleTab from './components/Tabs/Tabs';
import GetResponse from './components/GetResponse/GetResponse';
import guestSession from './components/Guest-Session/GuestSession';
import { GenreDataProvider } from './components/GenreContext/GenreContext';

class SearchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SearchError';
  }
}

class App extends Component {
  state = {
    label: '',
    dataMovie: [],
    loading: false,
    error: false,
    errorName: '',
    errorMessage: '',
    online: navigator.onLine,
    totalResults: 1,
    currentPage: 1,
    guestSessionId: 0,
    genreDataArr: [],
  };

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
    this.createGuestSession();
    this.getGenreData();
  }

  componentDidUpdate(prevProps: unknown, prevState: { label: string; currentPage: number }) {
    if (prevState.label !== this.state.label || prevState.currentPage !== this.state.currentPage) {
      this.debouncedSearch();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  createGuestSession = async () => {
    const resGuest = await guestSession();
    this.setState({
      guestSessionId: resGuest,
    });
  };

  getGenreData = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const genreInfo = await GetResponse(url, 'GET');
    this.setState({
      genreDataArr: genreInfo.genres,
    });
  };

  updateOnlineStatus = () => {
    this.setState({ online: navigator.onLine });
  };

  onError = (name: string, message: string) => {
    this.setState({
      loading: false,
      error: true,
      errorName: name,
      errorMessage: message,
    });
  };

  onChangeLabel = async (value: string) => {
    this.setState({
      label: value,
    });
  };

  getResponse = async () => {
    this.setState({
      loading: true,
      error: false,
      errorName: '',
      errorMessage: '',
      totalResults: 1,
    });
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${this.state.label}&language=en-US&page=${this.state.currentPage}`;
      const response = await GetResponse(url, 'GET');
      const resultResponse = response.results;
      if (resultResponse.length === 0 && this.state.label !== '') {
        this.setState({
          totalResults: 1,
        });
        throw new SearchError('По Вашему запросу ничего не найдено');
      }
      this.setState(() => {
        return {
          dataMovie: resultResponse,
          loading: false,
          totalResults: response.total_results,
          currentPage: response.page,
        };
      });
    } catch (err) {
      this.onError(err.name, err.message);
    }
  };

  debouncedSearch = debounce(this.getResponse, 1200);

  onChangePage = (page: number) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    if (!this.state.online) return <NoConnectionError />;
    return (
      <GenreDataProvider value={this.state.genreDataArr}>
        <ModuleTab
          loading={this.state.loading}
          label={this.state.label}
          error={this.state.error}
          errorMessage={this.state.errorMessage}
          errorName={this.state.errorName}
          dataMovie={this.state.dataMovie}
          onChangeLabel={this.onChangeLabel}
          totalResults={this.state.totalResults}
          currentPage={this.state.currentPage}
          onChangePage={this.onChangePage}
          guestSessionId={this.state.guestSessionId}
        />
      </GenreDataProvider>
    );
  }
}

export default App;
