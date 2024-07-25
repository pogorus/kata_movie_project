import React from 'react';
import { Menu } from 'antd';

import './header.css';

const items = [
  {
    label: 'Search',
    key: 'search',
  },
  {
    label: 'Rated',
    key: 'rated',
  },
];

const Header = (props) => {
  const onClick = (e) => {
    props.onMainPageSwitch(e.key);
  };
  const current = props.mainPage;

  return <Menu onClick={onClick} selectedKeys={current} mode="horizontal" items={items} className="header_menu" />;
};

export default Header;
