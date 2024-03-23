import { useState, useEffect } from 'react';
// import { createConnection } from './ws/ConnectMqtt'; //old method
import { connector } from './ws/mqtt_socket'

export default function SelectHost () {
    // const [serverUrl, setServerUrl] = useState('ws://localhost:9001/ws');
    const [url, setServerUrl] = useState('mqtt://localhost:9001/mqtt');//хук для хоста
    const [topic, setTopic] = useState('glamp');//хук для топика (куда подпишемся)
    
    useEffect(() => {//вызывается после монтирования компонента и каждый раз после изменения массива зависимостей
        // const connection = createConnection(url, topic); //объявили кастомный метод и отдаем серв + топик, который наследовали из App.js
        // connection.connect(); //не оч понимаю почему мы не можем сразу вызвать createConnection.connect()
        connector.init(url, topic);
        connector.sniff();//могу ли я в этом файле обращаться к внутренним данным этой функции для рендера некой формы с "чатом" чтобы вывести инфо на консоль?
        return () => { //это функция очистки которая вызывается перед следующим срабатыванием эффекта и последний раз после размонтирования компонента

            connector.disconnect();
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
                <option value="mqtt://localhost:9001/mqtt">localhost</option>  {/*далее я хочу подтянуть значения откуда-нибудь ещё*/}
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
    </div>
    )
}


 