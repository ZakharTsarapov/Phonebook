import SectionName from 'components/SectionName';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';

export default function Phonebook() {
  return (
    <>
      <SectionName title="Додати контакт" />
      <ContactForm />
      <SectionName title="Контакти" />
      <Filter />
      <ContactList />
    </>
  );
}