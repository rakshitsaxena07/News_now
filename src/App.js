import './App.css';
import React, { Component } from 'react';
import Navbar from './Component/Navbar';
import News from './Component/News';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      darkMode: false,
    };
  }

  // Method to toggle dark mode
  toggleDarkMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  render() {
    // Apply styles based on dark mode state
    const appStyle = {
      backgroundColor: this.state.darkMode ? '#042743' : '#fff',
      color: this.state.darkMode ? '#fff' : '#000',
      minHeight: '100vh',
    };

    return (
      <div style={appStyle}>
        <Router>
          <Navbar toggleDarkMode={this.toggleDarkMode} darkMode={this.state.darkMode} />
          <Routes>
            <Route path="/" element={<News key="general" country="us" pageSize={9} category="General" darkMode={this.state.darkMode} />} />
            <Route path="/business" element={<News key="business" country="us" pageSize={9} category="Business" darkMode={this.state.darkMode} />} />
            <Route path="/entertainment" element={<News key="entertainment" country="us" pageSize={9} category="Entertainment" darkMode={this.state.darkMode} />} />
            <Route path="/health" element={<News key="health" country="us" pageSize={9} category="Health" darkMode={this.state.darkMode} />} />
            <Route path="/science" element={<News key="science" country="us" pageSize={9} category="Science" darkMode={this.state.darkMode} />} />
            <Route path="/sports" element={<News key="sports" country="us" pageSize={9} category="Sports" darkMode={this.state.darkMode} />} />
            <Route path="/technology" element={<News key="technology" country="us" pageSize={9} category="Technology" darkMode={this.state.darkMode} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
