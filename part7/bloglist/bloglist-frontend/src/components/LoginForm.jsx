/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { logUserIn } from '../reducers/authReducer';
import Notification from './Notification';

function LoginForm() {
  const dispatch = useDispatch();

  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('password');

  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value,
    };
    resetUsername();
    resetPassword();
    dispatch(logUserIn(credentials));
  };

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input name="Username" id="usernameInput" {...username} />
        </div>
        <div>
          password
          <input name="Password" id="passwordInput" {...password} />
        </div>
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
