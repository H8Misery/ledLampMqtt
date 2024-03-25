import { SendMessage } from "../ws/Publish"

const SelectButton = ({children, ...props}) => {
    const {value, onWheel}=props;

    const publish = () => {
        SendMessage({value}); //предаем только нужные пропсы
    }

    return (
    <>
        <div>
            <button 
            className='buttons'
            onWheel={onWheel}
            type='button' onClick={publish}> 
                {children}
            </button>
        </div>
    </>
    );
}

export default SelectButton