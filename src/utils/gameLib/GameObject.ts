import Container from './Container';
import Game, { TGameObjectType, TPoint } from './Game';
import { ICallbackData, TPointer } from './InputEvent';
import Scene from './Scene';

export type TGameObjectEvents = 'pointerdown'|'pointerup'|'pointermove'|'pointerover'|'pointerout';

export type TBodyRect = {
  width: number,
  height: number,
  halfWidth: number,
  halfHeight: number,
  x:number,
  y:number
};

export type TGameObjectNames = 'Sprite'|'Container'|'Text'|'VirtualRectangle';
export type TParetGameObject = Scene | Container;

export default class GameObject{
  scene: Scene;
  name: TGameObjectNames;
  key: string;
  type: TGameObjectType = 'gameobject';
  uid: string;
  pi = Math.PI/180;
  private _x: number;
  private _y: number;
  private _halfWidth: number;
  private _halfHeight: number;
  private _alpha = 1;
  zIndex: number = 0;
  center: TPoint;
  private _width: number;
  private _height: number;
  initWidth = 0;
  initHeight = 0;
  private _interactiveBodyRect: TBodyRect;
  private _angle = 0;
  cameraX = 0;
  cameraY = 0;
  //angle: number;
  isMouseOver = false;
  isMouseEvent = false;
  private _parent: TParetGameObject;
  pointerDownCallbacks: ICallbackData[] = [];
  pointerUpCallbacks: ICallbackData[] = [];
  pointerMoveCallbacks: ICallbackData[] = [];
  pointerOverCallbacks: ICallbackData[] = [];
  pointerOutCallbacks: ICallbackData[] = [];
  data: any = null;

  constructor(scene: Scene, key: string, name: TGameObjectNames, x=0, y=0, width=0, height=0, angle=0){
    this.scene = scene;
    this._parent = scene;
    this.uid = Game.createId();
    this.key = key;
    this.name = name;
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.initWidth = width;
    this.initHeight = height;
    this.angle = angle;
    this._halfHeight = this.height/2;
    this._halfWidth = this.width/2;
    this._interactiveBodyRect = {
      width,
      height,
      halfHeight: this._halfHeight,
      halfWidth: this._halfWidth,
      x:0,
      y:0
    }
    this.center = {
      x: this._x - this.width/2,
      y: this._y - this.height/2
    }

    this.init();
  }

  get x():number{
    return this._x;
  }

  set x(val: number){
    this._x = val;
    this.changeCenter();
  }

  get y():number{
    return this._y;
  }

  set y(val: number){
    this._y = val;
    this.changeCenter();
  }

  get width(): number{
    return this._width;
  }

  get halfWidth(){
    return this._halfWidth;
  }

  set width(val: number){
    this._width = val;
    this._halfWidth = val/2;
    //if(this.name==='Sprite'){
      this.setInteractiveRect(this._width, this._height, this._interactiveBodyRect.x, this._interactiveBodyRect.y);
      this.changeCenter();
    //}
  }

  get height(): number{
    return this._height;
  }

  get halfHeight(){
    return this._halfHeight;
  }

  set height(val: number){
    this._height = val;
    this._halfHeight = val/2;
    //if(this.name==='Sprite'){
      this.setInteractiveRect(this._width, this._height, this._interactiveBodyRect.x, this._interactiveBodyRect.y);
      this.changeCenter();
    //}
  }

  get parent(): TParetGameObject{
    return this._parent;
  }

  set parent(parent: TParetGameObject){
    this._parent = parent;
  }

  get interactiveRect(){
    return {
      ...this._interactiveBodyRect,
      x: this.x+this._interactiveBodyRect.x,
      y: this.y+this._interactiveBodyRect.y
    };
  }

  get alpha(){
    return this._alpha;
  }

  set alpha(value: number){
    if(value>1){
      this._alpha = 1;
    }else if(value<=0){
      this._alpha = 0;
      //this._alpha = Math.abs(value);
    }else{
      this._alpha = value;
    }
  }

  set angle(value:number){
    this._angle = value;
  }

  get angle():number{
    return this._angle;
  }

  setZindex(val:number){
    //console.log('this.name = ',this.key,'||',this.name);
    this.zIndex = val;
    this.scene.sortByZindex();
  }

  setInteractiveRect(width: number, height: number, x?:number, y?: number){
    const x0 = x?x:0;
    let y0 = y?y:0;
    if(x&&!y){
      y0 = x0;
    }
    //console.log('setInteractiveRect');
    this._interactiveBodyRect = {
      width,
      height,
      halfHeight: height/2,
      halfWidth: width/2,
      x: x0,
      y: y0
    };
  }

  protected _on(event: TGameObjectEvents, handler: (pointer: TPointer)=>void, context?:any):string{
    const id = Game.createId();
    switch (event) {
      case 'pointerdown':
        //id = this.scene.input.on(event, this.onPointerDown, this);
        //console.log('register pointerdown');
        this.pointerDownCallbacks.push({
          id,
          handler: handler.bind(context)
        });
        this.isMouseEvent = true;
        break;
      case 'pointerup':
        //id = this.scene.input.on(event, this.onPointerUp, this);
        //console.log('register pointerdown');
        this.pointerUpCallbacks.push({
          id,
          handler: handler.bind(context)
        });
        this.isMouseEvent = true;
        break;
      case 'pointermove':
          //id = this.scene.input.on(event, this.onPointerUp, this);
          //console.log('register pointerdown');
          this.pointerMoveCallbacks.push({
            id,
            handler: handler.bind(context)
          });
          this.isMouseEvent = true;
          break;

      case 'pointerover':
        //console.log('register pointerover');
        this.pointerOverCallbacks.push({
          id,
          handler: handler.bind(context)
        });
        this.isMouseEvent = true;
        break;
        
      case 'pointerout':
        this.pointerOutCallbacks.push({
          id,
          handler: handler.bind(context)
        });
        this.isMouseEvent = true;
        break;
      default:
        break;
    }

    if(this.isMouseEvent){
      this.scene.add.addInteractiveObj(this);
    }

    return id;
  }

  getGlobalPos():TPoint{
    if(this._parent instanceof Container){
      const parentPos = this._parent.getGlobalPos();
      return {
        x: parentPos.x + this.x,
        y: parentPos.y + this.y
      }
    }else{
      return{
        x: this.x,
        y: this.y
      }
    }
  } 

  off(id: string){
    //this.scene.input.off(id);
    this.pointerDownCallbacks = this.pointerDownCallbacks.filter(callData=>callData.id!==id);
    this.pointerUpCallbacks = this.pointerUpCallbacks.filter(callData=>callData.id!==id);
    this.pointerMoveCallbacks = this.pointerMoveCallbacks.filter(callData=>callData.id!==id);
    this.pointerOverCallbacks = this.pointerOverCallbacks.filter(callData=>callData.id!==id);
    this.pointerOutCallbacks = this.pointerOutCallbacks.filter(callData=>callData.id!==id);
    if(this.pointerDownCallbacks.length===0
      &&this.pointerUpCallbacks.length===0
      &&this.pointerOutCallbacks.length===0
      &&this.pointerOverCallbacks.length===0
    ){
      this.isMouseEvent = false;
      this.scene.add.delInteractiveObj(this);
    }
  }

  isOnPointer(point: TPoint): GameObject|undefined{
    
    // if(!this.isMouseEvent){
    //   return;
    // }

    console.log('isOnPointer');
    const worldPointer = {
      x: point.x-this.scene.game.camera.cameraPoint().x,
      y: point.y-this.scene.game.camera.cameraPoint().y
    }
    if(this._parent instanceof Container){
      const globalPos = this.getGlobalPos();
      const x0 = globalPos.x - this._interactiveBodyRect.halfWidth;
      const y0 = globalPos.y - this._interactiveBodyRect.halfHeight;
      const x1 = globalPos.x + this._interactiveBodyRect.halfWidth;
      const y1 = globalPos.y + this._interactiveBodyRect.halfHeight;

      if((worldPointer.x>=x0&&worldPointer.x<=x1)&&(worldPointer.y>=y0&&worldPointer.y<=y1)){
        //console.log('isOnPointerDown');
        return this;
      }
    }else{
      
      const rad = this.angle * Math.PI/180;
      const kX = Math.cos(rad);
      const kY = Math.sin(rad);
      const x1 = this.x - this._interactiveBodyRect.halfWidth*kX+this._interactiveBodyRect.halfHeight*kY;
      const x2 = this.x - this._interactiveBodyRect.halfWidth*kX-this._interactiveBodyRect.halfHeight*kY;
      const x3 = this.x + this._interactiveBodyRect.halfWidth*kX-this._interactiveBodyRect.halfHeight*kY;
      const x4 = this.x + this._interactiveBodyRect.halfWidth*kX+this._interactiveBodyRect.halfHeight*kY;
      const y1 = this.y - this._interactiveBodyRect.halfWidth*kY-this._interactiveBodyRect.halfHeight*kX;
      const y2 = this.y - this._interactiveBodyRect.halfWidth*kY+this._interactiveBodyRect.halfHeight*kX;
      const y3 = this.y + this._interactiveBodyRect.halfWidth*kY+this._interactiveBodyRect.halfHeight*kX;
      const y4 = this.y + this._interactiveBodyRect.halfWidth*kY-this._interactiveBodyRect.halfHeight*kX;
      // const graphics = this.scene.add.graphics();
      // graphics.fillStyle('#ff0004');
      // graphics.fillRect(x1, y1, 5,5);
      // graphics.fillRect(x2, y2, 5,5);
      // graphics.fillRect(x3, y3, 5,5);
      // graphics.fillRect(x4, y4, 5,5);
      //console.log(x1,'||', y1);
      let dx = x2 - x1;
      let dy = y2 - y1;
      const d1 = (x2-x1)*(worldPointer.y-y1)-(y2-y1)*(worldPointer.x-x1);
      //const d1 = ((y1-pointer.y)*dx+(pointer.x-x1)*dx)/(dy*dy+dx*dx);

      dx = x3 - x2;
      dy = y3 - y2;
      const d2 = dx*(worldPointer.y-y2)-dy*(worldPointer.x-x2);
      //const d2 = ((y2-pointer.y)*dx+(pointer.x-x2)*dx)/(dy*dy+dx*dx);

      dx = x4 - x3;
      dy = y4 - y3;
      const d3 = dx*(worldPointer.y-y3)-dy*(worldPointer.x-x3);
      //const d3 = ((y3-pointer.y)*dx+(pointer.x-x3)*dx)/(dy*dy+dx*dx);

      dx = x1 - x4;
      dy = y1 - y4;
      const d4 = dx*(worldPointer.y-y4)-dy*(worldPointer.x-x4);
      //const d4 = ((y4-pointer.y)*dx+(pointer.x-x4)*dx)/(dy*dy+dx*dx);
      //console.log('calculate');
      if(d1<0&&d2<0&&d3<0&&d4<0){
        //console.log('isOnPointerDown');
        return this;
      }

      // if((pointer.x>=this.x-this._interactiveBodyRect.halfWidth&&pointer.x<=this.x+this._interactiveBodyRect.halfWidth)&&(pointer.y>=this.y-this._interactiveBodyRect.halfHeight&&pointer.y<=this.y+this._interactiveBodyRect.halfHeight)){
      //   console.log('isOnPointerDown');
      //   return this;
      // }
    }
  }

  onPointerUp(pointer: TPointer){
    this.pointerUpCallbacks.forEach(callData=>{
      callData.handler(pointer);
    });
  }

  onPointerMove(pointer: TPointer){
    if(!this.isOnPointer(pointer)){
      if(this.isMouseOver){
        this.isMouseOver = false;
        this.pointerOutCallbacks.forEach(callData=>{
          callData.handler(pointer);
        });
      }
      return;
    }
    this.pointerMoveCallbacks.forEach(callData=>{
      callData.handler(pointer);
    });
    // this.pointerMoveCallbacks.forEach(callData=>{
    //   callData.handler(pointer);
    // });
    // console.log('onPointerMove')
    if(!this.isMouseOver){
      this.isMouseOver = true;
      this.pointerOverCallbacks.forEach(callData=>{
        callData.handler(pointer);
      });
    }
  }

  // detectPoinerOut(pointer: TPointer){
  //   if(this.isMouseOver){
  //     if(!this.isOnPointer(pointer)){
  //       this.isMouseOver = false;
  //       this.pointerOutCallbacks.forEach(callData=>{
  //         callData.handler(pointer);
  //       });
  //     }
  //   }
  // }

  onPointerDown(pointer: TPointer){
    // if(this.pointerDownCallbacks.length<=0){
    //   return;
    // }
    // if(this._parent instanceof Container){
    //   const globalPos = this.getGlobalPos();
    //   const x0 = globalPos.x - this._interactiveBodyRect.halfWidth;
    //   const y0 = globalPos.y - this._interactiveBodyRect.halfHeight;
    //   const x1 = globalPos.x + this._interactiveBodyRect.halfWidth;
    //   const y1 = globalPos.y + this._interactiveBodyRect.halfHeight;

    //   if((pointer.x>=x0&&pointer.x<=x1)&&(pointer.y>=y0&&pointer.y<=y1)){
    //     this.pointerDownCallbacks.forEach(callData=>{
    //       callData.handler(pointer);
    //     });
    //   }
    // }else{
    //   if((pointer.x>=this.x-this._interactiveBodyRect.halfWidth&&pointer.x<=this.x+this._interactiveBodyRect.halfWidth)&&(pointer.y>=this.y-this._interactiveBodyRect.halfHeight&&pointer.y<=this.y+this._interactiveBodyRect.halfHeight)){
    //     this.pointerDownCallbacks.forEach(callData=>{
    //       callData.handler(pointer);
    //     });
    //   }
    // }
    //console.log('onPointerdown onPointerdown');
    this.pointerDownCallbacks.forEach(callData=>{
      callData.handler(pointer);
    });
    
  }

  init(){
    this.scene.add.registerGameObject(this);
  }

  private changeCenter(){
    this.center.x = this._x - this._halfWidth;
    this.center.y = this._y - this._halfHeight;
  }

  render(){

  }
}