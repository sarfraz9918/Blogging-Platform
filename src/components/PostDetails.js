
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box, Button, TextField } from '@mui/material';
import DeletePost from './DeletePost';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blogPosts/${id}`);
        setPost(response.data);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error('Error fetching post details', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (!comment) return;

    try {
      const newComment = {
        id: comments.length + 1, // simple id generation
        userId: 1, // replace with actual user id
        comment
      };

      const updatedPost = {
        ...post,
        comments: [...comments, newComment]
      };

      await axios.put(`http://localhost:3001/blogPosts/${id}`, updatedPost);
      setComments([...comments, newComment]);
      setComment('');
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>{post.title}</Typography>
      <Typography variant="body1" paragraph>{post.content}</Typography>
      <Typography variant="h6" gutterBottom>Comments</Typography>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Box key={comment.id} sx={{ mb: 2 }}>
            <Typography variant="body2">{comment.comment}</Typography>
          </Box>
        ))
      ) : (
        <Typography>No comments yet.</Typography>
      )}
      <TextField
        label="Add a comment"
        value={comment}
        onChange={handleCommentChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddComment}>Add Comment</Button>
      <Box sx={{ mt: 2 }}>
        <Button component={Link} to="/dashboard">Back to Dashboard</Button>
        <DeletePost postId={post.id} />
      </Box>
    </Box>
  );
};

export default PostDetails;
