import Cookies from 'js-cookie';

const AuthService = {
  isAuthenticated: (position) => {
    if (position==='admin') {
      return !!Cookies.get('adminId');
    }
    else if (position==='user'){
      return !!Cookies.get('id');
    }
    
  },



  logout: async(position) => {
    if (position==='admin') { 
      try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/removeadmincookies`, {
        method: 'GET',
        credentials: 'include' 
      });
    } catch (error) {
      console.error("Error during Admin logout:", error);
    }
    }
    else if (position==='user'){
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/removecookies`, {
          method: 'GET',
          credentials: 'include' 
        });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
    
  },
};

export default AuthService;