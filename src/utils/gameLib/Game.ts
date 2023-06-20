import Camera from './Camera';
import InputEvent from './InputEvent';
import Loader from './Loader';
import GameMath from './Math';
import Scene from './Scene';
import ScenesManager, { ISceneManager } from './ScenesManager';

export type TGameInit = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  isAutoAnim?: boolean;
  scenes: typeof Scene[];
}

export type TPoint = {
  x: number,
  y: number
}

export type TGameObjectType = 'gameobject' | 'graphics';

export default class Game {

  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  vCanvas: HTMLCanvasElement;
  vCtx: CanvasRenderingContext2D;
  load = new Loader();
  input: InputEvent;
  width = 0;
  height = 0;
  halfWidth = 0;
  halfHeight = 0;
  private _scenes = new ScenesManager(this);
  isInit = false;
  requestAnimateId: number | null = null;
  numFrames = 60;
  currentDelta = 60;
  timerFrames = 0;
  prevTime = 0;
  isAutoAnim = true;
  camera = new Camera(this);
  Math = new GameMath(this);

  constructor({ canvas, width = 300, height = 200, isAutoAnim = true, scenes }: TGameInit) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.input = new InputEvent(this);
    this.vCanvas = document.createElement('canvas');
    this.vCtx = this.vCanvas.getContext('2d')!;
    this.setSize(width, height);
    this.isAutoAnim = isAutoAnim;
    this._scenes.init(scenes);
    this.preload();
    this.prevTime = performance.now();
    this.currentDelta = Math.floor((1 / this.numFrames) * 1000);
    this.requestAnimateId = requestAnimationFrame(this.render.bind(this));
  }

  destroy(): void {
    this.input.destroy();
  }

  get scene(): ISceneManager {
    return this._scenes;
  }

  setWidth(val: number) {
    this.width = val;
  }

  setHeight(val: number) {
    this.height = val;
  }

  setSize(width: number, height?: number) {
    this.width = width;
    if (height) {
      this.height = height;
    } else {
      this.height = width;
    }
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    this._resize();
  }

  private _resize() {
    if (!this.canvas) {
      throw new Error('Game is not init call init() method!');
    }
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private async preload() {
    //console.log('game width = ', this.width);
    await this.load.preloadImages();
    this._scenes.initFirstScene();
  }

  static createId(): string {
    const length = 18;
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let id = '';

    for (let i = 0; i < length; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }

    return id;
  }

  clearCanvas() {
    this.ctx!.clearRect(0, 0, this.width, this.height);
  }

  forceRender() {
    this.clearCanvas();
    this._scenes.update(1);
  }

  render(time: number) {
    const delta = Math.floor(time - this.prevTime);
    const calc = (1 / this.numFrames) * (delta - this.currentDelta);
    if (delta >= this.currentDelta) {
      //console.log('calc = ', calc);
      //console.log('requestAnimationFrame = ', this.currentDelta, ' || ', delta);
      this.clearCanvas();
      this._scenes.update(calc);
      this.prevTime = time;
    }
    if (this.isAutoAnim) {
      requestAnimationFrame(this.render.bind(this));
    }
  }
}