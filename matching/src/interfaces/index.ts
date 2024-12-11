import {MatchStatus, RoundResult, PokéchakuchonType, GadgetTarget} from "../enums";

export interface User {
  id: string;
  username: string;
}

export interface Match {
  id: string;
  creatorId: string;
  opponentId?: string;
  rounds: Round[];
  status: MatchStatus;
  winner?: string;
}

export interface Round {
  id: string;
  matchId: string;
  roundNumber: number;
  player1Pokéchakuchon: Pokéchakuchon;
  player2Pokéchakuchon: Pokéchakuchon;
  player1Gadget?: Gadget;
  player2Gadget?: Gadget;
  winnerId?: string; // ID of the winning player (optional initially)
  result?: RoundResult; // Optional if not yet resolved
}

export interface MatchHistory {
  userId: string;
  matches: Match[];
}

export interface MatchStatistics {
  userId?: string; // Optional if querying global stats
  totalMatches: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface Pokéchakuchon {
  id: number;
  name: string;
  type: PokéchakuchonType;
  power: number;
}


export interface Gadget {
  id: number;
  name: string;
  target: GadgetTarget;
  points: number;
}

