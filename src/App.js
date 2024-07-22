import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreatePost user={user} /> : <Navigate to="/login" />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={user ? <EditPost user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
