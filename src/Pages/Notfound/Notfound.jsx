import { Link } from 'react-router-dom';
import css from './Notfound.module.css'

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1 className={css.text}>404 Сторінка не знайдена</h1>
      <Link className={css.link} to="/">Головна</Link>
    </div>
  );
}
