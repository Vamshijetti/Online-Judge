import React, { useState } from 'react';
import './LoginSignup.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (isRegistering) {
      try {
        console.log(API_BASE_URL);
        const res = await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
          alert('Registration successful! You can now log in.');
          // console.log("userid : " + newUser._id;  // ✅ correct
          localStorage.setItem("userId", data.userId);
          setIsRegistering(false);
          setUsername('');
          setPassword('');
        } else {
          alert(data.message || 'Registration failed');
        }
      }
      catch (err) {
        console.error('Register Error:', err.message);
        alert('Something went wrong.');
      }
    }
    else {
      try {
        const res = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        
        if (res.ok) {
          localStorage.setItem(username + password, data.token);
          localStorage.setItem("loggedIn", true);
          console.log("hello.....");
          console.log(data.userId);
          localStorage.setItem("userId", data.userId);
          navigate('/', { replace: true });
        } else {
          alert(data.message || 'Login failed');
        }
      }
      catch (err) {
        console.log('Login Error : ', err.message);
        alert('Something went wrong.');
      }
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>

        {!isRegistering && (
          <div className="remember-forgot">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>
        )}

        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>

        <div className="register-lik">
          {isRegistering ? (
            <p>Already have an account?{' '}
              <a href="#" onClick={() => setIsRegistering(false)}>Login</a>
            </p>
          ) : (
            <p>Don't have an account?{' '}
              <a href="#" onClick={() => setIsRegistering(true)}>Register</a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;