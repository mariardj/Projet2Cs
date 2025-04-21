import React from 'react';
import logo2 from '../assets/logo2.svg';
import sonat from '../assets/sonat.svg';

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted');
  };

  return (
    <div style={styles.container}>
      <img src={logo2} style={styles.logo} alt="logo2" />
      
      <div style={styles.card}>
        <h2 style={styles.subtitle}>Sign in to your account</h2>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="registrationNumber" style={styles.label}>
                Registration Number
              </label>
              <input
                type="text"
                id="registrationNumber"
                style={styles.input}
                placeholder="Enter your registration number"
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" style={styles.button}>
              Log in
            </button>
          </form>
        </div>
      </div>
      <img src={sonat} style={styles.sonat} alt="sonat" />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  logo: {
    width: '20%',
    minWidth: '150px',
    marginBottom: '20px',
  },
  sonat: {
    width: '5%',
    minWidth: '50px',
    marginTop: '30px',
    padding: '10px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '35px',
    width: '45%',
    minWidth: '300px',
    maxWidth: '500px',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: '900', // Maximum boldness
    marginBottom: '15px',
    color: '#333',
    textAlign: 'left', // Left-aligned title
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  inputGroup: {
    marginBottom: '25px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
   
    color: '#000',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#FF8500',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#e67600',
  },
};

export default SignIn;