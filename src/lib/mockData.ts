// Mock data for the ExpenseTrack Pro demo application

export interface Shop {
  id: string;
  name: string;
  address: string;
  phone: string;
  tags: string[];
  latitude: number;
  longitude: number;
  totalBills: number;
  totalSpent: number;
  lastVisit: string;
  rating: number;
  isArchived: boolean;
}

export interface Bill {
  id: string;
  shopId: string;
  shopName: string;
  date: string;
  totalAmount: number;
  discount: number;
  tax: number;
  itemCount: number;
  notes?: string;
}

export interface BillItem {
  id: string;
  billId: string;
  itemName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXCEEDED' | 'COMPLETED' | 'INACTIVE';
}

export interface Warranty {
  id: string;
  itemName: string;
  purchaseDate: string;
  expiryDate: string;
  provider: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CLAIMED';
  daysLeft: number;
  documents?: {
    name: string;
    url: string;
    type: 'pdf' | 'image';
    size: string;
  }[];
}

export interface PriceHistory {
  date: string;
  shop: string;
  price: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  type: 'BILL' | 'SHOP' | 'RECEIPT';
  title: string;
  date: string;
  shopName?: string;
}

export const shops: Shop[] = [
  { id: '1', name: 'FreshMart', address: '123 Main St', phone: '555-0101', tags: ['Grocery', 'Organic'], latitude: 40.7128, longitude: -74.006, totalBills: 24, totalSpent: 1250.50, lastVisit: '2024-01-15', rating: 4.5, isArchived: false },
  { id: '2', name: 'MegaStore', address: '456 Oak Ave', phone: '555-0102', tags: ['Wholesale', 'Bulk'], latitude: 40.7589, longitude: -73.9851, totalBills: 18, totalSpent: 2100.00, lastVisit: '2024-01-12', rating: 4.2, isArchived: false },
  { id: '3', name: 'LocalGreens', address: '789 Pine Rd', phone: '555-0103', tags: ['Organic', 'Farm'], latitude: 40.7282, longitude: -73.7949, totalBills: 32, totalSpent: 890.25, lastVisit: '2024-01-18', rating: 4.8, isArchived: false },
  { id: '4', name: 'QuickShop', address: '321 Elm St', phone: '555-0104', tags: ['Convenience'], latitude: 40.7489, longitude: -73.9680, totalBills: 45, totalSpent: 650.75, lastVisit: '2024-01-19', rating: 3.9, isArchived: false },
  { id: '5', name: 'ValueMart', address: '654 Maple Dr', phone: '555-0105', tags: ['Budget', 'Grocery'], latitude: 40.7614, longitude: -73.9776, totalBills: 12, totalSpent: 1800.00, lastVisit: '2024-01-10', rating: 4.0, isArchived: false },
  { id: '6', name: 'OrganicBites', address: '987 Cedar Ln', phone: '555-0106', tags: ['Organic', 'Premium'], latitude: 40.7831, longitude: -73.9712, totalBills: 8, totalSpent: 520.00, lastVisit: '2024-01-08', rating: 4.7, isArchived: true },
];

export const bills: Bill[] = [
  { id: 'b1', shopId: '1', shopName: 'FreshMart', date: '2024-01-15', totalAmount: 85.50, discount: 5.00, tax: 6.84, itemCount: 12, notes: 'Weekly groceries' },
  { id: 'b2', shopId: '2', shopName: 'MegaStore', date: '2024-01-12', totalAmount: 210.00, discount: 15.00, tax: 15.60, itemCount: 28, notes: 'Monthly bulk buy' },
  { id: 'b3', shopId: '3', shopName: 'LocalGreens', date: '2024-01-18', totalAmount: 42.75, discount: 0, tax: 3.42, itemCount: 8, notes: 'Fresh produce' },
  { id: 'b4', shopId: '1', shopName: 'FreshMart', date: '2024-01-10', totalAmount: 63.20, discount: 3.00, tax: 4.82, itemCount: 9 },
  { id: 'b5', shopId: '4', shopName: 'QuickShop', date: '2024-01-19', totalAmount: 28.50, discount: 0, tax: 2.28, itemCount: 5, notes: 'Emergency items' },
  { id: 'b6', shopId: '5', shopName: 'ValueMart', date: '2024-01-10', totalAmount: 156.00, discount: 10.00, tax: 11.68, itemCount: 20 },
  { id: 'b7', shopId: '3', shopName: 'LocalGreens', date: '2024-01-05', totalAmount: 38.90, discount: 2.00, tax: 2.95, itemCount: 7 },
  { id: 'b8', shopId: '2', shopName: 'MegaStore', date: '2024-01-02', totalAmount: 175.50, discount: 20.00, tax: 12.44, itemCount: 22 },
];

export const billItems: BillItem[] = [
  { id: 'bi1', billId: 'b1', itemName: 'Organic Milk', category: 'Dairy', quantity: 2, unitPrice: 4.50, discount: 0, totalPrice: 9.00 },
  { id: 'bi2', billId: 'b1', itemName: 'Whole Wheat Bread', category: 'Bakery', quantity: 1, unitPrice: 3.99, discount: 0, totalPrice: 3.99 },
  { id: 'bi3', billId: 'b1', itemName: 'Free Range Eggs', category: 'Dairy', quantity: 1, unitPrice: 6.50, discount: 1.00, totalPrice: 5.50 },
  { id: 'bi4', billId: 'b1', itemName: 'Bananas', category: 'Fruits', quantity: 3, unitPrice: 1.20, discount: 0, totalPrice: 3.60 },
  { id: 'bi5', billId: 'b1', itemName: 'Chicken Breast', category: 'Meat', quantity: 2, unitPrice: 8.99, discount: 0, totalPrice: 17.98 },
  { id: 'bi6', billId: 'b2', itemName: 'Rice (5kg)', category: 'Grains', quantity: 1, unitPrice: 12.99, discount: 2.00, totalPrice: 10.99 },
  { id: 'bi7', billId: 'b2', itemName: 'Pasta (1kg)', category: 'Grains', quantity: 3, unitPrice: 2.50, discount: 0, totalPrice: 7.50 },
  { id: 'bi8', billId: 'b3', itemName: 'Kale Bundle', category: 'Vegetables', quantity: 2, unitPrice: 4.25, discount: 0, totalPrice: 8.50 },
  { id: 'bi9', billId: 'b3', itemName: 'Avocados', category: 'Fruits', quantity: 4, unitPrice: 2.50, discount: 0, totalPrice: 10.00 },
  { id: 'bi10', billId: 'b3', itemName: 'Cherry Tomatoes', category: 'Vegetables', quantity: 2, unitPrice: 3.75, discount: 0, totalPrice: 7.50 },
];

export const budgets: Budget[] = [
  { id: 'bg1', name: 'Monthly Groceries', amount: 500, spent: 342.50, startDate: '2024-01-01', endDate: '2024-01-31', status: 'ACTIVE' },
  { id: 'bg2', name: 'Q1 Household', amount: 1500, spent: 1250.00, startDate: '2024-01-01', endDate: '2024-03-31', status: 'ACTIVE' },
  { id: 'bg3', name: 'Holiday Season', amount: 800, spent: 820.00, startDate: '2023-12-01', endDate: '2023-12-31', status: 'EXCEEDED' },
  { id: 'bg4', name: 'Weekly Essentials', amount: 150, spent: 120.00, startDate: '2024-01-15', endDate: '2024-01-21', status: 'ACTIVE' },
  { id: 'bg5', name: '2023 Year-End', amount: 2000, spent: 1850.00, startDate: '2023-01-01', endDate: '2023-12-31', status: 'COMPLETED' },
];

export const warranties: Warranty[] = [
  { 
    id: 'w1', 
    itemName: 'Kitchen Blender', 
    purchaseDate: '2023-06-15', 
    expiryDate: '2025-06-15', 
    provider: 'BlendTech', 
    status: 'ACTIVE', 
    daysLeft: 513,
    documents: [
      { name: 'Warranty_Certificate.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'pdf', size: '2.4 MB' },
      { name: 'Purchase_Receipt.jpg', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', type: 'image', size: '1.1 MB' },
    ]
  },
  { 
    id: 'w2', 
    itemName: 'Coffee Machine', 
    purchaseDate: '2023-09-01', 
    expiryDate: '2024-09-01', 
    provider: 'BrewMaster', 
    status: 'ACTIVE', 
    daysLeft: 256,
    documents: [
      { name: 'Warranty_Certificate.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'pdf', size: '1.8 MB' },
    ]
  },
  { 
    id: 'w3', 
    itemName: 'Air Fryer', 
    purchaseDate: '2022-12-25', 
    expiryDate: '2024-02-25', 
    provider: 'CrispAir', 
    status: 'ACTIVE', 
    daysLeft: 37,
    documents: [
      { name: 'Warranty_Certificate.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'pdf', size: '2.1 MB' },
      { name: 'Product_Image.jpg', url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800', type: 'image', size: '890 KB' },
    ]
  },
  { 
    id: 'w4', 
    itemName: 'Toaster Oven', 
    purchaseDate: '2022-01-10', 
    expiryDate: '2023-01-10', 
    provider: 'HeatWave', 
    status: 'EXPIRED', 
    daysLeft: 0,
    documents: [
      { name: 'Warranty_Certificate.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'pdf', size: '1.5 MB' },
    ]
  },
  { 
    id: 'w5', 
    itemName: 'Food Processor', 
    purchaseDate: '2023-11-20', 
    expiryDate: '2025-11-20', 
    provider: 'ChopMaster', 
    status: 'ACTIVE', 
    daysLeft: 670,
    documents: [
      { name: 'Warranty_Certificate.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'pdf', size: '2.8 MB' },
      { name: 'Purchase_Receipt.jpg', url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800', type: 'image', size: '1.3 MB' },
    ]
  },
];

export const priceHistory: PriceHistory[] = [
  { date: '2024-01-01', shop: 'FreshMart', price: 4.50 },
  { date: '2024-01-05', shop: 'MegaStore', price: 4.25 },
  { date: '2024-01-08', shop: 'LocalGreens', price: 4.75 },
  { date: '2024-01-10', shop: 'FreshMart', price: 4.50 },
  { date: '2024-01-12', shop: 'ValueMart', price: 3.99 },
  { date: '2024-01-15', shop: 'FreshMart', price: 4.60 },
  { date: '2024-01-15', shop: 'MegaStore', price: 4.30 },
  { date: '2024-01-18', shop: 'LocalGreens', price: 4.85 },
  { date: '2024-01-19', shop: 'QuickShop', price: 5.10 },
  { date: '2024-01-20', shop: 'FreshMart', price: 4.55 },
  { date: '2024-01-22', shop: 'MegaStore', price: 4.20 },
  { date: '2024-01-25', shop: 'LocalGreens', price: 4.90 },
];

export const monthlyExpenses = [
  { month: 'Aug', amount: 420 },
  { month: 'Sep', amount: 380 },
  { month: 'Oct', amount: 510 },
  { month: 'Nov', amount: 460 },
  { month: 'Dec', amount: 620 },
  { month: 'Jan', amount: 342 },
];

export const categoryBreakdown = [
  { name: 'Fruits & Vegetables', value: 28, color: '#10b981' },
  { name: 'Dairy', value: 22, color: '#3b82f6' },
  { name: 'Meat & Fish', value: 18, color: '#ef4444' },
  { name: 'Grains & Cereals', value: 15, color: '#f59e0b' },
  { name: 'Snacks', value: 10, color: '#8b5cf6' },
  { name: 'Beverages', value: 7, color: '#06b6d4' },
];

export const galleryImages: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop', type: 'SHOP', title: 'FreshMart Store', date: '2024-01-15', shopName: 'FreshMart' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=500&fit=crop', type: 'BILL', title: 'January Bill #1', date: '2024-01-12' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=350&fit=crop', type: 'SHOP', title: 'LocalGreens Interior', date: '2024-01-18', shopName: 'LocalGreens' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=400&fit=crop', type: 'RECEIPT', title: 'MegaStore Receipt', date: '2024-01-10' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=300&fit=crop', type: 'SHOP', title: 'ValueMart Entrance', date: '2024-01-08', shopName: 'ValueMart' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=450&fit=crop', type: 'BILL', title: 'Bulk Purchase Bill', date: '2024-01-05' },
];

export const tags = [
  { id: 't1', name: 'Grocery', color: '#10b981' },
  { id: 't2', name: 'Organic', color: '#84cc16' },
  { id: 't3', name: 'Wholesale', color: '#3b82f6' },
  { id: 't4', name: 'Bulk', color: '#6366f1' },
  { id: 't5', name: 'Convenience', color: '#f59e0b' },
  { id: 't6', name: 'Budget', color: '#ef4444' },
  { id: 't7', name: 'Premium', color: '#8b5cf6' },
  { id: 't8', name: 'Farm', color: '#14b8a6' },
];

export const categories = [
  { id: 'c1', name: 'Fruits & Vegetables', itemCount: 45, icon: '🥬' },
  { id: 'c2', name: 'Dairy & Eggs', itemCount: 28, icon: '🥛' },
  { id: 'c3', name: 'Meat & Fish', itemCount: 32, icon: '🥩' },
  { id: 'c4', name: 'Grains & Cereals', itemCount: 24, icon: '🌾' },
  { id: 'c5', name: 'Snacks & Sweets', itemCount: 38, icon: '🍪' },
  { id: 'c6', name: 'Beverages', itemCount: 19, icon: '🥤' },
  { id: 'c7', name: 'Frozen Foods', itemCount: 15, icon: '🧊' },
  { id: 'c8', name: 'Condiments', itemCount: 22, icon: '🧂' },
];
