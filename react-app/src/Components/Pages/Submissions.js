import React from 'react';

function Submissions() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Submissions</h2>
      <p style={styles.text}>
        View your recent code submissions and their status.
      </p>
      {/* Later: Add submission history table or list */}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1rem',
    color: '#444',
  },
};

export default Submissions;
