export interface Item {
    iditem: string; 
    name: string;   
  }

export interface Creature {
    idcreature: string;
    idespece: string;
    items? : Item;
  }

export interface UserTeam {
    collectionCreature: Creature[];
    collectionFreeItem: Item[]; // items non équipés
    team: Creature[];
  } 