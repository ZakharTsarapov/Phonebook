import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <nav className={css.nav}>
      <NavLink className={css.link} to="/login">Вхід</NavLink>
      <NavLink className={css.link} to="/register">Регістрація</NavLink>
    </nav>
  );
}
