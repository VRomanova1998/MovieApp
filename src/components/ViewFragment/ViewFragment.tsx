import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Search from '../Errors/SearchError';
import SomeError from '../Errors/SomeError';

const ViewFragment = (props: { loading: boolean; error: boolean; errorMessage: string; errorName: string }) => {
  const { loading, error, errorMessage, errorName } = props;
  const warning = errorName === 'SearchError' ? <Search /> : null;
  const errorAlert = error && errorName !== 'SearchError' ? <SomeError errorMessage={errorMessage} /> : null;
  const spiner = loading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin className="spiner" />} />
  ) : null;

  return (
    <React.Fragment>
      {warning}
      {errorAlert}
      {spiner}
    </React.Fragment>
  );
};

export default ViewFragment;
