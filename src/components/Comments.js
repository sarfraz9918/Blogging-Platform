
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const Comments = ({ userId, postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blogPosts/${postId}`);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!userId) {
      alert('You must be logged in to comment.');
      return;
    }

    if (newComment.trim() === '') {
      alert('Comment cannot be empty.');
      return;
    }

    const newCommentData = {
      id: Date.now(), // Generate a unique ID based on timestamp
      userId,
      comment: newComment
    };

    try {
      // Update the blog post with the new comment
      await axios.patch(`http://localhost:3001/blogPosts/${postId}`, {
        comments: [...comments, newCommentData]
      });

      // Update the comments state to reflect the new comment
      setComments([...comments, newCommentData]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Comments</Typography>
      <Box component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Typography variant="body2">
              User {comment.userId}: {comment.comment}
            </Typography>
          </li>
        ))}
      </Box>
      <TextField
        label="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddComment} variant="contained" color="primary">
        Add Comment
      </Button>
    </Box>
  );
};

export default Comments;
