import { Pokemon, PokemonType, GadgetTarget, Gadget, Transaction } from '../interfaces/storeInterfaces';

const mockInventory: (Pokemon | Gadget)[] = [
  { id: '1', name: 'Pikachu', cost: 500, type: PokemonType.NORMAL, power: 50 },
  { id: '2', name: 'Healing Potion', cost: 200, power: { target: GadgetTarget.MY_ATTACK, points: 20 } },
];

const mockTransactions: Transaction[] = [];

export const getInventory = async (): Promise<(Pokemon | Gadget)[]> => {
  return mockInventory;
};

export const getItemDetails = async (id: string): Promise<Pokemon | Gadget | undefined> => {
  return mockInventory.find(item => item.id === id);
};

export const processPurchase = async (userId: string, itemId: string, type: string): Promise<Transaction> => {
  const item = mockInventory.find((item) => item.id === itemId);
  if (!item) throw new Error('Item not found');

  const transaction: Transaction = {
    id: `${mockTransactions.length + 1}`,
    date: new Date().toISOString(),
    user: userId,
    item,
    price: -item.cost,
  };

  mockTransactions.push(transaction);
  return transaction;
};

export const processSale = async (userId: string, itemId: string, type: string): Promise<Transaction> => {
  const item = mockInventory.find((item) => item.id === itemId);
  if (!item) throw new Error('Item not found');

  const transaction: Transaction = {
    id: `${mockTransactions.length + 1}`,
    date: new Date().toISOString(),
    user: userId,
    item,
    price: item.cost,
  };

  mockTransactions.push(transaction);
  return transaction;
};

export const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
  return mockTransactions.filter((tx) => tx.user === userId);
};
