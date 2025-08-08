// import { useState, useEffect } from 'react';
// import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
// import Home from './Components/Pages/Home';
// import Problems from './Components/Pages/Problems';
// import Submissions from './Components/Pages/Submissions';
// import Logout from './Components/Pages/Logout';
// import LoginSignup from './Components/LoginSignup/LoginSignup';
// import './App.css';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     setIsLoggedIn(localStorage.getItem("loggedIn") === 'true');
//   }, [location]);

//   return (
//     <div className="App">
//       {isLoggedIn && location.pathname !== '/login' && (
//         <nav>
//           <Link to="/">Home</Link> |{" "}
//           <Link to="/problems">Problems</Link> |{" "}
//           <Link to="/submissions">Submissions</Link> |{" "}
//           <Link to="/logout">Logout</Link>
//         </nav>
//       )}

//       <Routes>
//         <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
//         <Route path="/problems" element={isLoggedIn ? <Problems /> : <Navigate to="/login" />} />
//         <Route path="/submissions" element={isLoggedIn ? <Submissions /> : <Navigate to="/login" />} />
//         <Route path="/logout" element={isLoggedIn ? <Logout /> : <Navigate to="/login" />} />
//         <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginSignup />} />
//         <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
//         <Route path="/problem/:problemId" element={isLoggedIn ? <Problems /> : <Navigate to="/login" />} />
//         {/* <Route path="/submissions/:userId" element={isLoggedIn ? <Submissions /> : <Navigate to="/login" />} /> */}

//       </Routes>
//     </div>
//   );
// }
// export default App;


import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Problems from './Components/Pages/Problems';
import ProblemDetail from './Components/Pages/ProblemDetail';
import Submissions from './Components/Pages/Submissions';
import Logout from './Components/Pages/Logout';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import './App.css';

// index.js or wherever your ReactDOM.render or createRoot is
window.addEventListener('error', (e) => {
  if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
    e.stopImmediatePropagation();
  }
});


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === 'true');
  }, [location]);

  return (
    <div className="App">
      {isLoggedIn && location.pathname !== '/login' && (
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/problems" style={styles.navLink}>Problems</Link>
          <Link to="/submissions" style={styles.navLink}>Submissions</Link>
          <Link to="/logout" style={styles.navLink}>Logout</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/problems" element={isLoggedIn ? <Problems /> : <Navigate to="/login" />} />
        <Route path="/problem/:problemId" element={isLoggedIn ? <ProblemDetail /> : <Navigate to="/login" />} />
        <Route path="/submissions" element={isLoggedIn ? <Submissions /> : <Navigate to="/login" />} />
        <Route path="/logout" element={isLoggedIn ? <Logout /> : <Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginSignup />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}

const styles = {
  nav: {
    padding: '15px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: '500',
    fontSize: '16px',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#e9ecef',
    }
  }
};

export default App;