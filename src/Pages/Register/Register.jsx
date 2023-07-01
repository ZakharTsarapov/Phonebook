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
      <h1 className={css.grettings}>Регістрація нового користувача</h1>

      <form className={css.regiter} onSubmit={onFormSubmit} autoComplete="off">
        <label className={css.label} htmlFor={nameInputId}>
          Ім'я
          <input
            className={css.input}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={onInputChange}
            id={nameInputId}
            required
          />
        </label>

        <label className={css.label} htmlFor={emailInputId}>
          імеїл
          <input
            className={css.input}
            type="email"
            name="email"
            placeholder="Enter your e-mail"
            value={email}
            onChange={onInputChange}
            id={emailInputId}
            required
          />
        </label>

        <label className={css.label} htmlFor={passwordInputId}>
          Пароль
          <input
            className={css.input}
            type="password"
            name="password"
            placeholder="Set password"
            value={password}
            onChange={onInputChange}
            id={passwordInputId}
            required
          />
        </label>

        <button className={css.btn} type="submit">
          Регістрація
        </button>
      </form>
    </div>
  );
}
