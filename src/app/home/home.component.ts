import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GameInitFormComponent } from "../game-init-form/game-init-form.component";
import { BattlefieldComponent } from "../battlefield/battlefield.component";
import { GameConfig } from '../model/game-config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, GameInitFormComponent, BattlefieldComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  gameConfig!: GameConfig;
  replay = 0;

  displayBattlefield($event: GameConfig) {
    this.gameConfig = $event;
  }

  updateCards($event: GameConfig) {
    this.gameConfig = { ...this.gameConfig, ...$event};
  }

  launchNewGame($event: number) {
    this.replay = $event;
  }
}
