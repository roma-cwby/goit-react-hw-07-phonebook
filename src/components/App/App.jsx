import { useEffect } from 'react';
import { Section } from 'components/Section/Section';
import { Forms } from 'components/Forms/Forms';
import { Contacts } from 'components/Contacts/Contacts';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { fetchContacts, addContact, deleteContact } from 'redux/requests';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const filterContacts = contacts?.length
    ? contacts.filter(contact => contact.name.toLowerCase().includes(filter))
    : [];

  async function addCont(data) {
    if (contacts.length && contacts.find(item => item.name === data.name))
      return alert(
        'Are you sure about that? "' + data.name + '" is already in contacts.'
      );

    await dispatch(addContact(data));
    dispatch(fetchContacts());
  }

  function selectedContacts(text) {
    dispatch(setFilter(text));
  }

  async function deleteCont(id) {
    await dispatch(deleteContact(id));
    dispatch(fetchContacts());
  }

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
