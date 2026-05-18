import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function App() {
  const [location, setLocation] = useState('login');

  const locationChange = (e) => {
    setLocation(e.target.dataset.target);
  };

  return (
    <div className='App'>
      <h1>Hello from the web</h1>
      <nav>
        <button onClick={locationChange} data-target='login'>
          Log in
        </button>
        <button onClick={locationChange} data-target='register'>
          Register
        </button>
      </nav>
      <div>{location === 'login' ? <Login /> : null}</div>
      <div>{location === 'register' ? <Register /> : null}</div>
    </div>
  );
}

export default App;
