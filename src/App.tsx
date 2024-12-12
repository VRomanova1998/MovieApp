import { Component } from 'react';
import { Pagination } from 'antd';
import { debounce } from 'lodash';

import { CardList } from './components/CardList/CardList';
import RequestForm from './components/RequestForm/RequestForm';
import GetResponse from './components/GetResponse/GetResponse';
import ViewFragment from './ViewFragment';
import './App.css';
import NoConnectionError from './components/Errors/NoConnectionError';

class SearchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SearchError';
  }
}

class App extends Component {
  state = {
    label: '',
    res: [],
    loading: false,
    error: false,
    errorName: '',
    errorMessage: '',
    online: navigator.onLine,
    totalPages: 1,
    currentPage: 1,
  };

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

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
    });
    try {
      const response = await GetResponse(this.state.label, this.state.currentPage);
      const resultResponse = response.results;
      if (resultResponse.length === 0 && this.state.label !== '') {
        throw new SearchError('По Вашему запросу ничего не найдено');
      }
      this.setState(() => {
        return {
          res: resultResponse,
          loading: false,
          totalPages: response.total_pages,
          currentPage: response.page,
        };
      });
    } catch (err) {
      this.onError(err.name, err.message);
    }
  };

  debouncedSearch = debounce(this.getResponse, 1200);

  componentDidUpdate(prevProps: any, prevState: { label: string; currentPage: number }) {
    if (prevState.label !== this.state.label || prevState.currentPage !== this.state.currentPage) {
      this.debouncedSearch();
    }
  }

  render() {
    const { loading, error, errorMessage, errorName, res, totalPages, currentPage, online } = this.state;
    const hasData = !(loading || error) && res.length !== 0;
    const cardList = hasData ? <CardList dataArray={res} /> : null;
    const pagination = cardList ? (
      <Pagination
        align="center"
        defaultCurrent={currentPage}
        total={totalPages}
        onChange={(page) => {
          this.setState({
            currentPage: page,
          });
        }}
      />
    ) : null;
    if (!online) return <NoConnectionError />;
    return (
      <div>
        <RequestForm onChangeLabel={this.onChangeLabel} />
        <ViewFragment loading={loading} error={error} errorMessage={errorMessage} errorName={errorName} />
        {cardList}
        {pagination}
      </div>
    );
  }
}

export default App;
