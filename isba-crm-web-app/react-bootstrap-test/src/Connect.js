import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Connect.css';

const Connect = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skills, setSkills] = useState([]);
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [expandedRows, setExpandedRows] = useState({});

    useEffect(() => {
        fetchAllContacts();
        fetchAllSkills();
    }, []);

    const fetchAllContacts = async () => {
        try {
            const res = await axios.get("http://localhost:8800/ContactMaster");
            const formattedContacts = res.data.map(contact => ({
                ...contact,
                skill: contact.skill ? contact.skill.split(',').map(skill => skill.trim()) : []
            }));
            setContacts(formattedContacts);

            const initialExpandedRows = {};
            formattedContacts.forEach(contact => {
                initialExpandedRows[contact.ContactID] = false;
            });
            setExpandedRows(initialExpandedRows);
        } catch (err) {
            console.error("Error fetching contacts:", err);
        }
    };

    const fetchAllSkills = async () => {
        try {
            const res = await axios.get("http://localhost:8800/skills");
            setSkills(res.data.map(skill => skill.SkillName));
        } catch (err) {
            console.error("Error fetching skills:", err);
        }
    };

    const handleSkillChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedSkills(selectedOptions);
    };

    const handleSort = (column) => {
        setSortColumn(column);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const toggleSkillsExpand = (contactID) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [contactID]: !prevState[contactID]
        }));
    };

    const filteredContacts = contacts.filter(contact => {
        const searchTermMatch =
            contact.First.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.Last.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.LinkedInUrl.toLowerCase().includes(searchTerm.toLowerCase());

        const skillsMatch = selectedSkills.length === 0 ||
            selectedSkills.every(selectedSkill => contact.skill.includes(selectedSkill));

        return searchTermMatch && skillsMatch;
    });

    return (
        <div className="App">
            <h1>LMU ISBA Alumni and Contact Data</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filters-container">
                <div className="filters">
                    <h2>Filter by Skills</h2>
                    <select multiple size="5" onChange={handleSkillChange} className="skills-dropdown">
                        {skills.map((skill, index) => (
                            <option key={index} value={skill}>{skill}</option>
                        ))}
                    </select>
                </div>
                <div className="sorts">
                    <h2>Sort</h2>
                    <button onClick={() => handleSort('First')}>Sort by First Name</button>
                    <button onClick={() => handleSort('Last')}>Sort by Last Name</button>
                    <button onClick={() => handleSort('ContactID')}>Sort by ContactID</button>
                </div>
            </div>
            <table className="contacts">
                <thead>
                    <tr>
                        <th>ContactID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>LinkedIn URL</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map(contact => (
                        <tr key={contact.ContactID}>
                            <td>{contact.ContactID}</td>
                            <td><Link to={`/contact/${contact.ContactID}`}>{contact.First}</Link></td>
                            <td>{contact.Last}</td>
                            <td>
                                <a href={contact.LinkedInUrl} target="_blank" rel="noopener noreferrer">
                                    {contact.LinkedInUrl}
                                </a>
                            </td>
                            <td>
                                {contact.skill.length > 0 && (
                                    <>
                                        <button onClick={() => toggleSkillsExpand(contact.ContactID)}>
                                            {expandedRows[contact.ContactID] ? '-' : '+'}
                                        </button>
                                        {expandedRows[contact.ContactID] && (
                                            <div>{contact.skill.join(', ')}</div>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Connect;
