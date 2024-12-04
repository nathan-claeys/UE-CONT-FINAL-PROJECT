export interface Pokemon {
  id: number;            
  name: string;                  
  type: PokemonType;     
  power: number;         
}

export enum PokemonType {
  NORMAL = "normal",
  FIRE = "fire",
  WATER = "water",
  GRASS = "grass",
}

export enum GadgetTarget {
  MY_ATTACK = "MY_ATTACK",
  OPPONENT_ATTACK = "OPPONENT_ATTACK",
  TYPE_IMPACT = "TYPE_IMPACT",
  CREDIT = "CREDIT",
}
  

export interface Gadget {
  id: number;            
  name: string;  
  target: GadgetTarget;  
  points: number;             
}
  