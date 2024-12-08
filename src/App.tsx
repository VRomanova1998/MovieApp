import React, { Component } from 'react';

import { CardList } from './components/CardList/CardList';

class App extends Component {
  state = {
    res: [],
  };
  getResponse = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM4ZTAyY2I3YmVlYjBkNzZiYWZhZGVmMDY2MjhjMSIsIm5iZiI6MTczMzI1OTc5Mi4wODA5OTk5LCJzdWIiOiI2NzRmNzIxMGI2NjY4MzBiNmU0M2NiYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k-oCpffGpNFxpX8rP9OlmTrf8zt9mvGoiM0TE5hzlx4',
      },
    };
    const response = await fetch('https://api.themoviedb.org/3/search/movie?query=return&language=en-US', options);
    const json = await response.json();
    this.setState(() => {
      return {
        res: json.results,
      };
    });
  };

  check = () => {
    console.log(this.state.res);
  };

  render() {
    return (
      <div>
        <CardList dataArray={this.state.res} />
        <button onClick={this.getResponse}>Отправить запрос</button>
        <button onClick={this.check}>Ешь меня</button>
      </div>
    );
  }
}

export default App;
