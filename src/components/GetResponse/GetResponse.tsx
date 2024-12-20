import { Alert } from 'antd';

interface optionType {
  method: string;
  headers: {
    accept: string;
    'Content-Type': string;
    Authorization: string;
  };
  body?: string;
}

const GetResponse = async (url: string, method: string, type = '', ratingValue = 0) => {
  try {
    const options: optionType = {
      method: method,
      headers: {
        accept: 'application/json',
        'Content-Type': type,
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM4ZTAyY2I3YmVlYjBkNzZiYWZhZGVmMDY2MjhjMSIsIm5iZiI6MTczMzI1OTc5Mi4wODA5OTk5LCJzdWIiOiI2NzRmNzIxMGI2NjY4MzBiNmU0M2NiYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k-oCpffGpNFxpX8rP9OlmTrf8zt9mvGoiM0TE5hzlx4',
      },
    };
    if (method === 'POST') {
      options.body = `{"value":${ratingValue}}`;
    }
    const response = await fetch(url, options);
    if (response.ok) {
      return await response.json();
    } else throw new Error('Ошибка запроса на сервер');
  } catch (err) {
    return <Alert message="Ошибка запроса на сервер." type="error" showIcon className="error-format" />;
  }
};
export default GetResponse;
