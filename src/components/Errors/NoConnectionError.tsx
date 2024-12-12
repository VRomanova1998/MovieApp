import { Alert } from 'antd';

import './errors.css';

const NoConnectionError = () => {
  return (
    <Alert
      message="Нет подключения к интернету, проверьте интернет-соединение и повторите попытку."
      type="error"
      showIcon
      className="error-format"
    />
  );
};

export default NoConnectionError;
