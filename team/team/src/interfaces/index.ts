export interface Item {
    iditem: string; 
    equiped: boolean;   
  }

export interface Creature {
    idcreature: string;
    idespece: string;
    items? : Item;
  }

export interface Team {
  n1: Creature;
  n2: Creature;
  n3: Creature;
  n4: Creature;
  n5: Creature;
}

export interface UserTeam {
    collectionCreature: Creature[];
    collectionItem: Item[];
    team: Team;
  } 