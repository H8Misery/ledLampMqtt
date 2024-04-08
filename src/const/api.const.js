export const host_list = [
    {id: 1, value: 'mqtt://localhost:9001/mqtt', name: 'localhost1'}, 
    {id: 2, value: 'mqtt://localhost:1883/mqtt', name: 'localhost2'}
];

export const topic_list = [
    {id: 1, value: 'glamp_sub', name:'subscribe 1'},
    {id: 4, value: 'glamp_pub', name:'publish 1'},

]
//для понимания что у нас тут хранится вывожу в консольку:
console.log('Constants for mqtt broker that we use now in select:');
host_list.map((host) => {
    return (
        console.log(`HOST ${host.id} - ${host.value}`)
        )
})
// console.log(urlConsoleLog);
topic_list.map((topic) => {
    return (
        console.log(`TOPIC ${topic.id} - ${topic.value}`)
        )
})
// console.log(topicConsoleLog);

console.log('for configure go to `api.const.js`');