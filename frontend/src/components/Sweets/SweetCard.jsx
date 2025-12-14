import { Card, CardContent, CardMedia, Typography, Button, Chip, Box } from '@mui/material';
import { ShoppingCart, Edit, Delete } from '@mui/icons-material';
import toast from 'react-hot-toast';

const SweetCard = ({ sweet, onPurchase, onEdit, onDelete, isAdmin = false }) => {
  const handlePurchase = () => {
    if (sweet.quantity > 0) {
      onPurchase(sweet.id);
    } else {
      toast.error('This sweet is out of stock!');
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={sweet.imageUrl || 'https://source.unsplash.com/featured/?dessert,candy,sweet'}
        alt={sweet.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
          <Typography variant="h6" component="div">
            {sweet.name}
          </Typography>
          <Chip
            label={sweet.category}
            size="small"
            color="secondary"
            variant="outlined"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {sweet.description || 'Delicious sweet treat'}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
          <Typography variant="h6" color="primary">
            ${sweet.price.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: sweet.quantity > 10 ? 'success.main' : 
                     sweet.quantity > 0 ? 'warning.main' : 'error.main',
              fontWeight: 'bold'
            }}
          >
            {sweet.quantity > 0 ? `${sweet.quantity} left` : 'Out of stock'}
          </Typography>
        </Box>
      </CardContent>
      
      <Box p={2} pt={0}>
        {isAdmin ? (
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={() => onEdit(sweet)}
              fullWidth
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={() => onDelete(sweet.id)}
            >
              Delete
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}
            onClick={handlePurchase}
            disabled={sweet.quantity === 0}
            fullWidth
            sx={{
              backgroundColor: sweet.quantity === 0 ? 'gray' : '',
              '&:hover': {
                backgroundColor: sweet.quantity === 0 ? 'gray' : '',
              }
            }}
          >
            {sweet.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default SweetCard;