import { Alert } from 'antd';

import './errors.css';

const SomeError = (props: { errorMessage: string }) => {
  return <Alert message={props.errorMessage} type="error" showIcon className="error-format" />;
};

export default SomeError;
