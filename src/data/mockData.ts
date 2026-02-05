import { Category, Store, Product } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Groceries', icon: 'cart', color: '#43B02A' },
  { id: '2', name: 'Alcohol', icon: 'wine', color: '#722F37' },
  { id: '3', name: 'Pharmacy', icon: 'medical', color: '#E31837' },
  { id: '4', name: 'Pets', icon: 'paw', color: '#FF9500' },
  { id: '5', name: 'Electronics', icon: 'hardware-chip', color: '#007AFF' },
  { id: '6', name: 'Beauty', icon: 'flower', color: '#FF2D55' },
];

export const stores: Store[] = [
  {
    id: '1',
    name: 'Whole Foods Market',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
    deliveryTime: '30-45 min',
    deliveryFee: '$3.99',
    rating: 4.8,
    categories: ['Groceries', 'Organic'],
  },
  {
    id: '2',
    name: 'Costco',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400',
    deliveryTime: '45-60 min',
    deliveryFee: '$5.99',
    rating: 4.6,
    categories: ['Groceries', 'Bulk'],
  },
  {
    id: '3',
    name: 'Target',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    deliveryTime: '35-50 min',
    deliveryFee: '$4.99',
    rating: 4.5,
    categories: ['Groceries', 'Household'],
  },
  {
    id: '4',
    name: 'Safeway',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    deliveryTime: '25-40 min',
    deliveryFee: '$2.99',
    rating: 4.4,
    categories: ['Groceries'],
  },
  {
    id: '5',
    name: 'CVS Pharmacy',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
    deliveryTime: '20-35 min',
    deliveryFee: '$1.99',
    rating: 4.3,
    categories: ['Pharmacy', 'Beauty'],
  },
  {
    id: '6',
    name: 'PetSmart',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
    deliveryTime: '40-55 min',
    deliveryFee: '$4.99',
    rating: 4.7,
    categories: ['Pets'],
  },
];

export const products: Product[] = [
  // Whole Foods products
  {
    id: '1',
    name: 'Organic Bananas',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300',
    unit: 'bunch',
    storeId: '1',
    category: 'Fruits',
    description: 'Fresh organic bananas, perfect for smoothies or snacking.',
  },
  {
    id: '2',
    name: 'Organic Avocados',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300',
    unit: 'each',
    storeId: '1',
    category: 'Fruits',
    description: 'Ripe and ready-to-eat organic avocados.',
  },
  {
    id: '3',
    name: 'Almond Milk',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1600788907416-456578634209?w=300',
    unit: '64 oz',
    storeId: '1',
    category: 'Dairy',
    description: 'Unsweetened organic almond milk.',
  },
  {
    id: '4',
    name: 'Free Range Eggs',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300',
    unit: 'dozen',
    storeId: '1',
    category: 'Dairy',
    description: 'Farm fresh free-range eggs.',
  },
  {
    id: '5',
    name: 'Sourdough Bread',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
    unit: 'loaf',
    storeId: '1',
    category: 'Bakery',
    description: 'Freshly baked artisan sourdough bread.',
  },
  // Costco products
  {
    id: '6',
    name: 'Kirkland Water (40pk)',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300',
    unit: '40 pack',
    storeId: '2',
    category: 'Beverages',
    description: 'Purified drinking water in bulk.',
  },
  {
    id: '7',
    name: 'Rotisserie Chicken',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300',
    unit: 'each',
    storeId: '2',
    category: 'Deli',
    description: 'Hot and fresh rotisserie chicken.',
  },
  {
    id: '8',
    name: 'Mixed Berries (3lb)',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300',
    unit: '3 lb',
    storeId: '2',
    category: 'Fruits',
    description: 'Frozen mixed berries - strawberries, blueberries, raspberries.',
  },
  // Target products
  {
    id: '9',
    name: 'Good & Gather Milk',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300',
    unit: 'gallon',
    storeId: '3',
    category: 'Dairy',
    description: 'Whole milk from Target\'s Good & Gather brand.',
  },
  {
    id: '10',
    name: 'Cheerios',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=300',
    unit: '18 oz',
    storeId: '3',
    category: 'Breakfast',
    description: 'Classic Cheerios whole grain oat cereal.',
  },
  // Safeway products
  {
    id: '11',
    name: 'Ground Beef',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=300',
    unit: 'lb',
    storeId: '4',
    category: 'Meat',
    description: '85% lean ground beef.',
  },
  {
    id: '12',
    name: 'Atlantic Salmon',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=300',
    unit: 'lb',
    storeId: '4',
    category: 'Seafood',
    description: 'Fresh Atlantic salmon fillet.',
  },
  // CVS products
  {
    id: '13',
    name: 'Tylenol Extra Strength',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300',
    unit: '100 ct',
    storeId: '5',
    category: 'Medicine',
    description: 'Extra strength pain reliever.',
  },
  {
    id: '14',
    name: 'Vitamin D3',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300',
    unit: '200 ct',
    storeId: '5',
    category: 'Vitamins',
    description: 'Vitamin D3 supplements 2000 IU.',
  },
  // PetSmart products
  {
    id: '15',
    name: 'Dog Food (30lb)',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=300',
    unit: '30 lb',
    storeId: '6',
    category: 'Pet Food',
    description: 'Premium dry dog food for adult dogs.',
  },
  {
    id: '16',
    name: 'Cat Litter',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=300',
    unit: '40 lb',
    storeId: '6',
    category: 'Pet Supplies',
    description: 'Clumping cat litter with odor control.',
  },
];

export const getProductsByStore = (storeId: string): Product[] => {
  return products.filter(p => p.storeId === storeId);
};

export const getStoreById = (storeId: string): Store | undefined => {
  return stores.find(s => s.id === storeId);
};

export const getProductById = (productId: string): Product | undefined => {
  return products.find(p => p.id === productId);
};
