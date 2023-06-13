import Game from './Game';

export default class GameMath{
  game: Game;
  constructor(game:Game){
    this.game = game;
  }

  between(min:number, max:number){
    return Math.floor(min+Math.random()*(max+1-min));
  }

}