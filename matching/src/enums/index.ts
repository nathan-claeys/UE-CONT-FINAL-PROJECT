export enum MatchStatus {
  CREATED = "created",
  IN_PROGRESS = "in-progress",
  FINISHED = "finished",
  CANCELED = "canceled",
}

export enum RoundResult {
  PLAYER1_WIN = "player1_win",
  PLAYER2_WIN = "player2_win",
  DRAW = "draw",
}

export enum PokéchakuchonType {
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

export const typeAdvantages: Record<PokéchakuchonType, PokéchakuchonType[]> = {
  [PokéchakuchonType.NORMAL]: [],
  [PokéchakuchonType.FIRE]: [PokéchakuchonType.GRASS],
  [PokéchakuchonType.WATER]: [PokéchakuchonType.FIRE],
  [PokéchakuchonType.GRASS]: [PokéchakuchonType.WATER],
};

export const typeWeaknesses: Record<PokéchakuchonType, PokéchakuchonType[]> = {
  [PokéchakuchonType.NORMAL]: [],
  [PokéchakuchonType.FIRE]: [PokéchakuchonType.WATER],
  [PokéchakuchonType.WATER]: [PokéchakuchonType.GRASS],
  [PokéchakuchonType.GRASS]: [PokéchakuchonType.FIRE],
};