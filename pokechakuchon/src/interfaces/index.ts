export interface Pokemon {
    id: string;            
    name: string;          
    cost: number;          
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
  
export interface GadgetPower {
target: GadgetTarget;  
points: number;       
}

export interface Gadget {
id: string;            
name: string;          
cost: number;          
power: GadgetPower;    
}
  