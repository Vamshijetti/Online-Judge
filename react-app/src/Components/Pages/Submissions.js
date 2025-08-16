import React, { useEffect, useState } from 'react';

function Submissions() {
  const userId = localStorage.getItem("userId");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!userId) {
        setError("User ID not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/submissions/${userId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch submissions");
        }

        setSubmissions(data.submissions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [userId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Submissions</h2>

      {loading ? (
        <p style={styles.text}>Loading...</p>
      ) : error ? (
        <p style={{ ...styles.text, color: "red" }}>{error}</p>
      ) : submissions.length === 0 ? (
        <p style={styles.text}>No submissions found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Problem ID</th>
              <th style={styles.th}>Code</th>
              <th style={styles.th}>Verdict</th>
              <th style={styles.th}>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{sub.problemId}</td>
                <td style={{ ...styles.td, maxWidth: "300px" }}>
                  <pre style={styles.codeBlock}>{sub.code}</pre>
                </td>
                <td style={{ ...styles.td, maxWidth: "400px" }}>
                  <pre style={styles.verdictBlock}>{sub.verdict}</pre>
                </td>
                <td style={styles.td}>
                  {new Date(sub.submittedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  text: {
    fontSize: '1rem',
    color: '#444',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    fontFamily: 'monospace',
  },
  th: {
    borderBottom: '2px solid #ccc',
    padding: '0.75rem',
    textAlign: 'left',
    backgroundColor: '#f5f5f5',
  },
  td: {
    borderBottom: '1px solid #eee',
    padding: '0.75rem',
    verticalAlign: 'top',
  },
  codeBlock: {
    backgroundColor: '#f0f0f0',
    padding: '0.5rem',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflowX: 'auto',
    maxHeight: '200px',
    fontSize: '0.9rem',
  },
  verdictBlock: {
    backgroundColor: '#fff8f8',
    padding: '0.5rem',
    whiteSpace: 'pre-wrap',
    color: '#a33',
    border: '1px solid #f3cfcf',
    overflowX: 'auto',
    maxHeight: '200px',
    fontSize: '0.9rem',
  },
};

export default Submissions;
