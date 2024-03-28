import { useState, useEffect } from 'react';
import { connector } from './ws/mqtt_socket'
import SelectHost from './Components/SelectHost';
import SelectTopic from './Components/SelectTopic';

export default function MainControlBoard () {
    // const [serverUrl, setServerUrl] = useState('ws://localhost:9001/ws');
    const [url, setServerUrl] = useState('mqtt://localhost:9001/mqtt');//хук для хоста (не могу убрать отсюда т.к. ломается логика хуков изнутри useEffect. Либо нужно избавляться от init в котором я обновляю параметры класса mqtt_socket.js)
    const [topic, setTopic] = useState('glamp');//хук для топика (куда подпишемся)
    const [messages, setMessages] = useState([{topic: '', message:''}]);//сюда будем обновлять что получаем от сниффера
    const sniff = () => {
        const socket = connector.sniff();
        socket.on("message", function(topic, received) {
            setMessages([{topic:topic, message:`${received}`}]);
        });
            
    }
    useEffect(() => {//вызывается после монтирования компонента и каждый раз после изменения массива зависимостей
        connector.init(url, topic);
        sniff(); //вызываем сниффер
//могу ли я в этом файле обращаться к внутренним данным этой функции для рендера некой формы с "чатом" чтобы вывести инфо на консоль?
        return () => { //это функция очистки которая вызывается перед следующим срабатыванием эффекта и последний раз после размонтирования компонента
            connector.disconnect();
        };
    }, [url, topic]); //массив зависимостей

    return (
    <div className='header'>
        <SelectHost onChange={e => setServerUrl(e.target.value)}/>
        <SelectTopic onChange={e => setTopic(e.target.value)}/>
        {messages.map((item) => <p>Топик: {item.topic}<br/>Сообщение: {item.message}</p>)}
    </div>
    )
}

