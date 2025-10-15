import { useState, useEffect } from 'react';
import { IconButton, Container, Alert, Snackbar, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AuthModal from './components/AuthModal';
import Header from './components/Header';

import Profile from './components/Profile';
import TaskModal from './components/TaskModal';
import TasksList from './components/TaskList';
import './App.css'
const API_URL = 'http://localhost:3000/api';

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('tasks');
  const [authMode, setAuthMode] = useState('login');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchTasks();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        handleAuthError();
      }
    } catch (err) {
      setError('Failed to fetch profile');
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setTasks(data.tasks);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const handleAuthError = () => {
    setToken(null);
    setUser(null);
    setTasks([]);
  };

  const handleAuth = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/signup';
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setTasks([]);
  };

  const handleSaveTask = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const url = editingTask
        ? `${API_URL}/tasks/${editingTask.id}`
        : `${API_URL}/tasks`;

      const res = await fetch(url, {
        method: editingTask ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (editingTask) {
          setTasks(tasks.map((t) => (t.id === editingTask.id ? data.task : t)));
        } else {
          setTasks([data.task, ...tasks]);
        }
        setShowTaskModal(false);
        setEditingTask(null);
      } else {
        setError(data.error || 'Failed to save task');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setTasks(tasks.filter((t) => t.id !== id));
      } else {
        setError('Failed to delete task');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleUpdateProfile = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else {
        setError(data.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthModal
        authMode={authMode}
        setAuthMode={setAuthMode}
        onAuth={handleAuth}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Header
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <Container sx={{ py: 4 }}>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setError('')}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>

        {activeTab === 'tasks' ? (
          <TasksList
            tasks={tasks}
            onEdit={(task) => {
              setEditingTask(task);
              setShowTaskModal(true);
            }}
            onDelete={handleDeleteTask}
            onAddTask={() => {
              setEditingTask(null);
              setShowTaskModal(true);
            }}
          />
        ) : (
          <Profile user={user} tasks={tasks} onUpdate={handleUpdateProfile} loading={loading} />
        )}
      </Container>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        task={editingTask}
        onSave={handleSaveTask}
        loading={loading}
      />
    </Box>
  );
};

export default App;
