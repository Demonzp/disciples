import Container from './Container';
import { TPoint } from './Game';
import GameObject from './GameObject';
import Graphics from './Graphics';
import Scene from './Scene';
import Sprite from './Sprite';
import Text from './Text';
import VirtualRectangle from './VirtualRectangle';

export default class Manager {
  scene: Scene;
  gameObjects: (GameObject | Graphics)[] = [];
  interactiveObjects: GameObject[] = [];

  constructor(scene: Scene) {
    this.scene = scene;
  }

  graphics(): Graphics {
    //console.log('register graphics');
    return new Graphics(this.scene);
  }

  text(text: string, x?: number, y?: number, width?: number): Text {
    return new Text(this.scene, text, x, y, width);
    //this._sprite(scene, key, x, y);
  }

  sprite(key: string, x?: number, y?: number, width?: number, height?: number): Sprite {
    return new Sprite(this.scene, key, x, y, width, height);
    //this._sprite(scene, key, x, y);
  }

  container(x?: number, y?: number, width?: number, height?: number): Container {
    return new Container(this.scene, x, y, width, height);
  }

  virtualRect(width: number, height: number, x?: number, y?: number): VirtualRectangle {
    return new VirtualRectangle(this.scene, width, height, x, y);
  }

  remove(data: GameObject | Graphics | (GameObject | Graphics)[]) {
    //console.log('befor del = ', this.gameObjects.length);
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        this.gameObjects = this.gameObjects.filter(obj2 => obj2.uid !== obj.uid);
        if (obj instanceof GameObject) {
          this.delInteractiveObj(obj);
          //this.interactiveObjects = this.interactiveObjects.filter(obj2 => obj2.uid !== obj.uid);
        }
      }
    } else {
      this.gameObjects = this.gameObjects.filter(obj => obj.uid !== data.uid);
      if (data instanceof GameObject) {
        this.delInteractiveObj(data);
        //this.interactiveObjects = this.interactiveObjects.filter(obj => obj.uid !== data.uid);
      }
    }
    //console.log('after del = ', this.gameObjects.length);
  }

  removeAll() {
    this.gameObjects = [];
  }

  addInteractiveObj(obj: GameObject) {
    const interObj = this.interactiveObjects.find(o => o.uid === obj.uid);
    if (!interObj) {
      this.interactiveObjects.push(obj);
    }
  }

  delInteractiveObj(obj: GameObject) {
    this.interactiveObjects = this.interactiveObjects.filter(o => o.uid !== obj.uid);
  }

  findOnPointerObject(point: TPoint) {
    //console.log('findOnPointerObject');
    // for (let j = 0; j < this.gameObjects.length; j++) {
    //   const object = this.gameObjects[j];
    //     if(object instanceof GameObject){
    //       const colligionObj = object.isOnPointer(point);
    //       if(colligionObj){
    //         //colligionObj.onPointerDown(point); 
    //         return colligionObj; 
    //       }
    //       //console.log('go next');
    //       if(object instanceof Container){
    //         const colligionObj = object.isOnPointer(point);
    //         if(colligionObj){
    //           //colligionObj.onPointerDown(point); 
    //           return colligionObj; 
    //         }
    //       }
    //     }
    // }
    //console.log('interactiveObjects = ', this.interactiveObjects.length);
    for (let j = 0; j < this.interactiveObjects.length; j++) {
      const object = this.interactiveObjects[j];
      if (object instanceof GameObject) {
        const colligionObj = object.isOnPointer(point);
        if (colligionObj) {
          //colligionObj.onPointerDown(point); 
          return colligionObj;
        }
        //console.log('go next');
        if (object instanceof Container) {
          const colligionObj = object.isOnPointer(point);
          if (colligionObj) {
            //colligionObj.onPointerDown(point); 
            return colligionObj;
          }
        }
      }
    }
  }

  registerGameObject(obj: GameObject | Graphics) {
    this.gameObjects.push(obj);
  }
}