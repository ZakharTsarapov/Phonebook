import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import css from './Home.module.css';

export default function Home() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <h1 className={css.grettings}>Створити персональну книгу контактів</h1>
      ) : (
        <>
          <h1 className={css.grettings}>Вітаю у додадтку книги контактів</h1>
          <p className={css.text}>
            Для початку створіть новий аккаутн або увійдіть у свій обліковий запис.
          </p>
        </>
      )}
    </>
  );
}
