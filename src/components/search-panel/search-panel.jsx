import React from 'react';
import { Input } from 'antd';
import debounce from 'lodash.debounce';

import './search-panel.css';

const SearchPanel = (props) => {
  const setInput = (e) => {
    props.onInput(e.target.value);
  };
  const debouncedInput = debounce(setInput, 600);

  return (
    <Input
      placeholder={props.searchData ? props.searchData : 'Type to search...'}
      autoFocus
      className="search_panel"
      onChange={debouncedInput}
    />
  );
};

export default SearchPanel;
