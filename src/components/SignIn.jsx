import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../assets/logo2.svg';
import sonat from '../assets/sonat.svg';

const SignIn = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await authenticateUser(registrationNumber, password);
    console.log("API Response:", response);
    
    if (response.success) {
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        console.log("User stored in localStorage:", response.user);
        if (response.user.role === 'responsable') {
          navigate('/home');
        } else if (response.user.role === 'ingenieur_terrain') {
          navigate('/home');
        } else {
          // Redirection par défaut si le rôle n'est pas reconnu
          navigate('/home');
        }
      } else {
        setError('Login successful but no user data received');
        console.error('No user data in response:', response);
      }
    } else {
      setError(response.error || 'Password or registration number incorrect');
    }
  } catch (err) {
    setError('An error occurred during login');
    console.error('Login error:', err);
  }
};

  // Mock authentication function - replace with real API call
    // Appel API réel pour l'authentification
  const authenticateUser = async (regNumber, pwd) => {
  const url = 'http://127.0.0.1:8000/myapp/auth/login/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registration_number: regNumber,
        password: pwd,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { 
        success: true, 
        user: data.user || data // Use data.user if it exists, otherwise use the entire response
      };
    } else {
      return { 
        success: false, 
        error: data.detail || data.message || 'Login failed' 
      };
    }
  } catch (err) {
    console.error('Authentication error:', err);
    return { 
      success: false, 
      error: 'Network error or server unavailable' 
    };
  }
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
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Error message positioned below inputs but above button */}
            {error && <div style={styles.error}>{error}</div>}
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
  error: {
    color: 'red',
    margin: '10px 0 15px 0', // Added more vertical spacing
    textAlign: 'center',
    fontSize: '14px',
    width: '100%',
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