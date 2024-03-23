import { useState } from 'react';
import './styles/App.css';
import { SwitchLamp, SendButton, SelectButton } from './Components/Commands';
import MyInput from './Components/MyInput'
// import MyButton from './Components/MyButton';

import MainControlBoard from './MainControlBoard'


// import Publish from './ws/Publish';



// import PublishMessage from './Components/MyButton';

export default function App() {

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(''); //хук для инпута и отправки кастомного сообщения
  const [powerlamp, setPowerLamp] = useState(true); //хук для состояния лампы (вкл/выкл)
  const [counter, setCounter] = useState(0); if (counter>50) {setCounter(0)};//меняем

  return (
    <>
      <div >



        
        <button onClick={() => setShow(!show)}>
            {show ? 'Закрыть канал' : 'Открыть канал'}
        </button>
        {show && <hr />}
        {show && <MainControlBoard />}
          <SwitchLamp
              // url={url}
              // topic={topic}
              disabled='true'
              value={powerlamp ? 'P_ON' : 'P_OFF'}
              onChange={() => setPowerLamp(!powerlamp)}
              type='checkbox'
              />{!powerlamp ? 'ON' : 'OFF'}
          <MyInput
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="Введите команду"/>
          <SendButton
              // url={url}
              // topic={topic}
            // {...title==='' ? '' : 'disabled'}
              value={title}>Send
          </SendButton>
          <SelectButton
              // url={url}
              // topic={topic}
              onWheel={() => setCounter (counter+1)}
              value={`EFF${counter}`}>{`Эффект №${counter}`}
          </SelectButton>
          <div>
            <p>Сюда потом поместим всё что слушает MQTT брокер</p>
          </div>
        </div>
    </>
  );
}
