import { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import "./App.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = (newContact) => {
    const { name, number } = newContact;
    this.checkContactIsExist(name)
      ? alert(`${name} is already in contacts`)
      : this.setState((prevState) => ({ contacts: [...prevState.contacts, { id: nanoid(), name, number }] }));
  };

  checkContactIsExist = (name) => {
    return this.state.contacts.find(
      (contact) => this.toLowerCaseFunction(contact.name) === this.toLowerCaseFunction(name)
    );
  };

  handleFilterContact = (e) => {
    this.setState({ filter: this.toLowerCaseFunction(e.target.value) });
  };

  filteredContacts = (value) => {
    return this.state.contacts.filter((contact) => {
      const caseInsensitiveContact = this.toLowerCaseFunction(contact.name);
      return caseInsensitiveContact.includes(value);
    });
  };

  deleteContact = (id) => {
    const contacts = this.state.contacts.filter((contact) => contact.id !== id);
    this.setState({ contacts: contacts });
  };

  toLowerCaseFunction = (value) => {
    return value.toLowerCase();
  };

  render() {
    const { handleSubmit, handleFilterContact, filteredContacts, deleteContact } = this;
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit} />

        <h2>Contacts</h2>
        <Filter filterValue={filter} onChange={handleFilterContact} />
        <ContactList contacts={filteredContacts(filter)} onDeleteContact={deleteContact} />
      </div>
    );
  }
}

export default App;
