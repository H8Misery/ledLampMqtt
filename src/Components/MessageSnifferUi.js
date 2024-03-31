import { useState, useEffect } from 'react';
import { connector } from '../ws/mqtt_socket'

export default function MessageSnifferUi () {
    const [messages, setMessages] = useState([{session: '', topic: '', message:''}]);//сюда будем обновлять что получаем от сниффера
    
    const sniff = () => {
        const socket = connector.sniff();

        socket.on("message", function(topic, received) {
            socket.removeAllListeners(); //консоль ругалась на то, что слишком много листенеров. Вроде это фиксит
            setMessages([{session: '✅',topic:`${topic}`, message:`${received}`}]);

            // socket.removeListener();
        })
        socket.on("end", () => {
            setMessages([{session: '⛔',topic:`${'?'}`, message:`${'?'}`}]);
            }
        
            //при смене топика или хоста мы теряем возможность отображать мессенджи, если только заново не потыкаем на кнопку которая монтирует компонент.
            //но, при смене топика или хоста мы дисконнектимся, а это значит что мы тут сможем перепризвать useEffect через обновление message т.к. это зависимость нашего хука (наверное это костыль)
        )
        

        
        // socket.on("connect" || "subscribe" || "reconnect", () => {
        //     setMessages([{session: '✅',topic:`${'?'}`, message:`${'?'}`}]);
        //     }
        // ) 
        // return socket;

    } 

    useEffect(() => {//вызывается после монтирования компонента и каждый раз после изменения массива зависимостей

        sniff(); //вызываем сниффер
        return () => {
            //это функция очистки которая вызывается перед следующим срабатыванием эффекта и последний раз после размонтирования компонента
            // connector.disconnect();
        };
    }, [messages]); //массив зависимостей (если его удалить, то при каждом изменении будет срабатывать хук, а так только при мессендже)

    if(messages!==undefined) {
            return (
        <>
            {messages.map((item) => <p  key={item.session}> Активность: {item.session} <br/> Топик: {item.topic}<br/>Сообщение: {item.message}</p>)}
        </>
        )
    }
}

