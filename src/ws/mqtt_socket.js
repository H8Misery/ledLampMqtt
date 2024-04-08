import mqtt from 'mqtt';

class MqttConnector  {
    constructor(url, sub_topic, pub_topic) {
        this.url = url;
        this.sub_topic = sub_topic
        this.pub_topic = pub_topic
        this.socket = null //объявляем сокет и задаем ему Null по дефолту
        this.options = {
            // Clean session
            clean: true,
            connectTimeout: 3000,
            reconnectPeriod: 10000,
            // Authentication
            // clientId: 'emqx_test',
            // username: 'emqx_test',
            // password: 'emqx_test',
          }
    }

    init(newUrl, newSubTopic, newPubTopic) {
        this.url=newUrl;
        this.sub_topic = newSubTopic
        this.pub_topic = newPubTopic
        // this.socket = null //обнуляем сокет при изменении, чтобы не плодить коннекты к хосту
        console.log(`init changed params: '${this.url}' / 'sub topic: ${this.sub_topic}' and for pub: ${this.pub_topic}`);
        // if (!this.socket) this.sniff();
    }

    sniff() {//тестово сразу вызываю после подписки ^
        // this.subscribe();
        console.log(`🔎 Sniffing`)
        const socket = this._connect();
        socket.on("message", function (topic, received) {
        console.log(`📨 Received in sniffer: \n MSG: ${received} \n URL: ${socket.options.href} \n TOPIC: ${topic}`);//socket.options.href т.к. внутри функции мы не можем обратиться к внещним идентификаторам по типу url/this.url...
        })

        return this.socket//возвращаем сокет т.к. потом заходим к нему "принюхаться" в MessageSnifferUi
    }

    _connect(){
        
        if(!this.socket) { 
            
            console.log(`${!this.socket ? 'Session is null' : 'Session stable'}. Connecting ${this.url}...`);
            this.socket = mqtt.connect(this.url, this.options); //задаем параметры для сокета
            this.socket.on("end", () => {
                console.log(`Disconnected from ${this.url} ${!this.socket ? 'Session now is null' : 'Session was stable'}`)
            });
            this.socket.on("connect", () => {
                console.log(`✅ Connected to ${this.url}`);
                this.socket.subscribe(this.sub_topic, { qos: 0 }, (err) => {
                    err ? console.log(err) : console.log(`✅ Subscribed to ${this.sub_topic}`)
                    });
            })
            this.socket.on("reconnect", () => {
                console.log(`RECONNECTING ... ... ...\n${!this.socket ? 'Session is null' : 'Session stable'}`);
            });
            // this.socket.end();//потом, возможно, придумаю как вызывать сокет энд, и окончательно избавиться от disconnect(); который вызываю при очистке в useEffect, в MainControlBoard
        }  
        else console.log('Atteption to connect. Already connected, no need to connect') 
        return this.socket
    }

    disconnect() {
        // const socket = this._connect();
        // console.log(`${!this.socket ? 'Session is null' : 'Session now stable'} ⛔ Disconnection...`) //Пишем что вызван метод дисконнекта, проверяем сессию
        if (!this.socket) {
            console.log('Already Disconnected. No need to disconnect')
        } else {
            const socket = this._connect();
            socket.end();
            this.socket.on("close", (err) => {
                err ? console.log(err) : console.log('Closing connection ')
                });
            this.socket = null //обнуляем сокет т.к. выходим из сессии
        }


    }

    publishMessage(message) {
        const socket = this._connect();

        console.log(`🖆 Trying to publish: ${message} 
        to pub_topic: ${this.pub_topic} on URL: ${this.socket.options.href}. 
        ${!this.socket ? 'Session is null' : 'Session stable'}`) //очередная проверка

        socket.publish(this.pub_topic, message, { qos: 0, retain: false }, function (err) {
            err ? console.log(err) : console.log('🖅 Success!')
        });
    }
}
export const connector = new MqttConnector('mqtt://localhost:9001/mqtt', 'glamp', 'pub_glamp');