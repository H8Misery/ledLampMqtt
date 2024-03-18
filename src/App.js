import { useState } from 'react';
import './styles/App.css';
// import MyButton from './Components/MyButton';

import MainControlBoard from './MainControlBoard'


// import Publish from './ws/Publish';



// import PublishMessage from './Components/MyButton';

export default function App() {

  const [show, setShow] = useState(false);

  return (
    <>
      <div >



        
        <button onClick={() => setShow(!show)}>
            {show ? 'Закрыть канал' : 'Открыть канал'}
        </button>
        {show && <hr />}
        {show && <MainControlBoard />}
          <div>
            <p>Сюда потом поместим всё что слушает MQTT брокер</p>
          </div>
        </div>
    </>
  );
}
