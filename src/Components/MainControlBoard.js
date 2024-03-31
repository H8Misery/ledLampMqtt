import { useState, useEffect } from 'react';
import { connector } from '../ws/mqtt_socket'
import SelectHost from './SelectHost';
import SelectTopic from './SelectTopic';

export default function MainControlBoard () {
    // const [serverUrl, setServerUrl] = useState('ws://localhost:9001/ws');
    const [url, setServerUrl] = useState('mqtt://localhost:9001/mqtt');//хук для хоста (не могу убрать отсюда т.к. ломается логика хуков изнутри useEffect. Либо нужно избавляться от init в котором я обновляю параметры класса mqtt_socket.js)
    const [topic, setTopic] = useState('glamp');//хук для топика (куда подпишемся)

    useEffect(() => {//вызывается после монтирования компонента и каждый раз после изменения массива зависимостей
        connector.init(url, topic);
//могу ли я в этом файле обращаться к внутренним данным этой функции для рендера некой формы с "чатом" чтобы вывести инфо на консоль?
        return () => { //это функция очистки которая вызывается перед следующим срабатыванием эффекта и последний раз после размонтирования компонента
            connector.disconnect();
        };
    }, [url, topic]); //массив зависимостей

    return (
    <div className='header'>
        <SelectHost onChange={e => setServerUrl(e.target.value)}/>
        <SelectTopic onChange={e => setTopic(e.target.value)}/>
    </div>
    )
}

