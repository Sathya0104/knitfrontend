import { Button as MuiButton } from '@mui/material';

const Button = ({ children, onClick, variant = 'primary', size = 'md', disabled, className = '', type = 'button' }) => {
  // Map your custom variants to MUI props
  const variantMap = {
    primary: 'contained',
    secondary: 'outlined',
    danger: 'contained',
    outline: 'outlined',
    ghost: 'text',
  };

  const colorMap = {
    primary: 'primary',
    secondary: 'secondary',
    danger: 'error',
    outline: 'primary',
    ghost: 'inherit',
  };

  const sizeMap = {
    sm: 'small',
    md: 'medium',
    lg: 'large',
  };

  return (
    <MuiButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variantMap[variant] || 'contained'}
      color={colorMap[variant] || 'primary'}
      size={sizeMap[size] || 'medium'}
      className={className}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
