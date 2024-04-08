import { useState, useEffect } from 'react';
import { connector } from '../ws/mqtt_socket'
import SelectHost from '../Components/SelectHost';
import SelectTopic from '../Components/SelectTopic';

export default function MainControlBoard () {
    // const [serverUrl, setServerUrl] = useState('ws://localhost:9001/ws');
    const [url, setServerUrl] = useState('mqtt://localhost:9001/mqtt');//хук для хоста (не могу убрать отсюда т.к. ломается логика хуков изнутри useEffect. Либо нужно избавляться от init в котором я обновляю параметры класса mqtt_socket.js)
    const [sub_topic, setSubTopic] = useState('{prevState}');//хук для топика (куда подпишемся для прослушивания)
    const [pub_topic, setPubTopic] = useState('{prevState}');//хук для топика (куда будем отправлять)


    useEffect(() => {//вызывается после монтирования компонента и каждый раз после изменения массива зависимостей
        connector.init(url, sub_topic, pub_topic);
//могу ли я в этом файле обращаться к внутренним данным этой функции для рендера некой формы с "чатом" чтобы вывести инфо на консоль?
        return () => { //это функция очистки которая вызывается перед следующим срабатыванием эффекта и последний раз после размонтирования компонента
            connector.disconnect();
        };
    }, [url, sub_topic, pub_topic]); //массив зависимостей

    return (
        
    <>
        <SelectHost onChange={e => setServerUrl(e.target.value)}/>
        <SelectTopic onChange={(e) => setSubTopic(e, "value")} tittle='Select For Subscribing' />
        <SelectTopic onChange={(e) => setPubTopic(e, "value")} tittle='Select For Publishing' />
    </>
    )
}

