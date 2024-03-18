import mqtt from 'mqtt';



  class MqttConnector {
    
    init(url, topic) {
        console.log(`Init have host: '${url}'\nTopic '${topic}'`)
        this.url = url;
        this.socket = null
        this.topic = topic
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
        //   console.log(`Socket is ${this.socket}`)
    }

    _connect() {
        if(!this.socket) {
            console.log(`Trying to connect ${this.url} ... `)
            this.socket = mqtt.connect(this.url, this.options)
            
            this.socket.on("connect", () => {
                console.log(`✅ Connected to ${this.url}`)
                this.subscribe();
            this.socket.on("reconnect", () => {
                console.log('RECONNECTING ... ... ...')
            })
            });
            // this.socket.publish(this.topic, 'asd')

            // this.socket.on("close", (err) => {
            //     console.log("Disconnected");
            //     console.log(err)
            // });
            
        } else {
            
            }
            // console.log(`Socket is ${this.socket.connected}`) 
        return ( 
            this.socket
            )
    }

    subscribe() {//тестово вызываю сразу после коннекта
        const socket = this._connect();
        socket.subscribe(this.topic, { qos: 0 }, (err) => {
            console.log(`✅ Subscribed to ${this.topic}`)
                // if (!err) {
                //     this.socket.publish(this.topic, `PC is connected to MQTT on ${this.topic}`)
                // } else {
                //     console.log(err)
                // }
        
        });
        this.sniff();//если подписан - нюхаем топик V
    }
    sniff() {//тестово сразу вызываю после подписки ^
        // this.subscribe();
        const socket = this._connect();
        socket.on("message", function (topic, received) {
        console.log(`Received in mqtt_socket.connect \n MSG: ${received} \n TOPIC: ${topic}`);
        })
    }
    _disconnect() {
        console.log('Disconnection')
        this.socket.end();
        
        this.socket.on("end", () => {
            console.log(`Disconnected from ${this.url}`)
        });
        // this.socket = null
    }
    publishMessage(message) {
        const socket = this._connect();
        socket.publish(this.topic, message, { qos: 0, retain: false }, function (err) {
            if (err) {
            console.log(this.topic)
            console.log(message)
            console.log(err)
            }
        });
    }
    
}

export const connector = new MqttConnector();