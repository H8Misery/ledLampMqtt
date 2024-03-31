import { Button } from "antd";
import { SendMessage } from "../ws/Publish"

const SelectButton = ({children, ...props}) => {
    const {value, onWheel}=props;

    const publish = () => {
        SendMessage({value}); //предаем только нужные пропсы
    }

    return (
    <>
    <Button 
        onWheel={onWheel}
        onClick={publish}> 
        {children}
    </Button>
    </>
    );
}

export default SelectButton