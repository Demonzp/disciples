export enum ELoadEvents {
  'progress',
  'complete'
};

export interface ILoadSpritesequence{
  endFrame: number;
  framesKeys: string []; 
  key: string;
}


export interface ILoadItemBase{
  key: string;
  path: string;
}

export interface ILoadItem extends ILoadItemBase{
  keyScene: string
}

export interface ILoadSpritesheetBase{
  frameWidth: number;
  frameHeight: number; 
  endFrame: number;
}

export interface ILoadSpritesheet extends ILoadSpritesheetBase{
  key: string,
}

export type TLoadedItem = {
  key: string;
  keyScene: string;
  file: HTMLImageElement;
  //blob: Blob;
}

const imgLoadByPath = (path: string)=>{
  return new Promise<HTMLImageElement>((resolve, reject)=>{
    const img = new Image();

    img.onload = ()=>{
      //console.log('render sprite!!!');
      resolve(img);
      //URL.revokeObjectURL(img.src);
      //this.scene.ctx?.drawImage(img, this.x, this.y);
    }
    img.onerror = (err)=>reject(err);

    img.src = path;
  });
}

const imgLoad = (blob: Blob)=>{
  return new Promise<HTMLImageElement>((resolve, reject)=>{
    const img = new Image();

    img.onload = ()=>{
      //console.log('render sprite!!!');
      resolve(img);
      URL.revokeObjectURL(img.src);
      //this.scene.ctx?.drawImage(img, this.x, this.y);
    }
    img.onerror = (err)=>reject(err);

    img.src = URL.createObjectURL(blob);
  });
}

export default class Loader{
  private loadImages: ILoadItem[] = [];
  private numLoaded = 0;
  private idx = 0;
  private maxFiles = 10;
  private i = 0;
  private loadSpritesheet: ILoadSpritesheet[] = [];
  private loadSpritesequence: ILoadSpritesequence[] = [];
  private loadedImages: TLoadedItem[] = [];
  private eventProgressCallbacks: ((value: number)=>void)[] = [];
  private eventComplateCallbacks: ((value: number)=>void)[] = [];
  private callback:()=>void;

  image(key:string, keyScene: string, path:string){
    this.loadImages.push({key, keyScene, path});
  }

  spritesheet(key:string, keyScene: string, path:string, frameWidth: number, frameHeight: number, endFrame: number){
    this.image(key, keyScene, path);
    this.loadSpritesheet.push({
      key,
      frameHeight,
      frameWidth,
      endFrame
    });
  }

  spritesequence(key:string, keyScene: string, paths:string[]){
    const keys:string[] = [];
    paths.forEach((path,i)=>{
      const nameKey = `${key}_${i}`;
      this.image(nameKey, keyScene, path);
      keys.push(nameKey);
    });

    this.loadSpritesequence.push({
      key,
      framesKeys: keys,
      endFrame: keys.length
    });
  }

  getSpritesequence(key: string){
    const spritesequence = this.loadSpritesequence.find(el=>el.key===key);

    return spritesequence; 
  }

  getSpritesheet(key: string){
    const spritesheet = this.loadSpritesheet.find(el=>el.key===key);

    return spritesheet; 
  }

  getImage(key: string):HTMLImageElement|undefined{
    const image = this.loadedImages.find(el=>el.key===key);
    //console.log('image = ', key);
    return image.file;
  }

  // getBLob(key: string):Blob|undefined{
  //   const data = this.loadedImages.find(el=>el.key===key);

  //   return data?.blob;
  // }

  on(event: ELoadEvents, callback: (value:number)=>void, context?: any){
    switch (event) {
      case ELoadEvents.progress:
        this.eventProgressCallbacks.push(callback.bind(context));
        break;
      case ELoadEvents.complete:
        this.eventComplateCallbacks.push(callback.bind(context));
        break;
      default:
        break;
    }
  }

  loadFiles(callback:()=>void){
    this.callback = callback;
    this.preloadImages2();
  }

  loadImgs(callback:()=>void){
    this.callback = callback;
    this.preloadImages3();
  }

  preloadImages3(){
    const start = this.idx;
    let end = this.idx+this.maxFiles;
    if(end>this.loadImages.length){
      end = this.loadImages.length;
    }
    this.idx = end;
    //console.log('preloadImages2 = ', start,'||',end);
    for (let i = start; i < end; i++) {
      const el = this.loadImages[i];
      //console.log(el.key);
      this.loadImg(el);
    }
  }

  async loadImgsByPath(item:ILoadItem){
    try{
      //const res = await fetch(item.path);
      //const blob = await res.blob();
      const img = await imgLoadByPath(item.path);
      //num = (1/100)*(100/(this.loadImages.length/i));
      this.loadedImages.push({
        key: item.key, 
        keyScene: item.keyScene, 
        file: img,
        //blob
      });
      const num = (1/100)*(100/(this.loadImages.length/this.numLoaded));
      this.eventProgressCallbacks.forEach(callback=>callback(num));
      this.isLoadNextImg();
      //this.eventProgressCallbacks.forEach(callback=>callback(num));
    }catch(error){
      console.error('loadError: ', (error as Error).message);
      this.isLoadNextImg();
    }
  }
//22
  preloadImages2(){
    const start = this.idx;
    let end = this.idx+this.maxFiles;
    if(end>this.loadImages.length){
      end = this.loadImages.length;
    }
    this.idx = end;
    //console.log('preloadImages2 = ', start,'||',end);
    for (let i = start; i < end; i++) {
      const el = this.loadImages[i];
      //console.log(el.key);
      this.loadImg(el);
    }
    //console.log('start = ',start,' end = ', end);
    //console.log(this.loadImages.length);
  }

  isLoadNextImg(){
    this.numLoaded++;
    this.i++;
    
    //console.log('isLoadNext = ',this.numLoaded,'||', this.loadImages.length-1);
    if(this.numLoaded===this.loadImages.length){
      
      this.eventProgressCallbacks = [];
      this.loadImages = [];
      this.idx = 0;
      this.numLoaded=0;
      this.eventComplateCallbacks.forEach(callback=>callback(1));
      this.callback();
      return;
    }

    if(this.i===this.maxFiles&&this.numLoaded<this.loadImages.length){
      this.i = 0;
      this.preloadImages3();
    }
  }

  isLoadNext(){
    this.numLoaded++;
    this.i++;
    
    //console.log('isLoadNext = ',this.numLoaded,'||', this.loadImages.length-1);
    if(this.numLoaded===this.loadImages.length){
      
      this.eventProgressCallbacks = [];
      this.loadImages = [];
      this.idx = 0;
      this.numLoaded=0;
      this.eventComplateCallbacks.forEach(callback=>callback(1));
      this.callback();
      return;
    }

    if(this.i===this.maxFiles&&this.numLoaded<this.loadImages.length){
      this.i = 0;
      this.preloadImages2();
    }
  }

  async loadImg(item:ILoadItem){
    try{
      const res = await fetch(item.path);
      const blob = await res.blob();
      const img = await imgLoad(blob);
      //num = (1/100)*(100/(this.loadImages.length/i));
      this.loadedImages.push({
        key: item.key, 
        keyScene: item.keyScene, 
        file: img,
        //blob
      });
      const num = (1/100)*(100/(this.loadImages.length/this.numLoaded));
      this.eventProgressCallbacks.forEach(callback=>callback(num));
      this.isLoadNext();
      //this.eventProgressCallbacks.forEach(callback=>callback(num));
    }catch(error){
      console.error('loadError: ', (error as Error).message);
      this.isLoadNext();
    }
    
  }

  async preloadImages(){
    let num = 0;
    let i = 0;
    for (const iterator of this.loadImages) {
      try {
        const res = await fetch(iterator.path);
        const blob = await res.blob();
        const img = await imgLoad(blob);
        //console.log('zagruzil = ', iterator.key);
        num = (1/100)*(100/(this.loadImages.length/i));
        this.loadedImages.push({
          key: iterator.key, 
          keyScene: iterator.keyScene, 
          file: img,
          //blob
        });
        this.eventProgressCallbacks.forEach(callback=>callback(num));
        i++;
      } catch (error) {
        console.error('loadError: ', (error as Error).message);
      }
    }
    this.eventProgressCallbacks = [];
    this.loadImages = [];
    this.eventComplateCallbacks.forEach(callback=>callback(1));
    //console.log('konchil iterirovat!!!');
  }
}