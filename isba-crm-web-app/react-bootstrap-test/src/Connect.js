import './Connect.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Connect = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAllContacts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/ContactMaster");
                setContacts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllContacts();
    }, []);

    const filteredContacts = contacts.filter(contact =>
        contact.First.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.Last.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.LinkedInUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <h1>LMU ISBA Alumni and Contact Data</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="contacts">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>LinkedIn URL</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map(contact => (
                        <tr key={contact.ContactID}>
                            <td>{contact.First}</td>
                            <td>{contact.Last}</td>
                            <td><a href={contact.LinkedInUrl} target="_blank" rel="noopener noreferrer">{contact.LinkedInUrl}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button><Link to={"/add"}>Add New Contact</Link></button>
        </div>
    );
}

export default Connect;
