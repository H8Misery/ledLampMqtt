import { SendMessage } from "../ws/Publish";
import { Button } from 'antd';

const SendButton = ({children, ...props}) => {
    const {value, type, size, shape, ghost}=props;
    const publish = () => {
        SendMessage({value});//предаем только нужные пропсы (не понял почему тут объект а не стринга)
        // console.log({value});//
    }
    return (
    <>
        <Button 
            type={type} 
            size={size} 
            shape={shape} 
            ghost={ghost} 
            onClick={publish}> 
            {children}
        </Button>
    </>
    );
}

export default SendButton