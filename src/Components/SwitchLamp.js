import { SendMessage } from "../ws/Publish"

const SwitchLamp = ({...props}) => {
    const {value, type, onChange}=props; //props 

    const publish = () => {
        SendMessage({value});  //предаем только нужные пропсы
    }
    return (
    <>
        <label
        className="switches"
        onClick={publish}>
         
            <input type={type} value={value} onChange={onChange}/>{/*хотелось бы красить от состояния. нужно понять как пихнуть CSS свич-кейс или типа того*/}
            <span></span>
        </label>

    </>
    )
}

export default SwitchLamp