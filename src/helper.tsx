import { Alert } from 'antd';

export const getGenreDataRequest = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM4ZTAyY2I3YmVlYjBkNzZiYWZhZGVmMDY2MjhjMSIsIm5iZiI6MTczMzI1OTc5Mi4wODA5OTk5LCJzdWIiOiI2NzRmNzIxMGI2NjY4MzBiNmU0M2NiYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k-oCpffGpNFxpX8rP9OlmTrf8zt9mvGoiM0TE5hzlx4',
      },
    };
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    if (response.ok) {
      return await response.json();
    } else throw new Error('Ошибка запроса на сервер');
  } catch (err) {
    return <Alert message="Ошибка запроса на сервер." type="error" showIcon className="error-format" />;
  }
};

export const getMovieDataRequest = async (label: string, currentPage: number) => {
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

export const deleteRating = async (movieID: number, guestSessionId: number) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM4ZTAyY2I3YmVlYjBkNzZiYWZhZGVmMDY2MjhjMSIsIm5iZiI6MTczMzI1OTc5Mi4wODA5OTk5LCJzdWIiOiI2NzRmNzIxMGI2NjY4MzBiNmU0M2NiYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k-oCpffGpNFxpX8rP9OlmTrf8zt9mvGoiM0TE5hzlx4',
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${guestSessionId}`,
      options
    );
    if (response.ok) {
      return await response.json();
    } else throw new Error('Удаление рейтинга не удалось');
  } catch (err) {
    return <Alert message="Удаление рейтинга не удалось" type="error" showIcon className="error-format" />;
  }
};

export const myRatingRequest = async (guestId: number, currentPage: number) => {
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
      `https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?language=en-US&page=${currentPage}&sort_by=created_at.asc`,
      options
    );
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status === 404) {
        return 'error';
      }
    }
  } catch (err) {
    return <Alert message="Ошибка запроса на сервер." type="error" showIcon className="error-format" />;
  }
};

export const postNewRating = async (id: number, guestSessionId: number, ratingValue: number) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM4ZTAyY2I3YmVlYjBkNzZiYWZhZGVmMDY2MjhjMSIsIm5iZiI6MTczMzI1OTc5Mi4wODA5OTk5LCJzdWIiOiI2NzRmNzIxMGI2NjY4MzBiNmU0M2NiYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k-oCpffGpNFxpX8rP9OlmTrf8zt9mvGoiM0TE5hzlx4',
      },
      body: `{"value":${ratingValue}}`,
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestSessionId}`,
      options
    );
    if (response.ok) {
      return await response.json();
    } else throw new Error('Ошибка запроса на сервер');
  } catch (err) {
    return <Alert message="Ошибка запроса на сервер." type="error" showIcon className="error-format" />;
  }
};

export const createColorRating = (voteaverage: string) => {
  return Number(voteaverage) <= 3
    ? 'red'
    : Number(voteaverage) > 3 && Number(voteaverage) <= 5
      ? 'orange'
      : Number(voteaverage) > 5 && Number(voteaverage) <= 7
        ? 'yellow'
        : 'green';
};
