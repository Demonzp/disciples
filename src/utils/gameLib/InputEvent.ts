import Game from './Game';
import GameObject from './GameObject';
import Scene from './Scene';
import ScenesManager from './ScenesManager';

export type TInputEvents = 'pointerdown' |'pointerup' | 'pointermove' | 'pointerover';

export type TPointer = {
  event: PointerEvent,
  x:number,
  y:number
};

export interface ICallbackData {
  id: string;
  handler: (pointer:TPointer)=>void;
}

interface ICallbackDataScene extends ICallbackData{
  sceneId: string;
} 

export default class InputEvent{
  private game: Game;
  pointerDownCallbacks: ICallbackDataScene[] = [];
  pointerUpCallbacks: ICallbackDataScene[] = [];
  pointerMoveCallbacks: ICallbackDataScene[] = [];
  pointerOverCallbacks: ICallbackDataScene[] = [];

  constructor(game: Game){
    this.game = game;
    //this.game.canvas!.addEventListener('touchstart', ()=>{console.log('touchstart')});
    //this.game.canvas!.addEventListener('pointerdown', ()=>{console.log('touchstart')});
    this.game.canvas!.addEventListener('pointerdown', this.pointerDown.bind(this));
    this.game.canvas!.addEventListener('pointerup', this.pointerUp.bind(this));
    this.game.canvas!.addEventListener('pointermove', this.pointerMove.bind(this));
    
    // this.game.canvas!.addEventListener('click', ()=>console.log('click on canvas'));
    // console.log('addEventListener');
  }

  destroy(){
    //console.log('removeEventListener');
    this.game.canvas!.removeEventListener('pointerdown', this.pointerDown.bind(this));
    this.game.canvas!.removeEventListener('pointerup', this.pointerUp.bind(this));
    this.game.canvas!.removeEventListener('pointermove', this.pointerMove.bind(this));
  }

  on(event: TInputEvents, sceneId: string, handler: (pointer:TPointer)=>void, context?:any): string{
    //console.log('pointerUpCallbacks on = ', this.pointerUpCallbacks.length);
    const id = Game.createId();
    switch (event) {
      case 'pointerdown':
        this.pointerDownCallbacks.push({
          id,
          sceneId,
          handler: handler.bind(context)
        });
        break;
      case 'pointerup':
        this.pointerUpCallbacks.push({
          id,
          sceneId,
          handler: handler.bind(context)
        });
        break;
      case 'pointermove':
        this.pointerMoveCallbacks.push({
          id,
          sceneId,
          handler: handler.bind(context)
        });
        break;
      case 'pointerover':
        this.pointerOverCallbacks.push({
          id,
          sceneId,
          handler: handler.bind(context)
        });
        break;
      default:
        break;
    }

    return id;
  }

  off(id:string){
    this.pointerDownCallbacks = this.pointerDownCallbacks.filter(callFn=>callFn.id!==id);
    this.pointerUpCallbacks = this.pointerUpCallbacks.filter(callFn=>callFn.id!==id);
    this.pointerMoveCallbacks = this.pointerMoveCallbacks.filter(callFn=>callFn.id!==id);
    //console.log('pointerUpCallbacks off = ', this.pointerUpCallbacks.length);
  }

  private pointerMove(event: PointerEvent){
    const pointer = this.getPointer(event);

    // const obj = this.getObjFromScene(pointer);
    // if(obj){
    //   obj.onPointerMove(pointer);
    // }

    const activeScenes = (this.game.scene as ScenesManager).getActiveScenes();
    const sceneId = activeScenes[activeScenes.length-1].key;

    for (let i = activeScenes.length-1; i >= 0; i--) {
      const scene = activeScenes[i];
      //console.log('Objects = ', scene.add.gameObjects);
      //console.log('interactiveObjects = ', scene.add.interactiveObjects.length);
      //scene.add.interactiveObjects.length;
      for (let i = 0; i < scene.add.interactiveObjects.length; i++) {
        const obj = scene.add.interactiveObjects[i];
        //console.log('obj = ', obj.name);
        obj.onPointerMove(pointer);
      }
    }


    // const obj = this.getObjFromScene(pointer, activeScenes);
    
    // if(obj){
    //   console.log('obj = ', obj.name);
    //   obj.onPointerMove(pointer);
    // }

    this.pointerMoveCallbacks.forEach(objCallback=>{
      if(objCallback.sceneId===sceneId){
        objCallback.handler(pointer);
      }
    });

  }

  private pointerUp(event: PointerEvent){
    const pointer = this.getPointer(event);

    const activeScenes = (this.game.scene as ScenesManager).getActiveScenes();
    const obj = this.getObjFromScene(pointer, activeScenes);
    if(obj){
      obj.onPointerUp(pointer);
    }

    
    const sceneId = activeScenes[activeScenes.length-1].key;

    this.pointerUpCallbacks.forEach(objCallback=>{
      if(objCallback.sceneId===sceneId){
        objCallback.handler(pointer);
      }
    });

    // const data = (event.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    // const canvasY = data.top + window.pageYOffset;
    // const canvasX = data.left + window.pageXOffset;
    // const activeScenes = (this.game.scene as ScenesManager).getActiveScenes();
    // const pointer:TPointer = {
    //   x: event.pageX - canvasX,
    //   y: event.pageY - canvasY
    // };
    // for (let i = activeScenes.length-1; i >= 0; i--) {
    //   const scene = activeScenes[i];
    //   for (let j = 0; j < scene.add.gameObjects.length; j++) {
    //     const object = scene.add.gameObjects[j];
    //     if(object instanceof GameObject){
    //       const colligionObj = object.isOnPointer(pointer);
    //       if(colligionObj){
    //         colligionObj.onPointerUp(pointer); 
    //         return; 
    //       }
    //       //console.log('go next');
    //       if(object instanceof Container){
    //         const colligionObj = object.isOnPointer(pointer);
    //         if(colligionObj){
    //           colligionObj.onPointerUp(pointer); 
    //           return; 
    //         }
    //       }
          
    //     }
    //   }
    // }
  }

  private pointerDown(event: PointerEvent){
    //console.log('pointerDown');
    //event.preventDefault();
    const pointer = this.getPointer(event);
    const activeScenes = (this.game.scene as ScenesManager).getActiveScenes();

    const obj = this.getObjFromScene(pointer, activeScenes);
    if(obj){
      //console.log('pointerDown');
      return obj.onPointerDown(pointer);
    }

    
    const sceneId = activeScenes[activeScenes.length-1].key;

    this.pointerDownCallbacks.forEach(objCallback=>{
      if(objCallback.sceneId===sceneId){
        objCallback.handler(pointer);
      }
    });
  }

  private pointerOver(){

  }

  private getPointer(event: PointerEvent ){
    const data = (event.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    //console.log('data = ', data);
    const canvasY = data.top + window.pageYOffset;
    const canvasX = data.left + window.pageXOffset;

    return {
      event,
      x: event.pageX - canvasX,
      y: event.pageY - canvasY
    }
  }

  private getObjFromScene(point: TPointer, activeScenes: Scene[]){

    //const activeScenes = (this.game.scene as ScenesManager).getActiveScenes();

    for (let i = activeScenes.length-1; i >= 0; i--) {
      const scene = activeScenes[i];
      return scene.add.findOnPointerObject(point);
    }
  }

}