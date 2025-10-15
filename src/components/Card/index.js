import { Card as MuiCard, CardContent } from '@mui/material';

const Card = ({ children, className = '', sx = {} }) => {
  return (
    <MuiCard
      className={className}
      sx={{
        borderRadius: 2,       // rounded corners
        boxShadow: 1,          // default shadow
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 3 }, // hover shadow
        ...sx                  // allow custom styles via sx prop
      }}
    >
      <CardContent>
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
