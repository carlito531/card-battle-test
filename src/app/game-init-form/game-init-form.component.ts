import { JsonPipe, NgClass } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '../model/player';
import { GameConfig } from '../model/game-config';

@Component({
  selector: 'app-game-init-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, JsonPipe],
  templateUrl: './game-init-form.component.html',
  styleUrl: './game-init-form.component.scss'
})
export class GameInitFormComponent {
  player1name = this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  player2name = this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  gameForm = this.fb.group({
    player1name: this.player1name,
    player2name: this.player2name
  })

  gameConfig: GameConfig | undefined;
  player1: Player | undefined ;
  player2: Player | undefined;
  cards: number[] = [];

  replay = input<number>();
  configCompleted = output<GameConfig>();

  constructor(private fb: NonNullableFormBuilder) {
    effect(() => {
      if (this.replay()) {
        this.gameForm.reset();
        this.gameForm.enable();
        this.cards = [];
        this.player1 = undefined;
        this.player2 = undefined;
        this.gameConfig = undefined;
      }
    });
  }

  startGame(): void {
    this.cards = Array.from({length: 52}, (_, i) => i + 1);
    this.shuffleCards(this.cards);
    this.initPlayers();
    this.gameConfig = { player1: this.player1!, player2: this.player2!, startedAt: new Date() };
    this.configCompleted.emit(this.gameConfig)
    this.gameForm.disable();
  }

  shuffleCards(cards: number[]): void {
    // Fisher–Yates (aka Knuth) Shuffle method
    let currentIndex = cards.length;
    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
    }
  }

  initPlayers() {
    this.player1 = {
      name: this.gameForm.controls['player1name'].value,
      cards: this.cards.slice(0, 26)
    }
    
    this.player2 = {
      name: this.gameForm.controls['player2name'].value,
      cards: this.cards.slice(26, 52)
    }
  }
}