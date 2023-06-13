import { ELoadEvents, ILoadItemBase, ILoadSpritesheet, ILoadSpritesheetBase } from './Loader';
import Scene from './Scene';

export default class LoaderManagerScene{
  scene: Scene;
  private loadImages: ILoadItemBase[] = [];

  constructor(scene: Scene){
    this.scene = scene;
  }

  on(event: ELoadEvents, callback: (value: number)=>void, context?: any){
    this.scene.game.load.on(event, callback, context);
  }

  image(key:string, path:string){
    this.scene.game.load.image(key, this.scene.key, path);
    this.loadImages.push({key, path});
  }

  spritesheet(key:string, path:string, data:ILoadSpritesheetBase){
    this.scene.game.load.spritesheet(key, this.scene.key, path, data.frameWidth, data.frameHeight, data.endFrame);
  }

  spritesequence(key: string, paths:string[]){
    this.scene.game.load.spritesequence(key, this.scene.key, paths);
  }

  getImage(key: string):HTMLImageElement|undefined{
    //console.log('this.scene = ', this.scene);
    const image = this.scene.game.load.getImage(key);
    return image;
  }

  getSpritesheet(key: string):ILoadSpritesheet|undefined{
    //console.log('this.scene = ', this.scene);
    const spritesheet = this.scene.game.load.getSpritesheet(key);
    return spritesheet;
  }

  getSpritesequence(key: string){
    const spritesequence = this.scene.game.load.getSpritesequence(key);

    return spritesequence;
  }
}