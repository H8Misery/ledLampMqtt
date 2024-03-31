import { useState } from 'react';
// import './styles/App.css';
import SwitchLamp from './Components/SwitchLamp';
import SendButton from './Components/SendButton';
import SelectButton from './Components/SelectButton';
import CommandInput from './Components/CommandInput';
import MainControlBoard from './Components/MainControlBoard';
import MessageSnifferUi from './Components/MessageSnifferUi';
import { Row, Col, Button } from 'antd';
// import { eff_list } from './const/eff.const';


// import Publish from './ws/Publish';



// import PublishMessage from './Components/MyButton';

export default function App() {

  const [show_settings, setShow_settings] = useState(false);
  const [show_sniffer, setShow_sniffer] = useState(false);
  const [title, setTitle] = useState(''); //хук для инпута и отправки кастомного сообщения
  const [counter, setCounter] = useState(0); if (counter>50) {setCounter(0)};//меняем

  return (
    <>

      <Row gutter={[24, 16]}>
      <Col span={6}>
        <SwitchLamp/>
      </Col>
      <Col span={6}>  
      <Button
            className='buttons'
            onClick={() => setShow_sniffer(!show_sniffer)}>
            {show_sniffer ? 'Закрыть сообщения' : 'Открыть сообщения'}
            {show_sniffer && <MessageSnifferUi/>}
        </Button>
      </Col>
      <Col span={12}>
        <CommandInput
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Введите команду"
        />
      </Col>
        <Col span={12}>

      </Col>
      <Col span={12}>
        <SendButton
          type='primary'
          size="default"
          shape="default"
          ghost='false'
          value={title}>Отправить команду
        </SendButton>
      </Col>
      </Row>
      <Row gutter={[24, 16]}>
      <Col span={12}>

        <Button
          className='buttons'
          onClick={() => setShow_settings(!show_settings)}>
          {show_settings ? 'Закрыть настройки' : 'Открыть настройки'}
        </Button>
      </Col>
      <Col span={12}>
        <SelectButton
          onWheel={() => setCounter (counter+1)}
          value={`EFF${counter}`}>{`Эффект №${counter}`}
        </SelectButton>
      </Col>
      </Row>
          {show_settings && <hr />}
          {show_settings && <MainControlBoard />}
    </>
  );
}
