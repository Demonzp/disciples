import Sprite from "utils/gameLib/Sprite";
import Container from "utils/gameLib/Container";
import Text from "utils/gameLib/Text";
import Scene from "utils/gameLib/Scene";

export default class MainMenuButton {
    private _sprite: Sprite | undefined = undefined;
    private _cristal: Sprite| undefined = undefined;
    private _container: Container | undefined = undefined;
    private _label: Text | undefined = undefined;

    constructor(public scene: Scene, private x = 0, private y = 0, private text = '', private callback=()=>{}) {
        this.create();
    }

    get label(): Text {
        return this._label;
    }

    get container(): Container {
        return this._container;
    }

    get sprite(): Sprite {
        return this._sprite;
    }

    get cristal():Sprite{
        return this._cristal;
    }

    create() {
        this._container = this.scene.add.container();
        this._container.data = 'contButton';
        this.container.setInteractiveRect(240,48);
        this.container.x = this.x;
        this.container.y = this.y;
        
        this._sprite = this.scene.add.sprite('main-menu-button');
        this._cristal = this.scene.add.sprite('main-menu-button-cristal');
        this.cristal.alpha = 0;
        this._label = this.scene.add.text(this.text);
        this.container.add([this.sprite, this.label, this.cristal]);
        this.container.on('pointerover', this.onOver, this);
        this.container.on('pointerout', this.onOut, this);
        this.container.on('pointerup', this.callback);
    }

    onOver(){
        console.log('pointerover');
        this.cristal.alpha = 1;
    }

    onOut(){
        console.log('pointerout');
        this.cristal.alpha = 0;
    }
}