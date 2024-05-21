import Stories from './Stories';
import Events from './Events';
import NewsAndUpdates from './NewsAndUpdates'
import Signin from '../component/Signin';
import { useState,createContext } from 'react';
import Header from '../component/Header'
export const SigninContext = createContext();
const MainBody = () => {
    const [signin, setsignin] = useState(false);
  const [loginState, setloginState] = useState(false);
  return (
    <div>
        <SigninContext.Provider value={{ signin, setsignin}}>
        <Header loginState={loginState}/>
        </SigninContext.Provider>
        {
          signin&&<Signin setloginState={setloginState} setsignin={setsignin}/>
        }
        
        <NewsAndUpdates />
        <Stories/>
        <Events/>
    </div>
  )
}

export default MainBody