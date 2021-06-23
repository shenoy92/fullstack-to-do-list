class Auth {
    login = (cb, authToken) => {
      if(authToken) {
        localStorage.setItem('auth', authToken);
      }
      cb();
    }
  
    logout = (cb) => {
      localStorage.removeItem('auth');
      cb();
    }
  
    isAuthenticated = () => {
      return localStorage.getItem('auth') ? true : false;
    }

    getAuthToken = () => {
      return localStorage.getItem('auth');
    }
}
  
export default new Auth();
  