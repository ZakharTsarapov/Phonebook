import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import css from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const emailInputId = nanoid();
  const passwordInputId = nanoid();

  const onInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const formReset = () => {
    setEmail('');
    setPassword('');
  };

  const onFormSubmit = evt => {
    evt.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    formReset();
  };

  return (
    <div className={css.container}>
      <h1 className={css.grettings}>Sing in</h1>

      <form className={css.login} onSubmit={onFormSubmit} autoComplete="off">
        <label className={css.label} htmlFor={emailInputId}>
          Email
          <input
            className={css.input}
            type="email"
            name="email"
            value={email}
            onChange={onInputChange}
            id={emailInputId}
            required
          />
        </label>

        <label className={css.label} htmlFor={passwordInputId}>
          Password
          <input
            className={css.input}
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            id={passwordInputId}
            required
          />
        </label>

        <button className={css.btn} type="submit">
          Enter
        </button>
      </form>
    </div>
  );
}
