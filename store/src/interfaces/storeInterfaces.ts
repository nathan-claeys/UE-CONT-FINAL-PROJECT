export interface InventoryItem {
    id: number;
    type: 'creature' | 'gadget';
    species?: string;
    name?: string;
    price: number;
  }
  
  export interface Transaction {
    id: number;
    date: string;
    user: number;
    item: InventoryItem;
    price: number; // Negative for purchase, positive for sale
  }
  