import { setReadyScene, setScene } from "store/slices/sliceGame";
import store from "store/store";
import { ELoadEvents } from "utils/gameLib/Loader";
import Scene from "utils/gameLib/Scene";

export default class LoaderScene extends Scene {
  constructor() {
    super('LoaderScene');
  }

  preload() {
    const graphicsFon = this.add.graphics();
    graphicsFon.fillStyle('#000');
    graphicsFon.fillRect(0, 0, this.width, this.height);
    const graphics = this.add.graphics();
    const text = this.add.text('Loading...', this.halfWidth - 30, this.halfHeight - 40);
    text.color = 'white';
    this.load.on(ELoadEvents.progress, (value) => {
      graphics.fillStyle('#ffffff');
      graphics.fillRect(0, this.halfHeight, this.width * value, 20);
    });
    graphics.fillStyle('#ffffff');
    graphics.fillRect(0, 0, 0, 20);

    this.load.spritesheet('castle-legions', './assets/imgs/castle-legions.png', { frameWidth: 314, frameHeight: 300, endFrame: 30 });
    this.load.spritesheet('arrows', './assets/imgs/arrows.png', { frameWidth: 20, frameHeight: 20, endFrame: 23 });
    this.load.image('test', './assets/imgs/arrows.png');
    this.load.spritesheet('city-1', './assets/imgs/city-1.png', { frameWidth: 314, frameHeight: 300, endFrame: 20 });
    this.load.spritesheet('city-2', './assets/imgs/city-2.png', { frameWidth: 314, frameHeight: 300, endFrame: 20 });
    this.load.spritesheet('city-3', './assets/imgs/city-3.png', { frameWidth: 314, frameHeight: 300, endFrame: 15 });
    this.load.image('city-4', './assets/imgs/city-4.png');
    this.load.image('city-5', './assets/imgs/city-5.png');
    this.load.image('fon-menu-editor', './assets/imgs/fon-menu-editor.jpg');
    this.load.image('origin-field', './assets/imgs/origin-field.jpg');
    this.load.image('map-grid', './assets/imgs/map-grid.jpg');
    this.load.image('fundament5x5', './assets/imgs/fundament5x5.png');
    this.load.image('fundament4x4', './assets/imgs/fundament4x4.png');
    this.load.image('modal-capital1', './assets/imgs/modal-capital1.jpg');
    this.load.image('modal-city-party', './assets/imgs/modal-city-party1.jpg');
    this.load.image('modal-add-units', './assets/imgs/modal-add-units.jpg');
    this.load.image('place-plag', './assets/imgs/place-plag.jpg');
    this.load.image('place-one', './assets/imgs/place-one.png');
    this.load.image('place-two', './assets/imgs/place-two.png');
    this.load.image('modal-city', './assets/imgs/modal-city.jpg');
    this.load.image('modal-message', './assets/imgs/modal-message.jpg');
    this.load.image('main-menu-fon', './assets/imgs/main-menu-fon.jpg');
    this.load.image('main-menu-button', './assets/imgs/main-menu-button.png');
    this.load.image('main-menu-button-cristal', './assets/imgs/main-menu-button-cristal.png');
    this.load.image('window-info', './assets/imgs/window-info.png');
    this.load.image('big-bnt', './assets/imgs/big-bnt.png');
    this.load.image('small-bnt', './assets/imgs/small-bnt.png');
    this.load.image('profile', './assets/imgs/profile.png');
    this.load.image('arena-status', './assets/imgs/arena-status.png');
    this.load.image('arena-squad-menu', './assets/imgs/arena-squad-menu.png');
    
    this.load.image('profile-ico-mask', './assets/imgs/profile-ico-mask.png');
    
    this.load.spritesheet('_FIREFLY_HUMAN', './assets/imgs/_FIREFLY_HUMAN.PNG', { frameWidth: 187, frameHeight: 112, endFrame: 29 });
    this.load.spritesheet('portret-units-one-empire', './assets/imgs/portret-units-one-empire.png', { frameWidth: 70, frameHeight: 85, endFrame: 10 });
    this.load.spritesheet('portret-units-two', './assets/imgs/portret-units-two.png', { frameWidth: 150, frameHeight: 85, endFrame: 3 });
    this.load.spritesheet('grass-water', './assets/imgs/isometric-grass-and-water-64x64.png', { frameWidth: 64, frameHeight: 64, endFrame: 24 });
    this.load.spritesheet('castle-empire', './assets/imgs/castle-empire.png', { frameWidth: 314, frameHeight: 300, endFrame: 15 });
  }

  create() {
    console.log('loaded!!!');
    store.dispatch(setReadyScene());
    store.dispatch(setScene('mainMenu'));
    //this.scene.start('MainScene');
  }
}