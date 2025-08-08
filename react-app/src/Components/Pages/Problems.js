// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function Problems() {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:4000/problems/getAllProblems')  // Use your actual backend URL
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setProblems(data.problems);
//         } else {
//           console.error('Failed to load problems');
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error:', err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Problems</h2>
//       {loading ? (
//         <p style={styles.text}>Loading...</p>
//       ) : problems.length === 0 ? (
//         <p style={styles.text}>No problems available.</p>
//       ) : (
//         <ul style={styles.list}>
//           {problems.map((problem) => (
//             <li key={problem._id} style={styles.listItem}>
//               <Link to={`/problem/${problem._id}`} style={styles.link}>
//                 {problem.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: '2rem',
//     textAlign: 'center',
//   },
//   heading: {
//     fontSize: '2rem',
//     marginBottom: '1rem',
//   },
//   text: {
//     fontSize: '1rem',
//     color: '#444',
//   },
//   list: {
//     listStyle: 'none',
//     padding: 0,
//     marginTop: '1rem',
//   },
//   listItem: {
//     marginBottom: '0.8rem',
//   },
//   link: {
//     textDecoration: 'none',
//     color: '#1976d2',
//     fontSize: '1.1rem',
//     fontWeight: '500',
//   },
// };

// export default Problems;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/problems/getAllProblems')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProblems(data.problems);
        } else {
          console.error('Failed to load problems');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>C++ Problems</h2>
      {loading ? (
        <p style={styles.text}>Loading...</p>
      ) : problems.length === 0 ? (
        <p style={styles.text}>No problems available.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Problem Name</th>
                <th style={styles.th}>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr key={problem._id} style={styles.tr}>
                  <td style={styles.td}>{problem.id}</td>
                  <td style={styles.td}>
                    <Link to={`/problem/${problem._id}`} style={styles.link}>
                      {problem.name}
                    </Link>
                  </td>
                  <td style={{
                    ...styles.td,
                    color: problem.difficulty === 'Easy' ? 'green' : 
                          problem.difficulty === 'Medium' ? 'orange' : 'red'
                  }}>
                    {problem.difficulty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
  },
  text: {
    fontSize: '1rem',
    color: '#444',
    textAlign: 'center',
  },
  tableContainer: {
    overflowX: 'auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },
  th: {
    backgroundColor: '#f5f5f5',
    padding: '16px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    fontWeight: 'bold',
    color: '#333',
  },
  tr: {
    borderBottom: '1px solid #eee',
    '&:hover': {
      backgroundColor: '#f9f9f9',
    }
  },
  td: {
    padding: '16px',
    textAlign: 'left',
  },
  link: {
    textDecoration: 'none',
    color: '#1976d2',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline',
    }
  }
};
