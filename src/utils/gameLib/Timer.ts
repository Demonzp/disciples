import Game from './Game';
import Scene from './Scene';

export type TDataTimers = {
  id: string;
  time: number;
  timer: number;
  repeat: boolean;
  callback: ()=>void;
}

export default class Timer{
  scene: Scene;
  timers: TDataTimers[]=[];
  constructor(scene:Scene){
    this.scene = scene;
  }

  on(callback: ()=>void, time: number, context: any, repeat?: boolean): string{
    const timer:TDataTimers = {
      id: Game.createId(),
      time: 0,
      timer: Math.floor((time*1000)/this.scene.game.currentDelta),
      repeat: repeat?repeat:false,
      callback: callback.bind(context)
    }

    this.timers.push(timer);
    return timer.id;
  }

  off(id:string){
    this.timers = this.timers.filter(t=>t.id!==id);
  }

  delAll(){
    this.timers = [];
  }

  update(delta: number){
    for (let i = 0; i < this.timers.length; i++) {
      const timer = this.timers[i];
      timer.time = timer.time+1+delta;
      //console.log(timer.time,'||', timer.timer);
      if(timer.time>=timer.timer){
        timer.callback();
        timer.time = 0;
        if(!timer.repeat){
          this.timers.splice(i,1);
          i--;
        }
      }
    }
  }
}