import { server_list } from '../const/api.const';

const SelectHost = ({...props}) => {
    const {value, onChange} = props
    return (
        <>
            <select
                onChange={onChange}
                value={value}
            > 
                {server_list.map((host) => 
                <option key={host.id} value={host.value}>{host.name}</option>)}
            </select>
        </>
    )
}

export default SelectHost;