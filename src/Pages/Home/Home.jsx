import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import css from './Home.module.css';

export default function Home() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <h1 className={css.grettings}>There u can create ur Phonebook</h1>
      ) : (
        <>
          <h1 className={css.grettings}>Grettings in Phonebook application</h1>
            <p className={css.text}>
              For a start create new account or sing in.
          </p>
        </>
      )}
    </>
  );
}
