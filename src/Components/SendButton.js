import { SendMessage } from "../ws/Publish";
import { Button, Space, ConfigProvider } from 'antd';


const SendButton = ({children, ...props}) => {
    const {value, type, block, size, shape, ghost, btnColor}=props;
    const publish = () => {
        SendMessage({value});//предаем только нужные пропсы (не понял почему тут объект а не стринга)
        // console.log({value});//
    }

    return (
    
    <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: `${btnColor}`,
            borderRadius: 1,
            // Alias Token
            colorBgContainer: '#f6ffed',
          },
        }}
    >
        <Space>
            <Button
                type={type}
                block={block} 
                size={size}
                shape={shape} 
                ghost={ghost} 
                onClick={publish}> 
                {children}
            </Button>
        </Space>
    </ConfigProvider>

  
    );
}

export default SendButton