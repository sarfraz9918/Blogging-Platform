import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password || !email) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users', {
        username,
        password,
        email,
      });

      if (response.data) {
        setUser(response.data);
        navigate('/dashboard');
      } else {
        alert('Registration failed, please try again.');
      }
    } catch (error) {
      console.error('Registration error', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default Register;
