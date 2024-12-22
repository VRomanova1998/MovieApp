import React from 'react';
import { Pagination } from 'antd';

import RequestForm from '../RequestForm/RequestForm';
import ViewFragment from '../ViewFragment/ViewFragment';
import { CardList } from '../CardList/CardList';
import { ModuleProps, SearchProps } from '../../types';

export const Search = (props: ModuleProps & SearchProps) => {
  const hasData = !(props.loading || props.error) && props.dataMovie.length !== 0;
  const cardList = hasData ? <CardList {...props} /> : null;
  const pagination =
    props.totalResults > 20 ? (
      <Pagination
        align="center"
        defaultCurrent={props.currentPage}
        onChange={props.onChangePage}
        defaultPageSize={20}
        total={props.totalResults}
        showSizeChanger={false}
      />
    ) : null;
  return (
    <React.Fragment>
      <RequestForm onChangeLabel={props.onChangeLabel} label={props.label} onChange={props.onChangePage} />
      <ViewFragment
        loading={props.loading}
        error={props.error}
        errorMessage={props.errorMessage}
        errorName={props.errorName}
      />
      {cardList}
      {pagination}
    </React.Fragment>
  );
};
