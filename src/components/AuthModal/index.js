import { useState } from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';

const AuthModal = ({ authMode, setAuthMode, onAuth, loading, error }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card sx={{ maxWidth: 400, width: '100%', p: 3 }}>
        <CardContent>
          <div className="text-center mb-3">
            <div className="d-flex justify-content-center align-items-center mx-auto mb-3 rounded-circle bg-primary" style={{ width: 64, height: 64 }}>
              <User size={32} className="text-white" />
            </div>
            <Typography variant="h5" component="h1" gutterBottom>
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {authMode === 'login' ? 'Sign in to continue' : 'Join us today'}
            </Typography>
          </div>

          {error && <Alert severity="error" className="mb-3">{error}</Alert>}

          <form className="d-flex flex-column gap-3">
            {authMode === 'signup' && (
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            )}

            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => onAuth(formData)}
              disabled={loading}
            >
              {loading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center mt-3">
            <Typography variant="body2" display="inline">
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            </Typography>
            <Button color="secondary" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;
