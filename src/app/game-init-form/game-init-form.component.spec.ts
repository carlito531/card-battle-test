import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInitFormComponent } from './game-init-form.component';

describe('GameInitFormComponent', () => {
  let component: GameInitFormComponent;
  let fixture: ComponentFixture<GameInitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameInitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameInitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error when fields are not validated', () => {
    const nativeElement = fixture.nativeElement;
    const player1nameInput = nativeElement.querySelector('#player1')
    player1nameInput.value = 'player 1';
    player1nameInput.dispatchEvent(new Event('input'));
    player1nameInput.value = '';
    player1nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const player1RequiredError = nativeElement.querySelector('#player1-required-error');
    expect(player1RequiredError).withContext('You should have an error if the player1 name field is required and dirty').not.toBeNull();
    expect(player1RequiredError.textContent).withContext('The error message for the player1 name field is incorrect').toContain('Le nom du joueur 1 est requis');

    player1nameInput.value = 'pl';
    player1nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const player1minLengthError = nativeElement.querySelector('#player1-minlength-error');
    expect(player1minLengthError).withContext('You should have an error if the player1 name field is too short').not.toBeNull();
    expect(player1minLengthError.textContent).withContext('The error message for the player1 name field is incorrect').toContain('Veuillez saisir 3 caractères au minimum');

    player1nameInput.value = 'playyyyyyyyyyyyyyyyyyyyyyyyyyyer1';
    player1nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const player1maxLengthError = nativeElement.querySelector('#player1-maxlength-error');
    expect(player1maxLengthError).withContext('You should have an error if the player1 name field is too long').not.toBeNull();
    expect(player1maxLengthError.textContent).withContext('The error message for the player1 name field is incorrect').toContain('Veullez saisir au maximum 20 caractères');
  
  });

  it('should create a game', () => {
    component.player1name.setValue('Player1');
    component.player2name.setValue('Player2');
    component.startGame();

    expect(component.cards.length).toEqual(52);
    expect(component.player1?.name).toEqual('Player1');
    expect(component.player1?.cards.length).toEqual(26);
    expect(component.player2?.name).toEqual('Player2');
    expect(component.player2?.cards.length).toEqual(26);
  });

  it('should reset game', () => {
    fixture.componentRef.setInput('replay', 1);
    fixture.detectChanges();

    expect(component.cards.length).toEqual(0);
    expect(component.player1).toBeUndefined();
    expect(component.player2).toBeUndefined();
    expect(component.gameConfig).toBeUndefined();
    expect(component.player1name.value).toEqual('');
    expect(component.player2name.value).toEqual('');
  });

});
