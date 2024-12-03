import { MatchStatus, RoundResult, PokéchakuchonType } from "../enums";

export interface User {
  id: string;
  username: string;
}

export interface Match {
  id: string;
  creatorId: string;
  opponentId?: string;
  status: MatchStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Round {
  id: string;
  matchId: string;
  roundNumber: number;
  player1Choice: string; //  Pokéchakuchon ID
  player2Choice: string; // Pokéchakuchon ID
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
  id: string;
  name: string;
  type: PokéchakuchonType;
  level: number; // Level impacts stats
  stats: PokéchakuchonStats;
}

export interface PokéchakuchonStats {
  attack: number;
  defense: number;
  speed: number;
  hp: number;
}
