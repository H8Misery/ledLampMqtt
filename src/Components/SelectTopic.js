import { topic_list } from '../const/api.const';
import { Select } from 'antd'

const SelectTopic = ({...props}) => {
    const {onChange, tittle} = props
   
    var options = [

    ];
    for (let i=0; i < topic_list.length; i++) {
        options.push({
            label: topic_list[i].value, 
            value: topic_list[i].value,
        })
        };
        // topic_list.map((topic) =>
        //     `{label: '${topic.name}',value:'${topic.value}'},`
        // )
    
    console.log(options)

    // console.log(options)
    return (
        <><p>{tittle}</p>
            {/* <select
                onChange={onChange}
                // value={value}
            >
                {topic_list.map((topic) => 
                <option key={topic.id} value={topic.value}>{topic.name}</option>)}
            </select> */}

            <Select
            onChange={onChange}
            // value={value}
            placeholder={tittle}
            // optionFilterProp="children"
            options={options}
            >
            </Select>
            
        </>


    )
}

export default SelectTopic;