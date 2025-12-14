import { useState } from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import SweetCard from './SweetCard';

const SweetList = ({ sweets, onPurchase, onEdit, onDelete, isAdmin = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories
  const categories = [...new Set(sweets.map(sweet => sweet.category))];

  // Filter and sort sweets
  const filteredSweets = sweets
    .filter(sweet => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sweet.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || sweet.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'quantity':
          return b.quantity - a.quantity;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (sweets.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h6" color="textSecondary">
          No sweets available. {isAdmin && 'Add some sweets to get started!'}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search sweets..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
          }}
        />
        
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="name">Name (A-Z)</MenuItem>
            <MenuItem value="price-low">Price (Low to High)</MenuItem>
            <MenuItem value="price-high">Price (High to Low)</MenuItem>
            <MenuItem value="quantity">Quantity Available</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredSweets.map(sweet => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={sweet.id}>
            <SweetCard
              sweet={sweet}
              onPurchase={onPurchase}
              onEdit={onEdit}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SweetList;