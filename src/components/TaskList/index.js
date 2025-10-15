import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';
import { AddCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import TaskCard from '../TaskCard';

const TasksList = ({ tasks, onEdit, onDelete, onAddTask }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            My Tasks
          </Typography>
          <Typography color="text.secondary" mt={0.5}>
            {tasks.length} total tasks
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={onAddTask}
        >
          Add Task
        </Button>
      </Box>

      {/* Search & Filter */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        </CardContent>
      </Card>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <Card variant="outlined" sx={{ py: 8, textAlign: 'center' }}>
          <RadioButtonUnchecked sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
          <Typography variant="h6" fontWeight="medium" mb={1}>
            {searchTerm || statusFilter !== 'all' ? 'No tasks found' : 'No tasks yet'}
          </Typography>
          <Typography color="text.secondary">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Create your first task to get started!'}
          </Typography>
        </Card>
      ) : (
        <Stack spacing={2}>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TasksList;
