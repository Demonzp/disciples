import Game, { TPoint } from './Game';
import GameObject, { TGameObjectEvents } from './GameObject';
import { ILoadSpritesequence, ILoadSpritesheet } from './Loader';
import Scene from './Scene';

export type TEventsSprite = 'onComplate';

export interface ICallbackSpriteData {
  id: string;
  handler: ()=>void;
}

export default class Sprite extends GameObject{
  image: HTMLImageElement|undefined;
  spritesheet: ILoadSpritesheet| undefined;
  spritsequence: ILoadSpritesequence| undefined;
  sx = 0;
  sy = 0;
  sWidth = 0;
  sHeight = 0;
  rows = 0;
  cols = 0;
  frameRate = 1;
  frameTimer = 0;
  isPlay = false;
  isPlayS = false;
  isFlipX = false;
  isFlipY = false;
  frameIdx = 0;
  framesPos: TPoint [] = [];
  isCallbacks = false;
  callbacks: ICallbackSpriteData[] = [];
  repeat = -1;
  isRevers = false;
  mask: HTMLImageElement|undefined;
  numFrames = 0;

  constructor(scene: Scene, key:string, x=0, y=0, width?:number, height?:number){
    super(scene, key, 'Sprite', x, y);
    this.image = scene.load.getImage(key);
    this.spritesheet = this.scene.load.getSpritesheet(key);
    this.spritsequence = this.scene.load.getSpritesequence(key);

    if(this.image){
      if(this.spritesheet){
        const w = this.image.width;
        const h = this.image.height;
        this.cols = w/this.spritesheet.frameWidth;
        this.rows = h/this.spritesheet.frameHeight;
        this.numFrames = this.spritesheet.endFrame-1;
        let n = 0;
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.rows; i++) {
          y = i * this.spritesheet.frameHeight;
          for (let j = 0; j < this.cols; j++) {
            if(n>=this.spritesheet.endFrame){
              break;
            }
            
            x = j * this.spritesheet.frameWidth;
            this.framesPos.push({
              x,
              y
            });
            n++;
          }
          
        }
        //console.log('this.framesPos = ', this.framesPos);
        this.sWidth = this.spritesheet.frameWidth;
        this.sHeight = this.spritesheet.frameHeight;
      }else{
        this.sWidth = this.image.width;
        this.sHeight = this.image.height;
      } 
    }else{
      console.error(`error = image by key "${key}" not found`);
    }

    if(width){
      this.width = width;
      //this.sWidth = width;
    }else{
      if(this.image){
        if(this.spritesheet){
          //this.sWidth = this.spritesheet.frameWidth;
          //this.sHeight = this.spritesheet.frameHeight;
          this.width = this.spritesheet.frameWidth;
          this.height = this.spritesheet.frameHeight;
        }else{
          //this.sWidth = this.image.width;
          //this.sHeight = this.image.height;
          this.width = this.image.width;
          this.height = this.image.height;
        }
        
      }
      
    }
    if(height){
      this.height = height;
    }
    if(width&&!height){
      this.height = width;
    }

    this.initWidth = this.width;
    this.initHeight = this.height;

    super.setInteractiveRect(this.width, this.height);
    
    this.center = {
      x: this.x-this.width/2,
      y: this.y-this.height/2
    };
    //console.log(key, ' = ', this.image);
  }

  get flipX(){
    return this.isFlipX;
  }

  set flipX(value:boolean){
    this.isFlipX = value;
  }

  get flipY(){
    return this.isFlipY;
  }

  set flipY(value:boolean){
    this.isFlipY = value;
  }
  
  setFrame(idx: number){
    //const spritesheet = this.scene.load.getSpritesheet(this.key);
    if(this.spritesheet&&idx<this.spritesheet.endFrame){
      this.frameIdx = idx;
      this.sx = this.framesPos[idx].x;
      this.sy = this.framesPos[idx].y;
    }
  }

  setFrameByKey(key: string){
    //console.log('key = ',key);
    const img = this.scene.load.getImage(key);
    //console.log('img = ', img);
    if(img){
      this.image = img;
    }
  }

  setSequence(key: string){
    const sequence = this.scene.load.getSpritesequence(key);
    if(sequence){
      this.spritsequence = sequence;
      this.numFrames = sequence.endFrame-1;
    }
  }

  setMask(key: string){
    this.mask = this.scene.load.getImage(key);
  }

  on(event:TEventsSprite|TGameObjectEvents , handler: ()=>void, context?: any):string{
    if(event==='pointerdown'||event==='pointermove'||event==='pointerup'||event==='pointerout'||event==='pointerover'){
      //console.log('register TEventsSprite');
      return super._on(event, handler, context);
    }else{
      
      const id = Game.createId();
      this.callbacks.push({
        id,
        handler: handler.bind(context)
      });
      return id;
    }
  }

  play(){
    if(this.framesPos.length<=0){
      return;
    }
    this.isPlay = true;
  }

  playS(isRevers = false){
    if(!this.spritsequence){
      return;
    }
    if(this.isRevers){
      this.frameIdx = this.spritsequence.endFrame-1;
    }
    this.isRevers = isRevers;
    this.isPlayS = true;
  }

  stop(){
    this.isPlay = false;
    this.isPlayS = false;
  }

  setScale(scale: number){
    this.width = this.initWidth*scale;
    this.height = this.initHeight*scale;
  }

  setDisplaySize(width: number, height: number){
    this.width = width;
    this.height = height;
  }

  private _play(){
    if(!this.isPlay){
      return;
    }

    this.frameTimer++;
    if(this.frameTimer<this.frameRate){
      return;
    }

    this.frameTimer=0;

    let idx = this.frameIdx+1;
    //console.log('idx = ', idx);
    if(idx===this.framesPos.length){
      //this.callbacks.forEach(el=>el.handler());
      //this.stop();
      idx=0;
      //return;
    }
    this.setFrame(idx);
  }

  private _playSRevers(){
    let idx = this.frameIdx-1;
    //console.log('idx = ', idx);
    if(idx===-1){
      //this.callbacks.forEach(el=>el.handler());
      //this.stop();
      idx=this.spritsequence!.endFrame-1;
      //return;
    }
    this.frameIdx = idx;
    this.setFrameByKey(`${this.spritsequence?.key}_${idx}`);
  }

  private _playS(){
    if(!this.isPlayS){
      return;
    }

    this.frameTimer++;
    if(this.frameTimer<this.frameRate){
      return;
    }

    this.frameTimer=0;
    //console.log('_playS');
    if(this.isRevers){
      this._playSRevers();
      return;
    }
    let idx = this.frameIdx+1;
    //console.log('idx = ', idx);
    if(idx===this.spritsequence?.endFrame){
      //this.callbacks.forEach(el=>el.handler());
      //this.stop();
      idx=0;
      //return;
    }
    this.frameIdx = idx;
    this.setFrameByKey(`${this.spritsequence?.key}_${idx}`);
    //this.setFrame(idx);
  }

  render(){
    
    if(this.image){
      //console.log('renderSprite!');
      this._play();
      this._playS();
      this.scene.ctx?.save();
      const cameraPoint = this.scene.game.camera.cameraPoint();
      this.scene.ctx!.scale(this.isFlipX?-1:1,this.isFlipY?-1:1);
      //this.scene.ctx!.scale(-1,1);
      let x = this.center.x+cameraPoint.x;
      x = this.isFlipX?x*-1-this.width:x;
      let y = this.center.y+cameraPoint.y;
      y = this.isFlipY?y*-1-this.height:y;
      this.scene.ctx?.translate(this.x+cameraPoint.x, this.y+cameraPoint.y);
      this.scene.ctx?.rotate(this.pi*this.angle);
      this.scene.ctx?.translate(-(this.x+cameraPoint.x), -(this.y+cameraPoint.y));
      this.scene.ctx!.globalAlpha = this.alpha;
      
      
      if(this.mask){
        const vCanvas = this.scene.game.vCanvas;
        const vCtx = this.scene.game.vCtx;

        vCtx.clearRect(0,0,vCanvas.width, vCanvas.height);
        vCanvas.width = this.mask.width;
        vCanvas.height = this.mask.height;
        vCtx.save();
        vCtx.drawImage(this.mask, 0, 0, this.mask.width, this.mask.height, 0, 0, this.mask.width, this.mask.height);
        vCtx.globalCompositeOperation = 'source-in';
        vCtx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.mask.width, this.mask.height);
    
        this.scene.ctx?.drawImage(vCanvas, 0, 0, vCanvas.width, vCanvas.height, x, y, this.width, this.height);

        vCtx.restore();
      }else{
        //this.scene.ctx!.drawImage(this.image, this.center.x+cameraPoint.x-x, this.center.y+cameraPoint.y-y, this.width, this.height);
        this.scene.ctx?.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, x, y, this.width, this.height);
      }
      
      this.scene.ctx?.restore();

      if((this.isPlay&&!this.isRevers&&this.frameIdx===this.numFrames)
        ||(this.isPlayS&&!this.isRevers&&this.frameIdx===this.numFrames)
        ||(this.isPlayS&&this.isRevers&&this.frameIdx===0)
      ){
        this.callbacks.forEach(el=>el.handler());
      }
    }
  }
}