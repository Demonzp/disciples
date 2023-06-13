import Game, { TGameObjectType } from './Game';
import { TParetGameObject } from './GameObject';
import Scene from './Scene';

export type TComands = {
  key: string;
  val: any;
}

type TKeys = 'fillStyle'|'strokeStyle'|'lineStyle'|'fillRect';

export default class Graphics{
  scene: Scene;
  uid: string;
  type: TGameObjectType = 'graphics';
  arr: TComands[] = [];
  zIndex = 0;
  alpha = 1;
  x: number = 0;
  y: number = 0;
  angle: number = 0;
  pi = Math.PI/180;
  private _parent: TParetGameObject;

  constructor(scene: Scene){
    this.scene = scene;
    this._parent = scene;
    this.uid = Game.createId();
    scene.add.registerGameObject(this);
  }

  get parent(): TParetGameObject{
    return this._parent;
  }

  set parent(parent: TParetGameObject){
    this._parent = parent;
  }

  clear(){
    this.arr = [];
  }

  setZindex(val:number){
    this.zIndex = val;
    this.scene.sortByZindex();
  }

  addCommand(key: TKeys, val:any){
    let find = false;
    this.arr = this.arr.map(obj=>{
      if(obj.key===key){
        find = true;
        return{
          ...obj,
          val
        }
      }
      return obj;
    });

    if(!find){
      this.arr.push({
        key: key,
        val
      });
    }
  }

  fillStyle(color: string, alpha=1){
    this.addCommand('fillStyle', {color});
    this.alpha = alpha;
    // let find = false;
    // this.arr = this.arr.map(obj=>{
    //   if(obj.key==='fillStyle'){
    //     find = true;
    //     return{
    //       ...obj,
    //       val: {color, alpha}
    //     }
    //   }
    //   return obj;
    // });

    // if(!find){
    //   this.arr.push({
    //     key: 'fillStyle',
    //     val: {color, alpha}
    //   });
    // }
  }

  fillRect(x:number,y:number,width:number,height:number){
    this.addCommand('fillRect', {x,y,width,height});
    // this.arr.push({
    //   key: 'fillRect',
    //   val: {x,y,width,height}
    // });
  }

  strokeStyle(color: string, alpha=1){
    this.addCommand('strokeStyle', {color});
    this.alpha = alpha;
    // this.arr.push({
    //   key: 'strokeStyle',
    //   val: {color, alpha}
    // });
  }

  beginPath(){
    this.arr.push({
      key: 'beginPath',
      val: null
    });
  }

  strokeRect(x:number,y:number,width:number,height:number){
    this.arr.push({
      key: 'strokeRect',
      val: {x,y,width,height}
    });
  }

  lineStyle(lineWidth: number, color: number, alpha?: number){
    this.arr.push({
      key: 'lineStyle',
      val: {lineWidth, color, alpha}
    });
  }

  lineWidth(lineWidth: number){
    //console.log('lineWidth = ', lineWidth);
    this.arr.push({
      key: 'lineWidth',
      val: lineWidth
    });
  }

  lineTo(x:number, y:number){
    this.arr.push({
      key: 'lineTo',
      val: {x , y}
    });
  }

  moveTo(x: number, y:number){
    this.arr.push({
      key: 'moveTo',
      val: {x, y}
    });
  }

  stroke(){
    this.arr.push({
      key: 'stroke',
      val: null
    });
  }

  render(){
    //console.log('render grapfics!!!');
    this.arr.forEach(comand=>{
      //console.log('render grapfics!!!', comand.key);
      switch (comand.key) {
        case 'beginPath':
          this.scene.ctx!.beginPath();
          break;
        case 'fillStyle':
          this.scene.ctx!.fillStyle = comand.val.color;
          break;
        case 'strokeStyle':
          //console.log('strokeStyle = ', comand.val.color);
          this.scene.ctx!.strokeStyle = comand.val.color;
          break;
        case 'fillRect':
          //console.log('render fillRect!!!');
          this.scene.ctx!.save();
          this.scene.ctx!.globalAlpha = this.alpha;
          let x = comand.val.x+this.x;
          let y = comand.val.y+this.y;
          this.scene.ctx!.translate(x, y);
          this.scene.ctx!.rotate(this.pi*this.angle);
          this.scene.ctx!.translate(-(x), -(y));
          this.scene.ctx!.fillRect(x, y, comand.val.width, comand.val.height);
          this.scene.ctx!.restore();
          break;
        case 'strokeRect':
          //console.log('render fillRect!!!');
          //this.scene.ctx!.lineWidth = 3;
          //console.log(this.scene.ctx!.l);
          this.scene.ctx!.beginPath();
          
          this.scene.ctx!.moveTo(comand.val.x, comand.val.y);
          this.scene.ctx!.lineTo(comand.val.x + comand.val.width, comand.val.y);
          this.scene.ctx!.lineTo(comand.val.x + comand.val.width, comand.val.y+comand.val.height);
          this.scene.ctx!.lineTo(comand.val.x, comand.val.y+comand.val.height);
          this.scene.ctx!.closePath();
          this.scene.ctx!.stroke();
          //this.scene.ctx!.strokeRect(comand.val.x, comand.val.y, comand.val.width, comand.val.height);
          break;
        case 'lineStyle':
          //console.log('render fillRect!!!');
          this.scene.ctx!.fillStyle = comand.val.color;
          this.scene.ctx!.lineWidth = comand.val.width;
          break;
        case 'lineWidth':
          //console.log('render lineWidth!!! = ', comand.val);
          this.scene.ctx!.lineWidth = comand.val;
          break;
        case 'moveTo':
          //console.log('render fillRect!!!');
          this.scene.ctx!.moveTo(comand.val.x,comand.val.y);
          break;
        case 'lineTo':
          //console.log('render fillRect!!!');
          this.scene.ctx!.lineTo(comand.val.x,comand.val.y);
          break;
        case 'stroke':
          //console.log('render fillRect!!!');
          this.scene.ctx!.stroke();
          break;
        default:
          break;
      }
    });
  }
}