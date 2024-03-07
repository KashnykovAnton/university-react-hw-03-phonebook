import ContactItem from "./ContactItem";

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map((contact) => {
        const { id, name, number } = contact;
        return <ContactItem key={id} id={id} name={name} number={number} onDeleteContact={onDeleteContact} />;
      })}
    </ul>
  );
};

export default ContactList;
