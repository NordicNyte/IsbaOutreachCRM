import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState([]); // State to hold data from the backend

  useEffect(() => {
    fetch('http://localhost:3000/executeQuery')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h1>Data from MySQL</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* Add more table headers based on your data structure */}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                {/* Add more table data cells based on your data structure */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;