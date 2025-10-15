import { AppBar, Toolbar, Typography, Button, Tabs, Tab, Box, IconButton } from '@mui/material';
import { CheckCircle, LogOut } from 'lucide-react';

const Header = ({ user, activeTab, setActiveTab, onLogout }) => {
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <AppBar position="sticky" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: '1200px', mx: 'auto', width: '100%' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: 'primary.main', 
              borderRadius: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <CheckCircle size={24} className="text-white" />
          </Box>
          <Typography variant="h6" component="h1">
            TaskFlow
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            textColor="primary" 
            indicatorColor="primary" 
            sx={{ minHeight: 'auto' }}
          >
            <Tab label="Tasks" value="tasks" />
            <Tab label="Profile" value="profile" />
          </Tabs>

          <Button 
            variant="contained" 
            color="error" 
            startIcon={<LogOut size={18} />} 
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
