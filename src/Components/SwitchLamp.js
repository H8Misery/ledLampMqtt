import { SendMessage } from "../ws/Publish"
import { Switch } from "antd";
import { useState } from "react";

const SwitchLamp = () => {
    // const {value, status}=props; //props 
    const [powerlamp, setPowerLamp] = useState(false); //хук для состояния лампы (вкл/выкл)
    var value=powerlamp ? 'P_OFF' : 'P_ON'
    const publish = () => {
        SendMessage({value});  //предаем только нужные пропсы
    }
    return (
    <>
        <label>
            <Switch 
            size="big" 
            checkedChildren="ON" 
            unCheckedChildren="OFF"
            checked={powerlamp} 
            onClick={publish}
            onChange={() => setPowerLamp(!powerlamp)}/>
            {/* <input type={type} value={value} onChange={onChange}/>хотелось бы красить от состояния. нужно понять как пихнуть CSS свич-кейс или типа того */}
            <span></span>
        </label>

    </>
    )
}

export default SwitchLamp