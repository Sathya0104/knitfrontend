// const Badge = ({ children, variant = 'default' }) => {
//   const variants = {
//     default: 'bg-gray-100 text-gray-700',
//     success: 'bg-green-100 text-green-700',
//     warning: 'bg-yellow-100 text-yellow-700',
//     danger: 'bg-red-100 text-red-700'
//   };

//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
//       {children}
//     </span>
//   );
// };

// export default Badge;
import { Chip } from '@mui/material';

const Badge = ({ children, variant = 'default' }) => {
  // Map your custom variants to MUI color props
  const colorMap = {
    default: 'default',
    success: 'success',
    warning: 'warning',
    danger: 'error', // MUI uses "error" instead of "danger"
  };

  return (
    <Chip
      label={children}
      color={colorMap[variant] || 'default'}
      size="small"
      variant="filled"
      sx={{ fontWeight: 500 }}
    />
  );
};

export default Badge;
