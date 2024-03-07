const ContactItem = ({id, name, number, onDeleteContact }) => {
  return (
    <li>
      <span>
        {name}: {number}
      </span>
      <button type="button" onClick={() => {onDeleteContact(id)}}>Delete</button>
    </li>
  );
};

export default ContactItem;
