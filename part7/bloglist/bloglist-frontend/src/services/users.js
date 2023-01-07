import axios from 'axios';
import authService from './auth';

const baseUrl = '/api/users';

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${authService.getToken()}`,
    },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl, config());
  return request.then((response) => response.data);
};

export default { getAll };
