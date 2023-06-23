import { ELoadEvents } from "utils/gameLib/Loader";
import Scene from "utils/gameLib/Scene";

export default class LoaderScene extends Scene{
  constructor(){
    super('LoaderScene');
  }

  preload(){
    const graphicsFon = this.add.graphics();
    graphicsFon.fillStyle('#000');
    graphicsFon.fillRect(0,0,this.width,this.height);
    const graphics = this.add.graphics();
    const text = this.add.text('Loading...', this.halfWidth-30, this.halfHeight-40);
    text.color = 'white';
    this.load.on(ELoadEvents.progress, (value)=>{
      graphics.fillStyle('#ffffff');
      graphics.fillRect(0,this.halfHeight,this.width*value,20);
    });
    graphics.fillStyle('#ffffff');
    graphics.fillRect(0,0,0,20);

    this.load.image('empire-castle', './assets/imgs/castle-empire.png');
    this.load.image('origin-field', './assets/imgs/origin-field.jpg');
    this.load.image('map-grid', './assets/imgs/map-grid.jpg');
    this.load.spritesheet('grass-water', './assets/imgs/isometric-grass-and-water-64x64.png',{ frameWidth: 64, frameHeight: 64, endFrame: 24 });
  }

  create(){
    console.log('loaded!!!');
    this.scene.start('MainScene');
  }
}