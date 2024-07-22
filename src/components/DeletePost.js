
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const DeletePost = ({ postId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/blogPosts/${postId}`);
      navigate('/dashboard'); // Redirect to dashboard after deletion
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      Delete Post
    </Button>
  );
};

export default DeletePost;
