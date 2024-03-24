export const server_list = [
    {id: 1, value: 'mqtt://localhost:9001/mqtt', name: 'localhost1'}, 
    {id: 2, value: 'mqtt://localhost:1883/mqtt', name: 'localhost2'}
];

export const topic_list = [
    {id: 1, value: 'glamp', name:'env'},
    {id: 2, value: 'LedLamp/LedLamp_...', name:'prod'}
]
//потом делитну, чисто для понимания пока оставил
server_list.map((item) => {
    console.log(`${item.id} - ${item.value}`)
})
// console.log(urlConsoleLog);
topic_list.map((item) => {
    console.log(`${item.id} - ${item.value}`)
})
// console.log(topicConsoleLog);

console.log('for configure go to `api.const.js`');