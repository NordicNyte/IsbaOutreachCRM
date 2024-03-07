import React, { useState } from 'react';

export const Forms = () => {
  // State for storing the list of connections
  const [connections, setConnections] = useState([]);
  // State for storing the value of the input fields in the add form
  const [newConnection, setNewConnection] = useState('');
  // State for storing the value of the input fields in the remove form
  const [connectionToRemove, setConnectionToRemove] = useState('');

  // Function to handle adding a new connection
  const handleAddConnection = () => {
    if (newConnection.trim() !== '') {
      setConnections([...connections, newConnection]);
      setNewConnection(''); // Clear the input field after adding a connection
    }
  };

  // Function to handle removing a connection
  const handleRemoveConnection = () => {
    if (connectionToRemove.trim() !== '') {
      setConnections(connections.filter(connection => connection !== connectionToRemove));
      setConnectionToRemove(''); // Clear the input field after removing a connection
    }
  };

  return (
    <div style={{ textAlign: 'center', color: 'white', marginTop: '70px' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '90px' }}>Forms </h2>
      <p style={{ fontSize: '20px' }}>Please fill out a form to request to add or remove a connection.</p>

      {/* Form for adding a connection */}
      <form onSubmit={(e) => { e.preventDefault(); handleAddConnection(); }}>
        <input
          type="text"
          value={newConnection}
          onChange={(e) => setNewConnection(e.target.value)}
          placeholder="Enter new connection"
        />
        <button type="submit">Add</button>
      </form>

      {/* Form for removing a connection */}
      <form onSubmit={(e) => { e.preventDefault(); handleRemoveConnection(); }}>
        <input
          type="text"
          value={connectionToRemove}
          onChange={(e) => setConnectionToRemove(e.target.value)}
          placeholder="Enter connection to remove"
        />
        <button type="submit">Remove</button>
      </form>

      {/* Display the list of connections */}
      <ul>
        {connections.map((connection, index) => (
          <li key={index}>{connection}</li>
        ))}
      </ul>
    </div>
  );
};
