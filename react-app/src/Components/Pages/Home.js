import React from 'react';

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Online Judge</h1>
      <p style={styles.text}>
        Practice coding problems, view your submissions, and improve your skills.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  heading: {
    color: '#282c34',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.2rem',
    color: '#555',
  },
};

export default Home;
