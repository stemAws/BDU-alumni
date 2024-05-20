import { useState,createContext } from 'react';
import Header from '../component/Header'
import Signin from '../component/Signin'
import NewsAndUpdates from './NewsAndUpdates'
import Stories from './Stories';
import Events from './Events';
export const SigninContext = createContext();
const MainPage = () => {
  const [signin, setsignin] = useState(false);
  const [loginState, setloginState] = useState(false);
  return (
    <div>
      <SigninContext.Provider value={{ signin, setsignin}}>
        <Header loginState={loginState}/>
        </SigninContext.Provider>
        
        <NewsAndUpdates />
        {
          signin&&<Signin setloginState={setloginState} setsignin={setsignin}/>
        }
        <Stories/>
       <Events/>
    </div>
  )
}

export default MainPage