import Scene from "utils/gameLib/Scene";

export default class MainScene extends Scene{

    //pointerMatrix: TPointMatrix = [0,0];
    constructor(){
        super('MainScene');
    }

    create(): void {
        console.log('mainScene');
        // const portret = this.add.sprite(`portrets-party-one-empire`);
        // portret.setFrame(0);
       
        // portret.x = -100;
        // portret.y = 85/2;
        // portret.flipX = true;

        // const portret2 = this.add.sprite(`portrets-party-one-empire`);
        // portret2.setFrame(0);
       
        // portret2.x = 100;
        // portret2.y = 200;
        //portret2.flipX = true;

        const t = this.add.sprite('test');
        t.x = -50;
        t.y = 50;
        t.flipX = true;

        this.timer.on(()=>{
            t.flipX=!t.flipX;
            console.log('false');
        },2,null, true);

        const t2 = this.add.sprite('test');
        t2.x = 400;
        t2.y = 200;
    }

    update(_: number): void {
    }
}