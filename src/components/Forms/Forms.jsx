import { useState } from 'react';
import { Form } from 'components/Forms/Forms.styled';

export const Forms = ({ submit }) => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.target;

    if (name === 'name') setName(value);
    else if (name === 'phone') setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit({
      name,
      phone,
    });

    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        value={name}
      />

      <label htmlFor="number">Phone</label>
      <input
        type="tel"
        name="phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
        value={phone}
      />

      <button type="submit">Add contact</button>
    </Form>
  );
};
