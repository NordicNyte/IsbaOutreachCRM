import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Connect.css'; // Import CSS file for styling

const Connect = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skills, setSkills] = useState([]);
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [expandedRows, setExpandedRows] = useState({}); // State to track expanded rows

    useEffect(() => {
        const fetchAllContacts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/ContactMaster");
                const formattedContacts = res.data.map(contact => ({
                    ...contact,
                    skill: contact.skill ? contact.skill.split(',').map(skill => skill.trim()) : []
                }));
                setContacts(formattedContacts);
                // Initialize expandedRows state for each contact ID
                const initialExpandedRows = {};
                formattedContacts.forEach(contact => {
                    initialExpandedRows[contact.ContactID] = contact.skill.length > 0 ? false : true;
                });
                setExpandedRows(initialExpandedRows);
            } catch (err) {
                console.error("Error fetching contacts:", err);
            }
        };

        const fetchAllSkills = async () => {
            try {
                const res = await axios.get("http://localhost:8800/skills");
                setSkills(res.data);
            } catch (err) {
                console.error("Error fetching skills:", err);
            }
        };

        fetchAllContacts();
        fetchAllSkills();
    }, []);

    const handleSkillChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedSkills(selectedOptions);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const toggleSkillsExpand = (contactID) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [contactID]: !prevState[contactID]
        }));
    };

    const sortedContacts = contacts.sort((a, b) => {
        if (sortColumn === 'First') {
            return sortOrder === 'asc' ? a.First.localeCompare(b.First) : b.First.localeCompare(a.First);
        } else if (sortColumn === 'Last') {
            return sortOrder === 'asc' ? a.Last.localeCompare(b.Last) : b.Last.localeCompare(a.Last);
        } else if (sortColumn === 'ContactID') {
            return sortOrder === 'asc' ? a.ContactID - b.ContactID : b.ContactID - a.ContactID;
        }
        return 0;
    });

    const filteredContacts = sortedContacts.filter(contact =>
        (contact.First && contact.First.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (contact.Last && contact.Last.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (contact.LinkedInUrl && contact.LinkedInUrl.toLowerCase().includes(searchTerm.toLowerCase()))
    ).filter(contact => {
        if (selectedSkills.length === 0) return true;
        return contact.skill && contact.skill.some(skill => selectedSkills.includes(skill));
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
                    <select
                        multiple
                        size="5"
                        onChange={handleSkillChange}
                        className="skills-dropdown"
                    >
                        {skills.map(skill => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="sorts">
                    <h2>Sort</h2>
                    <button onClick={() => handleSort('First')}>
                        Sort by First Name {sortColumn === 'First' && sortOrder === 'asc' ? '▲' : '▼'}
                    </button>
                    <button onClick={() => handleSort('Last')}>
                        Sort by Last Name {sortColumn === 'Last' && sortOrder === 'asc' ? '▲' : '▼'}
                    </button>
                    <button onClick={() => handleSort('ContactID')}>
                        Sort by ContactID {sortColumn === 'ContactID' && sortOrder === 'asc' ? '▲' : '▼'}
                    </button>
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
                            <td>{contact.First}</td>
                            <td>{contact.Last}</td>
                            <td><a href={contact.LinkedInUrl} target="_blank" rel="noopener noreferrer">{contact.LinkedInUrl}</a></td>
                            <td>
                                {contact.skill.length > 0 &&
                                    <>
                                        <button
                                            className={`expand-button ${expandedRows[contact.ContactID] ? 'expanded' : ''}`}
                                            onClick={() => toggleSkillsExpand(contact.ContactID)}
                                        >
                                            {expandedRows[contact.ContactID] ? '-' : '+'}
                                        </button>
                                        <div className={`skills-entry ${expandedRows[contact.ContactID] ? 'expanded' : ''}`}>
                                            {contact.skill.join(', ')}
                                        </div>
                                    </>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Connect;
