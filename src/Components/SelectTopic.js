import { topic_list } from '../const/api.const';

const SelectTopic = ({...props}) => {
    const {value, onChange} = props
    return (
        <>
            <select
                onChange={onChange}
                value={value}
            >
                {topic_list.map((topic) => 
                <option key={topic.id} value={topic.value}>{topic.name}</option>)}
            </select>
        </>
    )
}

export default SelectTopic;