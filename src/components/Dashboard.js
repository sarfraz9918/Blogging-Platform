import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/blogPosts');
        const allPosts = response.data;
        // Filter posts based on user ID
        const userPosts = allPosts.filter(post => post.userId === user.id);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    if (user) {
      fetchPosts();
    }
  }, [user]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/blogPosts/${id}`);
      // Remove the deleted post from the local state
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      {posts.map((post) => (
        <Box key={post.id} sx={{ mb: 2 }}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body1">{post.summary}</Typography>
          <Button component={Link} to={`/posts/${post.id}`} sx={{ mt: 1 }}>View Details</Button>
          {user && user.id === post.userId && (
            <Box sx={{ mt: 1 }}>
              <Button component={Link} to={`/edit/${post.id}`} sx={{ mr: 1 }}>Edit</Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Dashboard;
