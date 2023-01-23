import { Section } from 'components/Section/Section';
import { Forms } from 'components/Forms/Forms';
import { Contacts } from 'components/Contacts/Contacts';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { addContact, deleteContact } from 'redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);

  const filterContacts = contacts?.length
    ? contacts.filter(contact => contact.name.toLowerCase().includes(filter))
    : [];

  const addCont = data => {
    if (contacts.length && contacts.find(item => item.name === data.name))
      return alert(
        'Are you sure about that? "' + data.name + '" is already in contacts.'
      );

    dispatch(addContact(data));
  };

  const selectedContacts = text => dispatch(setFilter(text));

  const deleteCont = id => dispatch(deleteContact(id));

  return (
    <Section>
      <Section title="Phonebook">
        <Forms submit={addCont} />
      </Section>

      {contacts.length > 0 && (
        <Section title="Contacts">
          <Contacts
            contacts={filterContacts}
            onSearch={selectedContacts}
            onDelete={deleteCont}
          />
        </Section>
      )}
    </Section>
  );
};
