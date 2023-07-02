import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import css from './Register.module.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const nameInputId = nanoid();
  const emailInputId = nanoid();
  const passwordInputId = nanoid();

  const onInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const formReset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const onFormSubmit = evt => {
    evt.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    formReset();
  };

  return (
    <div className={css.container}>
      <h1 className={css.grettings}>Registration new user</h1>

      <form className={css.register} onSubmit={onFormSubmit} autoComplete="off">
        <label className={css.label} htmlFor={nameInputId}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            onChange={onInputChange}
            id={nameInputId}
            required
          />
        </label>

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
          Registration
        </button>
      </form>
    </div>
  );
}
