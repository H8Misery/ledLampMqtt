import { useState, useEffect } from 'react';
// import { createConnection } from './ws/ConnectMqtt'; //old method
import { connector } from './ws/mqtt_socket'
// import { ServerUrl } from './const/api.const';
import { server_list, topic_list } from './const/api.const';

export default function SelectHost () {
    // const [serverUrl, setServerUrl] = useState('ws://localhost:9001/ws');
    const [url, setServerUrl] = useState('mqtt://localhost:9001/mqtt');//хук для хоста (не могу убрать отсюда т.к. ломается логика хуков изнутри useEffect. Либо нужно избавляться от init в котором я обновляю параметры класса mqtt_socket.js)
    const [topic, setTopic] = useState('glamp');//хук для топика (куда подпишемся)


    useEffect(() => {//вызывается после монтирования компонента и каждый раз после изменения массива зависимостей
        // const connection = createConnection(url, topic); //объявили кастомный метод и отдаем серв + топик, который наследовали из App.js
        // connection.connect(); //не оч понимаю почему мы не можем сразу вызвать createConnection.connect()
        connector.init(url, topic);
        connector.sniff();//могу ли я в этом файле обращаться к внутренним данным этой функции для рендера некой формы с "чатом" чтобы вывести инфо на консоль?
        return () => { //это функция очистки которая вызывается перед следующим срабатыванием эффекта и последний раз после размонтирования компонента

            connector.disconnect();
            // console.log(connector.socket ? "ONLINE" : "OFFLINE");//не информативно

            
        };
    }, [url, topic]); //массив зависимостей
//Ниже мы рендерим форму при монтировании объекта в App.js для того, чтобы выбрать нужный хост и топик

    return (
    <div className='header'>
        <label>
            Server URL:{' '} {connector.socket ? "ONLINE" : "OFFLINE"}
            <select 
            className='buttons'
            value={url}
            onChange={e => setServerUrl(e.target.value)}
            > 
                {server_list.map((s) => 
                <option value={s.value}>{s.name}</option>//пока не выходит массив распарсить(
                )}
            </select>
        </label>
        <p>Выбран сервер: {url}</p>

            <select
            value={topic}
            onChange={e => setTopic(e.target.value)}
            >
                {topic_list.map((t) => 
                <option value={t.value}>{t.name}</option>)}
            </select>
    </div>
    )
}

