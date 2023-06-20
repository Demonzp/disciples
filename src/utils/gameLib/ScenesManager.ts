import Game from './Game';
import Scene from './Scene';

export interface ISceneManager{
  getScene: <T>(key: string)=>T;
  start: (key: string)=>void;
}

type TSceneInstans = {
  key: string,
  sceneInst: typeof Scene
}

export default class ScenesManager{
  game: Game;
  scenes: Scene[] = [];
  _registeredScenes: TSceneInstans[] = [];

  constructor(game: Game){
    this.game  = game;
  }

  init(scenes:typeof Scene[]):void{
    scenes.forEach((ItemScene)=>{
      const newScene = new ItemScene();
      newScene._baseInit(this.game, this.game.canvas!, this.game.ctx!);
      this._registeredScenes.push({
        key: newScene.key,
        sceneInst: ItemScene
      });
      this.scenes.push(newScene);
    });
    this.scenes[0].init();
    this.scenes[0].preload();
  }

  initFirstScene():void{
    this.scenes[0].init();
    this.scenes[0].create(); 
  }

  getScene<T>(key: string):T{
    return this.scenes.find(scene=>scene.key===key) as T;
  }

  getActiveScenes(){
    return this.scenes.filter(scene=>scene.isActive);
  }

  setStopAllScenes(){
    this.scenes.forEach(scene=>scene.offScene());
    this.game.clearCanvas();
  }

  start(key: string):void{
    const scene = this.getScene<Scene>(key);
    //console.log('start = ', key);
    if(scene){
      this.setStopAllScenes();
      //console.log('scene.key = ', scene.key);
      this.scenes = this.scenes.filter(s=>s.key!==key);
      for (let i = 0; i < this._registeredScenes.length; i++) {
        if(this._registeredScenes[i].key===key){
          const ItemScene = this._registeredScenes[i].sceneInst;
          const newScene = new ItemScene();
          newScene._baseInit(this.game, this.game.canvas!, this.game.ctx!);
          newScene.create();
          newScene.init();
          this.scenes.push(newScene);
          break;
        }
      }
      //scene.create();
      //scene.init();
    }else{
      throw new Error(`Scene by key "${key}" not found!`);
    }
  }

  update(delta: number):void{
    this.scenes.forEach(scene=>{
      if(scene.isActive){
        //const t0 = Date.now();
        scene.update(delta);
        //const t1 = Date.now()-t0;
        //console.log('logicTime = ',  t1/1000);
        //const t2 = Date.now();
        scene.render(delta);
        //const t3 = Date.now()-t2;
        //console.log('renderTime = ',  t3/1000);
      }
    });
  }
}