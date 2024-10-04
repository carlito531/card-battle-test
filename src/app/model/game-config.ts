import { Player } from "./player";

export interface GameConfig {
    startedAt: Date;
    player1: Player;
    player2: Player;
}
