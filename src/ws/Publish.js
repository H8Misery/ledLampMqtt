// import mqtt from "mqtt/*";
// import { IClientOptions } from 'mqtt/*';
// import { createConnection } from './ConnectMqtt'; //рабочий метод №1
import { connector } from './mqtt_socket'//тест №2

// export default function Publish ({message}) {//Из под Commands такой метод не прокатывает.
//     return (
//         message='asd' ? 'FUCK' : console.log(message)


        
//     )
// }

// export default Publish
// export function SendMessage (props) { //Рабочий метод #1
//     const {url, topic, value}=props;
//     console.log(`Адрес ${url}`)
//     console.log(`Топик ${topic}`)
//     console.log(`Значение ${value}`)
//     console.log(props)
//     const publishMyMessage = createConnection(url, topic, value); // <-  костыль в том, что при обращении к createConnection.publish я должен 
//     //отдавать и URL и topic, и только потом мессендж. Этих идентификаторов у меня нет тут (они в SelectHost), потому отсюда этот метод не сработает и будет ошибка: Missing protocol at Object.vg
//     publishMyMessage.publish();
// }

export function SendMessage (props) {
    const {value}=props;
    // console.log(`Адрес ${url}`)
    // console.log(`Топик ${topic}`)
    console.log(`Значение ${value}`)
    // console.log(props)
    connector.publishMessage(value); 
    //отдавать и URL и topic, и только потом мессендж. Этих идентификаторов у меня нет тут (они в SelectHost), потому отсюда этот метод не сработает и будет ошибка: Missing protocol at Object.vg
    // publishMyMessage.publish();
}