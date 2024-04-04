import React from 'react';
import { Slider } from 'antd';
import { SendMessage } from '../ws/Publish';


export default function SliderController ({...props}) {
    const {prefix} = props;
    const onChange = (value) => {
        console.log(`${prefix} ${value}`);
    };
    const onChangeComplete = (value) => {

        value=`${prefix}${value}`
        console.log(prefix);
        SendMessage({value});
    };

    return (
        <>
            <Slider 
                min={0} 
                step={5} 
                max={255} 
                defaultValue={30} 
                onChange={onChange} 
                onChangeComplete={onChangeComplete} 
            />
        </>
    )

}


