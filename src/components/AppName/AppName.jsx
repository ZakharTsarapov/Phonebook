import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './AppName.module.css';

export default function AppName({ title }) {
  return (
    <>
      {title && (
        <h1 className={css.text}>
          <Link className={css.link} to="/">{title}</Link>
        </h1>
      )}
    </>
  );
}

AppName.propTypes = {
  title: PropTypes.string,
};
