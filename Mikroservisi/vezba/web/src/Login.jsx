import React, { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute';

function Login() {
  //1. Kje kreirame inicjalen objekt
  const initData = {
    email: '',
    password: '',
  };

  //2. Kje gi zacuvame podatocite sto kje gi ispratime na nasheto api vo jusstejt
  const [data, setData] = useState(initData);

  //3. Kje kreirame stejt koj kje preveruvame dali sme logirani ili ne
  const [loggedIn, setLoggedIn] = useState(false);

  //4. So ovaa funkcija kje gi sledime promenite vo formata
  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //5. Imame funkcija login koja e normalno e asihrona
  const login = async () => {
    try {
      let res = await fetch('http://127.0.0.1:9002/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });

      let pretvorenJsonVoObjekt = await res.json();
      if (res.ok) {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('token', pretvorenJsonVoObjekt.token);
      }

      alert(pretvorenJsonVoObjekt.status);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  const logout = () => {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('token');
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <ProtectedRoute />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login Form</h2>
          <label>Email</label>
          <br />
          <input
            type='email'
            name='email'
            value={data.email}
            onChange={dataChange}
          />
          <br />
          <label>Passwords</label>
          <br />
          <input
            type='password'
            name='password'
            value={data.password}
            onChange={dataChange}
          />
          <br />
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
