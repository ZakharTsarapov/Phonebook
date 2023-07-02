import css from './ContactList.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getFilterValue } from 'redux/filterSlice';
import { useGetAllContactsQuery } from 'services/phonebookAPI';
import sortContactsByName from 'utils/sortContactsByName';
import ContactItem from 'components/ContactItem';
import { FaRedo } from 'react-icons/fa';
import { IconContext } from 'react-icons';


export default function ContactList() {
  const {
    data: contacts = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllContactsQuery();

  const filterValue = useSelector(getFilterValue);

  const totalContactsAmount = () => {
    if (!contacts) {
      return 0;
    }
    return contacts.length;
  };

  const getVisibleContacts = useMemo(
    () => () => {
      if (!contacts) {
        return;
      }

      const normalizedFilter = filterValue.toLowerCase().trim();

      return contacts
        .filter(
          contact =>
            contact.name.toLowerCase().includes(normalizedFilter))
        .sort(sortContactsByName);
    },
    [contacts, filterValue]
  );


  const visibleContacts = getVisibleContacts();

  return (
    <>
      {isLoading ? (
        <p className={css.loader}>Завантаження...</p>
      ) : totalContactsAmount() > 0 ? (
        <>
          <p className={css.text}>
            Кількість контактів:{' '}
            <span className={css.quantity}>{totalContactsAmount()}</span>
          </p>
          <ul className={css.item}>
            {visibleContacts.length ? (
              visibleContacts.map(({ id, name, number }) => (
                <li className={css.list} key={id}>
                  <ContactItem id={id} name={name} number={number} />
                </li>
              ))
            ) : (
              <p className={css.nomatch}>Немає контакту</p>
            )}
          </ul>
        </>
      ) : (
        <>
          <p className={css.text}>
            Немає контактів у вашій книзі
          </p>
        </>
      )}
      {isError && (
        <>
          <p className={css.refetch}>Помилка! Оновіть список контактів</p>
          <button
            className={css.item__btn}
            type="button"
            onClick={() => refetch()}
          >
            <IconContext.Provider value={{ size: '5em' }}>
              <FaRedo />
            </IconContext.Provider>
          </button>
        </>
      )}
    </>
  );
}