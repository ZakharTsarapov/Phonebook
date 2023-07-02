import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import css from './Filter.module.css';
import { getFilterValue } from '../../redux/filterSlice';
import { nanoid } from 'nanoid';

export default function Filter() {
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const filterInputId = nanoid();

  const onChange = evt => {
    dispatch(setFilter(evt.currentTarget.value.trim()));
  };
 
  
  return (
    <div className={css.container}>
      <label className={css.filter} htmlFor={filterInputId}>
        Find contacts by name
        <input
          className={css.filter__input}
          type="text"
          onChange={onChange}
          id={filterInputId}
          name={filterValue}
        ></input>
      </label>
    </div>
  );
}
 

