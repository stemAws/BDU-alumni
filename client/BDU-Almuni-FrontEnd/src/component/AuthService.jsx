import Cookies from 'js-cookie';

const AuthService = {
  isAuthenticated: async(verifyToken) => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify-token`,{
          method:'POST',
          headers:{
            'Content-type':'application/json',
            'Authorization': verifyToken,
          },
        }) ;
        if (res.status === 200) {
          return true
        }
        else{
        return false
        }
      } catch (error) {
        console.error("Error Authenticating:", error);
        return false
      } 
  },

  login: (token,realToken,position) => {
    if (position==='admin') {
      Cookies.set('authTokenAdmin', token, { expires: 7}); 
      localStorage.setItem('STEMAdmin', realToken);
    }
    else{
    Cookies.set('authToken', token, { expires: 7}); 
    localStorage.setItem('STEM', realToken);
    }
  },

  logout: (position) => {
    if (position==='admin') {
      Cookies.remove('authTokenAdmin');
      localStorage.removeItem('STEMAdmin');
    }
    else{
      Cookies.remove('authToken');
      localStorage.removeItem('STEM');
    }
    
  },
};

export default AuthService;
