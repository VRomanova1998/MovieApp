import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Alert } from 'antd';

import { CardList } from './components/CardList/CardList';
import GetResponse from './components/GetResponse/GetResponse';
import './App.css';

class App extends Component {
  state = {
    res: [],
    loading: false,
    error: false,
    errorMessage: '',
  };

  onError = (message: string) => {
    this.setState({
      loading: false,
      error: true,
      errorMessage: message,
    });
  };

  getResponse = async () => {
    this.setState({
      loading: true,
    });
    try {
      let resultResponse = await GetResponse();
      resultResponse = resultResponse.results;
      if (resultResponse.length === 0) {
        throw new Error('По вашему запросу ничего не найдено или проблемы с сервером');
      }
      this.setState(() => {
        return {
          res: resultResponse,
          loading: false,
        };
      });
    } catch (err) {
      this.onError(err.message);
    }
  };

  render() {
    const { loading, error, errorMessage } = this.state;
    const hasData = !(loading || error);
    const errorAlert = error ? <Alert message={errorMessage} type="error" showIcon className="error-format" /> : null;
    const spiner = loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> : null;
    const cardList = hasData ? <CardList dataArray={this.state.res} /> : null;

    if (navigator.onLine) {
      return (
        <div>
          {errorAlert}
          {spiner}
          {cardList}
          <button onClick={this.getResponse}>Отправить запрос</button>
        </div>
      );
    } else
      return (
        <Alert
          message="Нет подключения к интернету, проверьте интернет-соединение и повторите попытку."
          type="error"
          showIcon
          className="error-format"
        />
      );
  }
}

export default App;
