import React from 'react';
import { Layout, theme } from 'antd';
import SwitchLamp from './Components/SwitchLamp';
import { Routes, Route } from 'react-router-dom';
import BasicCmdBoard from './pages/BasicCmdBoard';
import EffectCmdButtons from './pages/EffectCmdButtons';
import MainControlBoard from './pages/MainControlBoard';
import MainMenu from './Components/MainMenu';
import SliderController from './Components/SliderController';

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout> 
      <MainMenu/>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'normal',
        }}

      >       

      <SwitchLamp/> {/*Вынес вкл/выкл лампы на самый верх, для удобства*/}

      </Header>
      <Content
        style={{
          padding: '0 48px',
        
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
              <SliderController prefix='LIGHT'/>
              <SliderController prefix='SPEED'/>
              <SliderController prefix='SPAN'/>
            <Routes>
              <Route path="*" element={<BasicCmdBoard />} />
              <Route path="effects" element={<EffectCmdButtons />} />
              <Route path="control-board" element={<MainControlBoard />} />
            </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Bomzh Dezign ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;