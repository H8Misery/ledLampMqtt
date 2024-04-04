import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items = [
  {
    label: <Link to='basic'>Basic Board</Link>,
    key: 'basic',
    // icon: <MailOutlined />,
  },
  {
    label: <Link to='effects'>Effects Board</Link>,
    key: 'effects',
    // icon: <AppstoreOutlined />,
    // disabled: true,
  },
  {
    label: <Link to='control-board'>Control Board</Link>,
    key: 'SubMenu',
    // icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
];
const MainMenu = (props) => {
  const {theme} = props
  const [current, setCurrent] = useState('SubMenu');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu 
          style={
              { 
              flex: "auto"
              }
          } 
          onClick={onClick} 
          selectedKeys={[current]} 
          mode="horizontal" 
          theme={theme} 
          items={items}/>;
};
export default MainMenu;