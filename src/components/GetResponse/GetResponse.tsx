import { Alert } from 'antd';

const GetResponse = async (label: string, currentPage: number) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM4ZTAyY2I3YmVlYjBkNzZiYWZhZGVmMDY2MjhjMSIsIm5iZiI6MTczMzI1OTc5Mi4wODA5OTk5LCJzdWIiOiI2NzRmNzIxMGI2NjY4MzBiNmU0M2NiYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k-oCpffGpNFxpX8rP9OlmTrf8zt9mvGoiM0TE5hzlx4',
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${label}&language=en-US&page=${currentPage}`,
      options
    );
    if (response.ok) {
      return await response.json();
    } else throw new Error('Ошибка запроса на сервер');
  } catch (err) {
    return <Alert message="Ошибка запроса на сервер." type="error" showIcon className="error-format" />;
  }
};
export default GetResponse;
