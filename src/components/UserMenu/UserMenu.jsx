import { useSelector, useDispatch } from 'react-redux';
import { authSelectors, authOperations } from 'redux/auth';
import { FcAssistant, FcBadDecision } from 'react-icons/fc';
import { IconContext } from 'react-icons';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const userName = useSelector(authSelectors.getUsername);
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <div className={css.avatar}>
        <IconContext.Provider value={{ size: '3.5em' }}>
          <FcAssistant />
        </IconContext.Provider>
      </div>
      <span className={css.name}>{userName}</span>
      <button
        className={css.btn}
        type="button"
        onClick={() => dispatch(authOperations.logOut())}
      >
        <IconContext.Provider value={{ size: '3em' }}>
          <FcBadDecision />
        </IconContext.Provider>
      </button>
    </div>
  );
}
