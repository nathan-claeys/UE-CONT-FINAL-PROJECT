import { InventoryItem, Transaction } from '../interfaces/storeInterfaces';

const mockInventory: InventoryItem[] = [
  { id: 1, type: 'creature', species: 'Bulbasaur', price: 500 },
  { id: 2, type: 'gadget', name: 'Speed Boost', price: 200 }
];

const mockTransactions: Transaction[] = [];

export const getInventory = async (type: string): Promise<InventoryItem[]> => {
  return mockInventory.filter(item => type ? item.type === type : true);
};

export const getItemDetails = async (id: string): Promise<InventoryItem | undefined> => {
  return mockInventory.find(item => item.id === parseInt(id));
};

export const processPurchase = async (userId: number, itemId: number, type: string): Promise<Transaction> => {
  const item = mockInventory.find(item => item.id === itemId);
  if (!item) throw new Error('Item not found');
  
  const transaction: Transaction = {
    id: mockTransactions.length + 1,
    date: new Date().toISOString(),
    user: userId,
    item,
    price: -item.price
  };
  
  mockTransactions.push(transaction);
  return transaction;
};

export const processSale = async (userId: number, itemId: number, type: string): Promise<Transaction> => {
  const item = mockInventory.find(item => item.id === itemId);
  if (!item) throw new Error('Item not found');
  
  const transaction: Transaction = {
    id: mockTransactions.length + 1,
    date: new Date().toISOString(),
    user: userId,
    item,
    price: item.price
  };
  
  mockTransactions.push(transaction);
  return transaction;
};

export const getUserTransactions = async (userId: number): Promise<Transaction[]> => {
  return mockTransactions.filter(tx => tx.user === userId);
};
