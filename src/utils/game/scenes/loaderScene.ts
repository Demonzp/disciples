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

    this.load.image('emp-castle', './assets/imgs/castle-empire.png');

  }

  create(){
    console.log('loaded!!!');
    this.scene.start('MainScene');
  }
}