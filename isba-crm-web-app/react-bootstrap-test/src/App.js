import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Connect from './Connect';
import ContactDetail from './ContactDetail';
import { Inbox } from './Inbox';
import { Calendar } from './Calendar';
import Forms from './Forms';
import { NoMatch } from './NoMatch';
import { NavigationBar } from './components/NavigationBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// ErrorBoundary component to catch and display errors gracefully
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // State to hold whether an error has occurred and the error itself
    this.state = { hasError: false, error: null };
  }

  // Static method to update state so it triggers re-render with error info
  static getDerivedStateFromError(error) {
    // Update state so the next render shows fallback UI
    return { hasError: true, error };
  }

  // Side effects when an error is caught
  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("An error occurred:", error, errorInfo);
  }

  // Render fallback UI in case of an error or normal children otherwise
  render() {
    if (this.state.hasError) {
      // Fallback UI when error is caught
      return <h1>Something went wrong. Check the console for more information.</h1>;
    }
    // Render children if there's no error
    return this.props.children;
  }
}

function App() {
  // State to track online status
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Function to update online status
    const handleConnectionChange = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        console.log("Back online");
      } else {
        console.log("You are offline. Some functionalities may be limited.");
      }
    };

    // Event listeners for online and offline events
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/contact/:contactId" element={<ContactDetail />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </ErrorBoundary>
      </Router>
      {/* Display a warning when the user is offline */}
      {!isOnline && <div className="network-warning">Your connection appears to be offline. Some features may not be available.</div>}
    </React.Fragment>
  );
}

export default App;
