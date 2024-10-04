import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldComponent } from './battlefield.component';
import { GameConfig } from '../model/game-config';

describe('BattlefieldComponent', () => {
  let component: BattlefieldComponent;
  let fixture: ComponentFixture<BattlefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattlefieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattlefieldComponent);

    const GAMECONFIG: GameConfig = {
      startedAt: new Date(),
      player1: { name: 'player1', cards: [34,6,43,13,32,39,24,20,33,3,26,51,49,16,45,31,50,11,9,46,17,22,29,23,35,10]},
      player2: { name: 'player2', cards: [40,8,2,21,52,14,30,41,27,1,4,38,44,19,36,18,25,12,47,37,15,28,48,5,42,7]},
    }
    fixture.componentRef.setInput('gameConfig', GAMECONFIG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reveal player 1 card', () => {
    component.revealCard();
    expect(component.gameConfig().player1.cards.length).toEqual(25);
    expect(component.gameStatus.state).toEqual(1);

    component.revealCard();
    expect(component.gameConfig().player2.cards.length).toEqual(25);
    expect(component.gameStatus.state).toEqual(0);

    expect(component.player1Points).toEqual(0);
    expect(component.player2Points).toEqual(1);
  });

  it('should launch a new game and display the result at the end', () => {
    component.replay();
    expect(component.player1Points).toEqual(0);
    expect(component.player2Points).toEqual(0);
    expect(component.player1SelectedCard).toBeUndefined();
    expect(component.player2SelectedCard).toBeUndefined();
    expect(component.pointWinner).toBeUndefined();
    expect(component.gameStatus.state).toEqual(0);
  });

});
