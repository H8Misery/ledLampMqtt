import { SendMessage } from "../ws/Publish"

const SendButton = ({children, ...props}) => {
    const {value}=props;
    const publish = () => {
        SendMessage({value}); //предаем только нужные пропсы [weqwerwqrqegsddogioasjgjisda]
    }
    return (
        <>
        <div>
            <button 
            type='button' 
            className='buttons'
            onClick={publish}> 
                {children}
            </button>

        </div>
    </>

    );
}

export default SendButton