import { SendMessage } from "../ws/Publish"


export const SwitchLamp = ({...props}) => {
    const {url, topic, value, type, onChange}=props; //props 

    const publish = () => {
        SendMessage({url, topic, value});  //предаем только нужные пропсы
    }
    return (
    <>
        <label className="switch"  onClick={publish}>
            <input type={type} value={value} onChange={onChange}/>
            <span></span>
        </label>

    </>
    )
}

export const SendButton = ({children, ...props}) => {
    const {url, topic, value}=props;
    const publish = () => {
        SendMessage({url, topic, value}); //предаем только нужные пропсы [weqwerwqrqegsddogioasjgjisda]
    }
    return (
        <>
        <div>
            <button  type='button' onClick={publish}> 
                {children}
            </button>

        </div>
    </>

    );
}

export const SelectButton = ({children, ...props}) => {
    const {url, topic, value, onWheel}=props;

    const publish = () => {
        SendMessage({url, topic, value}); //предаем только нужные пропсы
    }

    return (
        <>
        <div>
            <button onWheel={onWheel} 
            type='button' onClick={publish}> 
                {children}
            </button>
        
        </div>
    </>

    );
}