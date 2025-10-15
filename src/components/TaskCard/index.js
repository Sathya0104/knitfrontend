import { Card, CardContent, Typography, Chip, IconButton, Box } from '@mui/material';
import { Edit, Delete, CheckCircle, AccessTime, RadioButtonUnchecked } from '@mui/icons-material';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusProps = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'success', icon: <CheckCircle fontSize="small" /> };
      case 'in-progress':
        return { color: 'warning', icon: <AccessTime fontSize="small" /> };
      default:
        return { color: 'default', icon: <RadioButtonUnchecked fontSize="small" /> };
    }
  };

  const statusProps = getStatusProps(task.status);

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h6">{task.title}</Typography>
            <Chip
              label={task.status}
              color={statusProps.color}
              icon={statusProps.icon}
              size="small"
            />
          </Box>
          {task.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {task.description}
            </Typography>
          )}
          <Typography variant="caption" color="text.disabled">
            Created {new Date(task.created_at).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
          <IconButton color="primary" onClick={() => onEdit(task)} title="Edit task">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(task.id)} title="Delete task">
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
