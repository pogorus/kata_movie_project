import React from 'react';
import { Pagination } from 'antd';

import './pagination-bar.css';

const PaginationBar = (props) => {
  const onPageChange = (e) => {
    props.onPageChange(e);
  };

  return (
    <Pagination
      current={props.currentPage}
      total={props.totalResults}
      defaultPageSize={20}
      className="pagination"
      onChange={onPageChange}
      hideOnSinglePage
      showSizeChanger={false}
    />
  );
};
export default PaginationBar;
