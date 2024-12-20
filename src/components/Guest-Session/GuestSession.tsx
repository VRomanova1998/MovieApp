const guestSession = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM4ZTAyY2I3YmVlYjBkNzZiYWZhZGVmMDY2MjhjMSIsIm5iZiI6MTczMzI1OTc5Mi4wODA5OTk5LCJzdWIiOiI2NzRmNzIxMGI2NjY4MzBiNmU0M2NiYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k-oCpffGpNFxpX8rP9OlmTrf8zt9mvGoiM0TE5hzlx4',
    },
  };
  const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options);
  const json = await response.json();
  return json.guest_session_id;
};

export default guestSession;
