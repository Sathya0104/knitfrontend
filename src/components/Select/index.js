import { TextField, MenuItem } from '@mui/material';

const Select = ({ label, options, ...props }) => {
  return (
    <TextField
      select
      label={label}
      fullWidth
      variant="outlined"
      {...props}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
