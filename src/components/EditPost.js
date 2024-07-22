
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = ({ user }) => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', summary: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blogPosts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to edit a post.');
      return;
    }
    try {
      await axios.put(`http://localhost:3001/blogPosts/${id}`, {
        ...post,
        userId: user.id
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Edit post error', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Post
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
        Update Post
      </Button>
    </Box>
  );
};

export default EditPost;
