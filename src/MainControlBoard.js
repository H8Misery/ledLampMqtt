import { useState, useEffect } from 'react';
import { createConnection } from './ws/ConnectMqtt';
import { SwitchLamp, SendButton, SelectButton } from './Components/Commands';
import MyInput from './Components/MyInput'

export default function SelectHost () {
    // const [serverUrl, setServerUrl] = useState('ws://localhost:9001/ws');
    const [url, setServerUrl] = useState('mqtt://localhost:9001/mqtt');//хук для хоста
    const [topic, setTopic] = useState('glamp');//хук для топика (куда подпишемся)
    const [title, setTitle] = useState(''); //хук для инпута и отправки кастомного сообщения
    const [powerlamp, setPowerLamp] = useState(true); //хук для состояния лампы (вкл/выкл)
    const [counter, setCounter] = useState(0); if (counter>50) {setCounter(0)};


    useEffect(() => {//вызывается после монтирования компонента и каждый раз после изменения массива зависимостей
        const connection = createConnection(url, topic); //объявили кастомный метод и отдаем серв + топик, который наследовали из App.js
        connection.connect(); //не оч понимаю почему мы не можем сразу вызвать createConnection.connect()

        return () => { //это функция очистки которая вызывается перед следующим срабатыванием эффекта и последний раз после размонтирования компонента
            connection.disconnect();
        };
    }, [url, topic]); //массив зависимостей
//Ниже мы рендерим форму при монтировании объекта в App.js для того, чтобы выбрать нужный хост и топик

    return (
    <div>
        <label>
            Server URL:{' '}
            <select 
            value={url}
            onChange={e => setServerUrl(e.target.value)}
            >
                <option value="mqtt://localhost:9001/mqtt">localhost</option>
                <option value="mqtt://localhost:1883/mqtt">localhost2</option>
            </select>
        </label>
        <p>Выбран сервер: {url}</p>

            <select
            value={topic}
            onChange={e => setTopic(e.target.value)}
            >
                <option value="glamp">Env</option>
                <option value="LedLamp/LedLamp_...">Prod</option>
            </select>
        <SwitchLamp
            url={url}
            topic={topic}
            value={powerlamp ? 'P_ON' : 'P_OFF'}
            onChange={() => setPowerLamp(!powerlamp)}
            type="checkbox"
            />{!powerlamp ? 'ON' : 'OFF'}
        <MyInput
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Введите команду"/>
        <SendButton
            url={url}
            topic={topic}
          // {...title==='' ? '' : 'disabled'}
            value={title}>Send
        </SendButton>
        <SelectButton
            url={url}
            topic={topic}
            onWheel={() => setCounter (counter+1)}
            value={`EFF${counter}`}>{`Эффект №${counter}`}


        </SelectButton>

    </div>
    )
}


 