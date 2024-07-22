
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        // Set user in state or context
        setUser(user);
        navigate('/dashboard');
      } else {
        alert('Login failed, please check your credentials.');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
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
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
