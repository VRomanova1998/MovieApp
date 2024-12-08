/* eslint-disable import/order */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// async function getResponse() {
//   const response: Response = await fetch('https://api.themoviedb.org/3/search/movie/{return}', {
//     headers: {
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM4ZTAyY2I3YmVlYjBkNzZiYWZhZGVmMDY2MjhjMSIsIm5iZiI6MTczMzI1OTc5Mi4wODA5OTk5LCJzdWIiOiI2NzRmNzIxMGI2NjY4MzBiNmU0M2NiYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k-oCpffGpNFxpX8rP9OlmTrf8zt9mvGoiM0TE5hzlx4',
//     },
//   });
//   //const json: string = await response.json();
//   console.log(response);
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//getResponse();
