import { TextField } from '@mui/material';

const Input = ({ label, error, helperText, ...props }) => {
  return (
    <TextField
      label={label}
      error={!!error}
      helperText={error || helperText}
      fullWidth
      variant="outlined"
      margin="normal"
      {...props}
    />
  );
};

export default Input;
