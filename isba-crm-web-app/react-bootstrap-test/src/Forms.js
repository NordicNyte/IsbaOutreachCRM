// Forms.js
import React, { useState } from 'react';
import './Forms.css';
import { addConnection } from './FormsDbService'; // Import the service function

export const Forms = () => {
  // Individual states for each input field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct a new connection object
    const newConnectionData = {
      firstName,
      lastName,
      email,
      notes,
    };

    // Add the new connection to Firestore
    await addConnection(newConnectionData);

    // Clear form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setNotes('');
  };

  return (
    <main className="Forms-main">
      <header className="Forms-header">
        <h2>Forms</h2>
        <p>Please fill out the form to add information.</p>
      </header>
     
      <div className="forms-container">
        <form className="outer-section-connection-grid" onSubmit={handleSubmit}>
          <div className='inner-section-connection-grid'>
            <h3>Add Connection Information Request</h3>
            <div className="grid-container">
              
              <div>
                <label htmlFor="first-name">First Name *</label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label htmlFor="last-name">Last Name *</label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label htmlFor="notes">Notes</label>
                <input
                  id="notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes"
                />
              </div>

            </div>
            <button type="submit" className="submit-all">Submit All</button>
          </div>
          
        </form>
        <form className="outer-section-connection-grid" onSubmit={handleSubmit}>
          <div className='inner-section-connection-grid'>
            <h3>Remove Connection Information Request</h3>
            <div className="grid-container">
              
              <div>
                <label htmlFor="first-name">First Name *</label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label htmlFor="last-name">Last Name *</label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label htmlFor="notes">Notes</label>
                <input
                  id="notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes"
                />
              </div>

            </div>
            <button type="submit" className="submit-all">Submit All</button>
          </div>
          
        </form>
      </div>
    </main>
  );
};
