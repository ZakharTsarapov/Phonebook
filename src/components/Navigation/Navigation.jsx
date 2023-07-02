import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export default function Navigation() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink className={css.navlink} to="/">Home</NavLink>
      {isLoggedIn && <NavLink className={css.navlink} to="/contacts">Contacts</NavLink>}
    </nav>
  );
}
