export const server_list = [
    {value: 'mqtt://localhost:9001/mqtt', name: 'localhost 1'}, 
    {value: 'mqtt://localhost:1883/mqtt', name: 'localhost 2'}
];

export const topic_list = [
    {value: 'glamp', name:'env'},
    {value: 'LedLamp/LedLamp_...', name:'prod'}
]
//потом делитну, чисто для понимания пока оставил
console.log('server_list');
console.log(server_list);
console.log('topic_list');
console.log(topic_list);
console.log('for configure go to `glamp\src\const\api.const.js`');