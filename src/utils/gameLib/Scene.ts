import Game from './Game';
import GameObject from './GameObject';
import { TInputEvents, TPointer } from './InputEvent';
import LoaderManagerScene from './LoaderManagerScene';
import Manager from './Manager';
import { ISceneManager } from './ScenesManager';
import Timer from './Timer';

class Input{
  private game: Game;
  private scene: Scene;
  
  constructor(game:Game, scene:Scene){
    this.game = game;
    this.scene = scene;
  }

  on(event: TInputEvents, handler: (pointer:TPointer)=>void, context?:any): string{
    const id = this.game.input.on(event, this.scene.key, handler, context);
    return id;
  }

  off(id: string){
    this.game.input.off(id);
  }
}

export default class Scene{
  private _game: Game|null = null;
  private _input: Input|null = null;
  key: string = '';
  //id: string = '';
  canvas: HTMLCanvasElement|null = null;
  ctx: CanvasRenderingContext2D|null = null;
  load = new LoaderManagerScene(this);
  add: Manager = new Manager(this);
  timer = new Timer(this);
  isActive: boolean = false;

  constructor(key?: string){
    if(key){
      this.key = key;
    }
    
  }

  get game():Game{
    return this._game!;
  }

  get input():Input{
    return this._input!;
  }

  get width():number{
    return this._game!.width;
  }

  get height():number{
    return this._game!.height;
  }

  get halfWidth():number{
    return this._game!.halfWidth;
  }

  get halfHeight():number{
    return this._game!.halfHeight;
  }

  get scene(): ISceneManager{
    return this._game!.scene;
  }

  sortByZindex(){
    //console.log('sort gameObjects');
    this.add.gameObjects.sort((a,b)=>{
      if((a as GameObject).zIndex>(b as GameObject).zIndex){
        return 1;
      }
      if((a as GameObject).zIndex<(b as GameObject).zIndex){
        return -1;
      }
      return 0;
    });
    //console.log('gameObjects = ', this.add.gameObjects);
  }

  _baseInit(game: Game, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    this._game = game;
    if(this.key.length<=0){
      this.key = Game.createId();
    }
    
    this.canvas = canvas;
    this.ctx = ctx;
    this._input = new Input(game, this);
  }

  offScene(){
    this.timer.delAll();
    this.add.removeAll();
    this.isActive = false;
  }

  init(){
    this.isActive = true;
  }

  pointerMove(pointer: TPointer){
    //console.log('pointerMove');
    this.add.gameObjects.forEach(obj=>{
      
      //console.log('obj.id = ', obj.id);
      if(obj.type==='gameobject'){
        const gameObj = (obj as GameObject);
        gameObj.onPointerMove(pointer);
      }
      // if(obj instanceof GameObject){
      //   obj.detectPoinerOut(pointer);
      // }
    });
  }

  preload(){}

  create(){}

  update(delta: number){}

  render(delat: number){
    this.timer.update(delat);
    //console.log('rizuu scenu = ', this.key);
    this.add.gameObjects.forEach(obj=>{
      // if(obj instanceof GameObject){
      //   console.log('GameObject');
      // }
      //console.log('obj.type = ', obj.type);
      obj.render();
    });
  }
}