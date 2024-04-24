// Forms.js
import React, { useState } from 'react';
import './Forms.css';
import { addConnection, removeConnection } from './FormsDbService';

function Forms() {

  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    notes: '',
  };


  const [addFormState, setAddFormState] = useState(initialState);
  const [removeFormState, setRemoveFormState] = useState(initialState);
  

  // Handle input changes for the add connection form
  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setAddFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle input changes for the remove connection form
  const handleRemoveInputChange = (event) => {
    const { name, value } = event.target;
    setRemoveFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit handler for adding a connection
  const handleAddSubmit = (event) => {
    event.preventDefault();
    addConnection(addFormState)
      .then(() => {
        console.log('Connection added successfully');
        setAddFormState(initialState);
      })
      .catch(error => console.error('Error adding connection:', error));
  };

  // Submit handler for removing a connection
  const handleRemoveSubmit = (event) => {
    event.preventDefault();
    removeConnection(removeFormState)
      .then(() => {
        console.log('Removal request submitted successfully');
        setRemoveFormState(initialState); // Reset the remove form state
      })
      .catch(error => console.error('Error submitting removal request:', error));
  };

  // Render forms ensuring input names match state keys
  return (
    <main className="Forms-main">
      <header className="Forms-header">
        <h2>Forms</h2>
        <p>Please fill out the form to add or remove information.</p>
      </header>
    
      <div className="forms-container">
        <form className="outer-section-connection-grid" onSubmit={handleAddSubmit}>
          <div className='inner-section-connection-grid'>
            <h3>Add Connection Information Request</h3>
            <div className="grid-container">
              
              <div>
                <label htmlFor="first-name">First Name *</label>
                <input
                  name="firstname"
                  type="text"
                  value={addFormState.firstname}
                  onChange={handleAddInputChange}
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label htmlFor="last-name">Last Name *</label>
                <input
                  name="lastname"
                  type="text"
                  value={addFormState.lastname}
                  onChange={handleAddInputChange}
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label htmlFor="email">LinkedIn *</label>
                <input
                  name="email"
                  type="text"
                  value={addFormState.email}
                  onChange={handleAddInputChange}
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label htmlFor="notes">Notes</label>
                <input
                  name="notes"
                  type="text"
                  value={addFormState.notes}
                  onChange={handleAddInputChange}
                  placeholder="Enter notes"
                />
              </div>

            </div>
            <button type="submit">Request Add Connection</button>
          </div>
          
        </form>
        <form className="outer-section-connection-grid" onSubmit={handleRemoveSubmit}>
          <div className='inner-section-connection-grid'>
            <h3>Remove Connection Information Request</h3>
            <div className="grid-container">
              
            <div>
                <label htmlFor="remove-first-name">First Name *</label>
                <input
                  name="firstname"
                  type="text"
                  value={removeFormState.firstname}
                  onChange={handleRemoveInputChange}
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label htmlFor="remove-last-name">Last Name *</label>
                <input
                  name="lastname"
                  type="text"
                  value={removeFormState.lastname}
                  onChange={handleRemoveInputChange}
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label htmlFor="remove-email">LinkedIn *</label>
                <input
                  name="email"
                  type="text"
                  value={removeFormState.email}
                  onChange={handleRemoveInputChange}
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label htmlFor="remove-notes">Notes</label>
                <input
                  name="notes"
                  type="text"
                  value={removeFormState.notes}
                  onChange={handleRemoveInputChange}
                  placeholder="Enter notes"
                />
              </div>

            </div>
            <button type="submit">Request Remove Connection</button>
          </div>
          
        </form>
      </div>
    </main>
  );
}

export default Forms;

