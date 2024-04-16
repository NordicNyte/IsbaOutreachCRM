import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Connect from './Connect';
import { Inbox } from './Inbox';
import { Calendar } from './Calendar';
import Forms from './Forms';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactDetail from './ContactDetail';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("An error occurred:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong. Check the console for more information.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleConnectionChange = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        console.log("Back online");
      } else {
        console.log("You are offline. Some functionalities may be limited.");
      }
    };

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

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
      {!isOnline && <div className="network-warning">Your connection appears to be offline. Some features may not be available.</div>}
    </React.Fragment>
  );
}

export default App;
