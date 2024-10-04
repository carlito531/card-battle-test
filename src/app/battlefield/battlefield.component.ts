import { Component, computed, effect, input, output } from '@angular/core';
import { GameStatus } from '../model/game-status';
import { GameConfig } from '../model/game-config';
import { Player } from '../model/player';

@Component({
  selector: 'app-battlefield',
  standalone: true,
  imports: [],
  templateUrl: './battlefield.component.html',
  styleUrl: './battlefield.component.scss'
})
export class BattlefieldComponent {
  gameConfig = input.required<GameConfig>();
  emptyDeck = computed(() => this.gameConfig()?.player1.cards.length + this.gameConfig()?.player2.cards.length === 0);
  
  updatedCards = output<GameConfig>();
  replayRequested = output<number>();
  
  gameStatus: GameStatus = { state: 0 }

  player1SelectedCard: number | undefined;
  player2SelectedCard: number | undefined;

  player1Points = 0;
  player2Points = 0;

  count = 0;

  pointWinner: Player | undefined;
  winnerName: string | undefined;

  constructor() {
    effect(() => {
      if (this.emptyDeck()) {
        this.winnerName = this.player1Points === this.player2Points ? 'Egalité !' : 
          this.player1Points > this.player2Points ? this.gameConfig().player1.name + ' (' + this.player1Points + ' points)' : 
          this.gameConfig().player2.name + ' (' + this.player2Points + ' points)';
          this.count++;
      }
    });
  }

  resetParams(): void {
    this.player1Points = 0;
    this.player2Points = 0;
    this.player1SelectedCard = undefined;
    this.player2SelectedCard = undefined;
    this.pointWinner = undefined;
    this.winnerName = undefined;
    this.gameStatus = { state : 0 };
  }

  revealCard(): void {
    if (this.gameStatus.state === 0) {
      this.player1SelectedCard = this.gameConfig()?.player1.cards.shift();
      this.gameStatus.state = 1;
    
    } else {
      this.player2SelectedCard = this.gameConfig()?.player2.cards.shift();
      if (this.player1SelectedCard && this.player2SelectedCard && this.player1SelectedCard > this.player2SelectedCard) {
        this.player1Points++;
        this.pointWinner = this.gameConfig()?.player1;
      } else {
        this.player2Points++;
        this.pointWinner = this.gameConfig()?.player2;
      }

      this.gameStatus.state = 0;
      
      setTimeout(() => {
        this.pointWinner = undefined;
        this.player1SelectedCard = undefined;
        this.player2SelectedCard = undefined;
      }, 1200);

      this.updatedCards.emit(this.gameConfig());
    }
  }

  replay() {
    this.replayRequested.emit(this.count);
    this.resetParams();
  }
}
