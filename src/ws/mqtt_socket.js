import mqtt from 'mqtt';

class MqttConnector {
    
    constructor(url, topic) {
        console.log(`Constructor have host: '${url}'\nand Topic '${topic}'`)
        this.url = url;
        this.topic = topic
        this.socket = null //обнуляем сокет по умолчанию, чтобы не плодить коннекты к хосту
        this.options = {
            // Clean session
            clean: true,
            connectTimeout: 3000,
            // reconnectPeriod: 611,
            // Authentication
            // clientId: 'emqx_test',
            // username: 'emqx_test',
            // password: 'emqx_test',
          }
    }

    init(newUrl, newTopic) {
        console.log(`init have host: '${newUrl}'\nand Topic '${newTopic}'`)
        this.url=newUrl;
        this.topic=newTopic;
        this.socket = null //обнуляем сокет при изменении, чтобы не плодить коннекты к хосту

        console.log(`init changed host: '${this.url}'\nand Topic '${this.topic}'`)
    }

    sniff() {//тестово сразу вызываю после подписки ^
        // this.subscribe();
        const socket = this._connect();
        socket.on("message", function (topic, received) {
        console.log(`Received in sniffer: \n MSG: ${received} \n URL: ${this.url} \n TOPIC: ${topic}`);
        })
        return this.socket.connected
    }

    _connect(){
        if(!this.socket) {
            console.log(`Trying to connect ${this.url} ... `)
            this.socket = mqtt.connect(this.url, this.options);
            
            this.socket.on("connect", () => {
                console.log(`✅ Connected to ${this.url}`);

            this.socket.subscribe(this.topic, { qos: 0 }, (err) => {
                err ? console.log(err) : console.log(`✅ Subscribed to ${this.topic}`)
                });
            })

            this.socket.on("end", () => {
                console.log(`Disconnected from ${this.url}`)
            });

            this.socket.on("reconnect", () => {
                console.log('RECONNECTING ... ... ...');
            });
            // this.socket.end();//потом придумаю как вызывать сокет энд, и окончательно избавиться от disconnect(); который вызываю при очистке в useEffect, в MainControlBoard
        } return this.socket
    }

    disconnect() {
        // const socket = this._connect();
        console.log('Disconnection...')
        const socket = this._connect();
        socket.end();
        this.socket.on("close", (err) => {
            err ? console.log(err) : console.log('Closing connection')
            });

    }
    publishMessage(message) {
        const socket = this._connect();
        socket.publish(this.topic, message, { qos: 0, retain: false }, function (err) {
            err ? console.log(err) : console.log('Published')
        });
    
    }


}
export const connector = new MqttConnector('mqtt://localhost:9001/mqtt', 'glamp');