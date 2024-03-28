import { useState } from 'react';
import './styles/App.css';
// import { SwitchLamp, SendButton, SelectButton } from './Components/Commands';
import SwitchLamp from './Components/SwitchLamp';
import SendButton from './Components/SendButton';
import SelectButton from './Components/SelectButton';
import CommandInput from './Components/CommandInput';
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
      <div className='App'>
          <SwitchLamp
              // url={url}
              // topic={topic}
              className='switch'
              disabled='true'
              value={powerlamp ? 'P_ON' : 'P_OFF'}
              onChange={() => setPowerLamp(!powerlamp)}
              type='checkbox'
              />{!powerlamp ? 'ON!' : 'OFF'}
          <CommandInput
              className='inputs'
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="Введите команду"/>
          <SendButton
              className='buttons'
              // url={url}
              // topic={topic}
            // {...title==='' ? '' : 'disabled'}
              value={title}>Send
          </SendButton>
          <SelectButton
              className='buttons'
              // url={url}
              // topic={topic}
              onWheel={() => setCounter (counter+1)}
              value={`EFF${counter}`}>{`Эффект №${counter}`}
          </SelectButton>
          <button
            className='buttons'
            onClick={() => setShow(!show)}>
              {show ? 'Закрыть чат' : 'Открыть чат'}
        </button>
        {show && <hr />}
        {show && <MainControlBoard />}

        </div>
    </>
  );
}
