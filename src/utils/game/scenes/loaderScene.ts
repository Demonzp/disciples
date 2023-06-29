import { setScene } from "store/slices/sliceGame";
import store from "store/store";
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

    this.load.spritesheet('castle-legions', './assets/imgs/castle-legions.png',{ frameWidth: 314, frameHeight: 300, endFrame: 30 });
    this.load.image('fon-menu-editor', './assets/imgs/fon-menu-editor.jpg');
    //this.load.image('castle-empire', './assets/imgs/castle-empire.png');
    this.load.image('origin-field', './assets/imgs/origin-field.jpg');
    this.load.image('map-grid', './assets/imgs/map-grid.jpg');
    this.load.image('fundament5x5', './assets/imgs/fundament5x5.png');
    this.load.spritesheet('grass-water', './assets/imgs/isometric-grass-and-water-64x64.png',{ frameWidth: 64, frameHeight: 64, endFrame: 24 });
    this.load.spritesheet('castle-empire', './assets/imgs/castle-empire.png',{ frameWidth: 314, frameHeight: 300, endFrame: 15 });
  }

  create(){
    console.log('loaded!!!');
    store.dispatch(setScene('mainMenu'));
    //this.scene.start('MainScene');
  }
}