import { useState } from 'react';
import {
  useGetAllContactsQuery,
  useAddContactMutation,
} from 'services/phonebookAPI';
import { nanoid } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';
import css from './ContactForm.module.css';


export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data: contacts } = useGetAllContactsQuery();
  const [addContact, { isLoading: isCreating }] = useAddContactMutation();

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const onInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return;
    }
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  const onContactFormSubmit = async evt => {
    evt.preventDefault();

    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() &&
          contact.number === number
      )
    ) {
      Notify.info('цей контакт вже є у списку');
      return;
    }

    if (contacts.find(contact => contact.number === number)) {
      Notify.info('Телефон вже е у базі');
      return;
    }

    const newContact = {
      name,
      number,
    };

    try {
      await addContact(newContact);
      Notify.success('Новий контакт був доданий');
    } catch (error) {
      console.log(error.message);
      Notify.failure('Помилка, контакт не створенно');
    }

    formReset();
  };

  return (
    <div className={css.container}>
      <form className={css.contact__form} onSubmit={onContactFormSubmit}>
        <label className={css.contact__label} htmlFor={nameInputId}>
          Name
          <input
            className={css.contact__input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={onInputChange}
            id={nameInputId}
            required
          />
        </label>

        <label className={css.contact__label} htmlFor={numberInputId}>
          Phone
          <input
            className={css.contact__input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={onInputChange}
            id={numberInputId}
            required
          />
        </label>

        <button
          className={css.contact__btn}
          type="submit"
          disabled={isCreating}
        >
          {isCreating ? 'Adding...' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
}