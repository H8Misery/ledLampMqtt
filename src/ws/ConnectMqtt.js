import mqtt from 'mqtt';



export function createConnection(url, topic, message) {

    const options = {
        // Clean session
        clean: true,
        connectTimeout: 4000,
        // reconnectPeriod: 6000,
        // Authentication
        // clientId: 'emqx_test',
        // username: 'emqx_test',
        // password: 'emqx_test',
      }

    const socket=mqtt.connect(url, options);

    return{

        connect() {

            socket.on("connect", () => {
                console.log(`✅ Connected to ${url}`)
                socket.subscribe(topic, { qos: 0 }, (err) => {
                    console.log(`✅ Subscribed to ${topic}`)
                        if (!err) {
                            socket.publish(topic, `PC is connected to MQTT on ${topic} topic, server URL is: ${url}`)
                        } else {
                            console.log(err)
                        }
                });
                socket.on("message", function (topic, received) {
                    console.log(`Received in ConnectMqtt.connect \n MSG: ${received} \n TOPIC: ${topic}`); //нюхаем топик и выводим в консоль, а хотелось бы отсюда это забрать
                    // setMessage(mesage.toString()); //записываем в стейт

                })
            // socket.publish('topic');

            });
        

            socket.on("close", (err) => {
                console.log("ConnectMqtt.on(disconnect): Client disconnected by server");
                console.log(err)
            });
        },
        disconnect() {
            socket.publish(topic, 'PC is Disconnected', { qos: 0, retain: false }, function (err) {
                if (err) {
                console.log(err)
                }
            })
            socket.end();
            console.log('disconnect');
        },
        publish() {
            // console.log(`ConnectMqtt.publish: sended a message: ${message} for topic: ${topic}`);
            socket.publish(topic, message, { qos: 0, retain: false }, function (error) {
                if (error) {
                console.log(`ConnectMqtt.publish: error received: \n ${error}`)
                }
            })
        }
    }
}