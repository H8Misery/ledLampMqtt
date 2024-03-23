import { SendMessage } from "../ws/Publish"


export const SwitchLamp = ({...props}) => {
    const {value, type, onChange}=props; //props 

    const publish = () => {
        SendMessage({value});  //предаем только нужные пропсы
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
    const {value}=props;
    const publish = () => {
        SendMessage({value}); //предаем только нужные пропсы [weqwerwqrqegsddogioasjgjisda]
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
    const {value, onWheel}=props;

    const publish = () => {
        SendMessage({value}); //предаем только нужные пропсы
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