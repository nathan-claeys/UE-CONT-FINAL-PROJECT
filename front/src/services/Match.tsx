// services/MatchService.ts
import { User } from "./Social";

export interface Round {
  roundNumber: number;
  player1Choice: string;
  player2Choice: string;
  winnerId: number;
}

export interface Match {
  id: number;
  creatorId: number;
  creator: User;
  opponentId: number;
  opponent: User;
  matchType: string;
  status: string;
  rounds: Round[];
  winner?: User;
  winnerId?: number;
}

export type Opponent = User

export const users: User[] = [
  {
    id: 1,
    name: 'Sacha du Bourg Palette',
    email: 'sacha@bourgpalette.jp',
    age: 12,
    badges: ['eau', 'feu', 'terre', 'air'],
    friends: [2, 3, 4, 5],
  },
  {
    id: 7,
    name: 'Ash Ketchum',
    email: 'ash.ketchum@pokemail.com',
    age: 15,
    badges: ['Boulder Badge', 'Cascade Badge'],
    friends: [2, 3],
  },
  {
    id: 2,
    name: 'Misty Waterflower',
    email: 'misty.waterflower@pokemail.com',
    age: 16,
    badges: ['Cascade Badge'],
    friends: [1, 4],
  },
  {
    id: 3,
    name: 'Brock Slate',
    email: 'brock.slate@pokemail.com',
    age: 17,
    badges: ['Boulder Badge'],
    friends: [1, 5],
  },
  {
    id: 4,
    name: 'Gary Oak',
    email: 'gary.oak@pokemail.com',
    age: 16,
    badges: ['Earth Badge'],
    friends: [2, 6],
  },
  {
    id: 5,
    name: 'Serena Yvonne',
    email: 'serena.yvonne@pokemail.com',
    age: 15,
    badges: ['Grass Badge', 'Sky Badge'],
    friends: [3, 6],
  },
  {
    id: 6,
    name: 'Team Rocket',
    email: 'team.rocket@pokemail.com',
    age: 25,
    badges: ['Trouble Maker Badge'],
    friends: [4, 5],
  },
];

let matches: Match[] = [
  {
    id: 1,
    creatorId: users[0].id,
    creator: users[0], // Include creator details
    opponentId: users[1].id,
    opponent: users[1], // Include opponent details
    matchType: 'ranked',
    status: 'completed',
    rounds: [
      {
        roundNumber: 1,
        player1Choice: 'Pikachu used Thunderbolt',
        player2Choice: 'Charizard used Flamethrower',
        winnerId: users[1].id,
      },
    ],
    winner: users[0],
  },
  {
    id: 2,
    creatorId: users[0].id,
    creator: users[0], // Include creator details
    opponentId: users[2].id,
    opponent: users[2], // Include opponent details
    matchType: 'casual',
    status: 'completed',
    rounds: [],
    winner: users[0],
  },
];

export const simulatePokemonRound = (user: User, opponent: Opponent, roundNumber: number): Round => {
  const pokemonMoves = ['Thunderbolt', 'Flamethrower', 'Hydro Pump', 'Solar Beam', 'Ice Beam', 'Earthquake'];
  const pokemons = ['Pikachu', 'Charizard', 'Blastoise', 'Venusaur', 'Snorlax', 'Gengar'];

  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const player1Pokemon = getRandomItem(pokemons);
  const player2Pokemon = getRandomItem(pokemons);
  const player1Move = getRandomItem(pokemonMoves);
  const player2Move = getRandomItem(pokemonMoves);
  const winner = Math.random() > 0.5 ? user.id : opponent.id;

  return {
    roundNumber,
    player1Choice: `Player 1: ${player1Pokemon} used ${player1Move}`,
    player2Choice: `Player 2: ${player2Pokemon} used ${player2Move}`,
    winnerId: winner,
  };
};

export const MatchService = {

  finishMatch: async (matchId: number): Promise<void> => {
    return;
    const response = await fetch(`/api/matches/${matchId}/finish`, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Failed to finish the match');
    }
    return;
  },

  getMatches: (): Promise<Match[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(matches), 500);
    });
  },

  createMatch: (newMatch: Omit<Match, 'id'>): Promise<Match> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const createdMatch: Match = { ...newMatch, id: (matches.length + 1) };
        matches.push(createdMatch);
        resolve(createdMatch);
      }, 500);
    });
  },

  deleteMatch: (id: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        matches = matches.filter((match) => match.id !== id);
        resolve();
      }, 500);
    });
  },

  getOpponents: (userId: number): Promise<Opponent[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find((u) => u.id === userId);
        if (user) {
          const opponents = users.filter((u) => user.friends.includes(u.id));
          resolve(opponents);
        } else {
          resolve([]); // Return an empty array if the user is not found
        }
      }, 500); // Simulate server delay
    });
  },
};

export const _MatchService = {
  // Finish a match
  finishMatch: async (matchId: number): Promise<void> => {
    const response = await fetch(`/api/matches/${matchId}/finish`, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Failed to finish the match');
    }
  },

  // Get all matches
  getMatches: async (): Promise<Match[]> => {
    const response = await fetch(`/api/matches`);
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    return response.json();
  },

  // Create a new match
  createMatch: async (newMatch: Omit<Match, 'id'>): Promise<Match> => {
    const response = await fetch(`/api/matches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMatch),
    });
    if (!response.ok) {
      throw new Error('Failed to create match');
    }
    return response.json();
  },

  // Delete a match
  deleteMatch: async (id: number): Promise<void> => {
    const response = await fetch(`/api/matches/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to delete match');
    }
  },

  // Get opponents for a user
  getOpponents: async (userId: number): Promise<Opponent[]> => {
    const response = await fetch(`/api/users/${userId}/opponents`);
    if (!response.ok) {
      throw new Error('Failed to fetch opponents');
    }
    return response.json();
  },

  // Start a match (added based on possible README requirements)
  startMatch: async (matchId: number): Promise<void> => {
    const response = await fetch(`/api/matches/${matchId}/start`, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Failed to start the match');
    }
  },

  // Update a match (added based on possible README requirements)
  updateMatch: async (matchId: number, updatedMatch: Partial<Match>): Promise<Match> => {
    const response = await fetch(`/api/matches/${matchId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMatch),
    });
    if (!response.ok) {
      throw new Error('Failed to update match');
    }
    return response.json();
  },

  // Get a single match by ID
  getMatchById: async (matchId: number): Promise<Match> => {
    const response = await fetch(`/api/matches/${matchId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch match details');
    }
    return response.json();
  },
};
