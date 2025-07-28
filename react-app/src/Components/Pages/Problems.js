import React from 'react';

function Problems() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Problems</h2>
      <p style={styles.text}>
        Browse through the list of coding problems and test your skills!
      </p>
      {/* Later: Map over problem list here */}
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

export default Problems;
