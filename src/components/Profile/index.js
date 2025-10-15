import { useState, useEffect } from 'react';
import { Avatar, Card, Typography, Grid, Button, Box, CircularProgress } from '@mui/material';
import { Edit2, CheckCircle, Clock, Circle } from 'lucide-react';
import Input from '../Input'; // Or use MUI TextField as Input

const Profile = ({ user, tasks, onUpdate, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  useEffect(() => {
    if (user) setFormData({ name: user.name, email: user.email });
  }, [user]);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  if (!user) return null;

  const taskStats = {
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <Box maxWidth="900px" mx="auto">
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Profile
      </Typography>

      {!isEditing ? (
        <Card variant="outlined" sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" gap={3} mb={4}>
            <Avatar
              sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
            >
              <Typography size={40} className="text-white" />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">{user.name}</Typography>
              <Typography color="text.secondary">{user.email}</Typography>
            </Box>
          </Box>

          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ p: 2, bgcolor: 'primary.light' }}>
                <Typography variant="caption" color="primary.dark">Member Since</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {new Date(user.created_at).toLocaleDateString()}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ p: 2, bgcolor: 'success.light' }}>
                <Typography variant="caption" color="success.dark">Total Tasks</Typography>
                <Typography variant="h6" fontWeight="bold">{tasks.length}</Typography>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Circle size={32} className="mx-auto textGray" />
                <Typography variant="caption" color="text.secondary">Pending</Typography>
                <Typography variant="h5" fontWeight="bold">{taskStats.pending}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
                <Clock size={32} className="mx-auto textWarning" />
                <Typography variant="caption" color="warning.dark">In Progress</Typography>
                <Typography variant="h5" fontWeight="bold">{taskStats.inProgress}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                <CheckCircle size={32} className="mx-auto textSuccess" />
                <Typography variant="caption" color="success.dark">Completed</Typography>
                <Typography variant="h5" fontWeight="bold">{taskStats.completed}</Typography>
              </Card>
            </Grid>
          </Grid>

          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<Edit2 size={20} />} 
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        </Card>
      ) : (
        <Card variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Edit Profile</Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Input
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Box display="flex" gap={2} mt={2}>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={20} /> : 'Save Changes'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ name: user.name, email: user.email });
                }}
                fullWidth
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default Profile;
