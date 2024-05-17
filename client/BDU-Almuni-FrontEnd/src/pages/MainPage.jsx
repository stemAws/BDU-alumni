import { useState,createContext } from 'react';
import Header from '../component/Header'
import Signin from '../component/Signin'
import NewsAndUpdates from './NewsAndUpdates'
export const SigninContext = createContext();
const MainPage = () => {
  const [signin, setsignin] = useState(false);
  return (
    <div>
      <SigninContext.Provider value={{ signin, setsignin}}>
        <Header />
        </SigninContext.Provider>
        
        <NewsAndUpdates />
        {
          signin&&<Signin setsignin={setsignin}/>
        }
       
    </div>
  )
}

export default MainPage