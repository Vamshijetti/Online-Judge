import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token or user session
    localStorage.removeItem('loggedIn'); // or your auth key
    navigate('/login'); // Redirect to login page
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <p>Logging out...</p>
    </div>
  );
}

export default Logout;
