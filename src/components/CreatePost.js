
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ user }) => {
  const [post, setPost] = useState({
    title: '',
    summary: '',
    content: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to create a post.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/blogPosts', {
        ...post,
        userId: user.id
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Create post error', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Post
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={post.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Summary"
        name="summary"
        value={post.summary}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        name="content"
        value={post.content}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Create Post
      </Button>
    </Box>
  );
};

export default CreatePost;
