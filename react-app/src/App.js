import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Problems from './Components/Pages/Problems';
import Submissions from './Components/Pages/Submissions';
import Logout from './Components/Pages/Logout';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === 'true');
  }, [location]);

  return (
    <div className="App">
      {isLoggedIn && location.pathname !== '/login' && (
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/problems">Problems</Link> |{" "}
          <Link to="/submissions">Submissions</Link> |{" "}
          <Link to="/logout">Logout</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/problems" element={isLoggedIn ? <Problems /> : <Navigate to="/login" />} />
        <Route path="/submissions" element={isLoggedIn ? <Submissions /> : <Navigate to="/login" />} />
        <Route path="/logout" element={isLoggedIn ? <Logout /> : <Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginSignup />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}
export default App;