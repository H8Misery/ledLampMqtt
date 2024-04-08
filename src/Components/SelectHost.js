import { host_list } from '../const/api.const';

const SelectHost = ({...props}) => {
    const {value, onChange} = props
    return (
        <><p>Host</p>
            <select
                onChange={onChange}
                value={value}
            > 
                {host_list.map((host) => 
                <option key={host.id} value={host.value}>{host.name}</option>)}
            </select>
        </>
    )
}

export default SelectHost;