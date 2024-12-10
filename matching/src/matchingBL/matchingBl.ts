import {RoundResult, typeAdvantages} from "../enums";
import {Pokéchakuchon} from "../interfaces";

export function determineRoundWinner(player1Pokéchakuchon: Pokéchakuchon, player2Pokéchakuchon: Pokéchakuchon): RoundResult {
    if (typeAdvantages[player1Pokéchakuchon.type].includes(player2Pokéchakuchon.type)) {
        return RoundResult.PLAYER1_WIN;
    } else if (typeAdvantages[player2Pokéchakuchon.type].includes(player1Pokéchakuchon.type)) {
        return RoundResult.PLAYER2_WIN;
    } else {
        return RoundResult.DRAW;
    }
}