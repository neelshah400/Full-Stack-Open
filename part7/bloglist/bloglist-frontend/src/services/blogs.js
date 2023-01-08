import axios from 'axios';
import authService from './auth';

const baseUrl = '/api/blogs';

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

const create = (blog) => {
  const request = axios.post(baseUrl, blog, config());
  return request.then((response) => response.data);
};

const update = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, config());
  return request.then((response) => response.data);
};

const remove = (blog) => {
  const request = axios.delete(`${baseUrl}/${blog.id}`, config());
  return request.then((response) => response.data);
};

const commentOn = (blog, comment) => {
  const request = axios.post(`${baseUrl}/${blog.id}/comments`, { comment }, config());
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove, commentOn };
