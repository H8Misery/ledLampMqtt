import React, { useState } from 'react';
import { ConfigProvider, Switch, Layout, theme } from 'antd';
import SwitchLamp from './Components/SwitchLamp';
import { Routes, Route } from 'react-router-dom';
import BasicCmdBoard from './pages/BasicCmdBoard';
import EffectCmdButtons from './pages/EffectCmdButtons';
import MainControlBoard from './pages/MainControlBoard';
import MainMenu from './Components/MainMenu';
import SliderController from './Components/SliderController';


const { Header, Content, Footer } = Layout;

const App = () => {
  const [select_theme, setTheme] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgSpotlight },
  } = theme.useToken();
  const selected_theme=select_theme ? colorBgContainer : colorBgSpotlight
  return (  
    <>      

    <Layout> 

      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          background: selected_theme,
          // borderRadius: borderRadiusLG,
        }}

      >
      <div>
        <Switch
          checkedChildren="Light" 
          unCheckedChildren="Dark"
          onChange={() => setTheme(!select_theme)}>Theme
        </Switch>
      </div>
      <MainMenu theme={selected_theme}/>
      <SwitchLamp /> {/*Вынес вкл/выкл лампы на самый верх, для удобства*/}
      
      </Header>
      <Content
        style={{
          padding: '0 24px',
          background: selected_theme,

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
              <Route path="*" element={<BasicCmdBoard/>} />
              <Route path="effects" element={<EffectCmdButtons/>} />
              <Route path="control-board" element={<MainControlBoard/>} />
            </Routes>
        </div>
      </Content>
      <Footer
        
        style={{
          background: selected_theme,
          
          textAlign: 'center',
        }}
      >
        Bomzh Dezign ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
    </>
  );
};
export default App;