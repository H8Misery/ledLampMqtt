// import './styles/App.css';
import SendButton from '../Components/SendButton';
import { eff_list } from '../const/eff.const';

export default function EffectCmdButtons() {

  return (
    <>
      {eff_list.map ((eff) => 
    <SendButton 
      btnColor={'#113'}
      type={'primary'} 
      size={'large'} 
      block={false} 
      key={eff.id} 
      value={eff.value}>{eff.name} 
    </SendButton>)}
    </>
  );
}
