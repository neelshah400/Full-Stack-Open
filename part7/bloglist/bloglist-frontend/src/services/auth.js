import axios from 'axios';

const baseUrl = '/api/login';

let token = null;

const login = (credentials) => {
  const request = axios.post(baseUrl, credentials);
  return request.then((response) => response.data);
};

const setUser = (user) => {
  window.localStorage.setItem('bloglist:user', JSON.stringify(user));
  token = user.token;
};

const getUser = () => {
  const userJSON = window.localStorage.getItem('bloglist:user');
  if (userJSON) {
    const user = JSON.parse(userJSON);
    token = user.token;
    return user;
  }
  return null;
};

const logout = () => {
  window.localStorage.removeItem('bloglist:user');
  token = null;
};

const getToken = () => token;

export default { login, setUser, getUser, logout, getToken };
