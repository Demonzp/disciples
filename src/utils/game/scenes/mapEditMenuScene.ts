import Scene from "utils/gameLib/Scene";

export default class MapEditorMenuScene extends Scene{
    constructor(){
        super('MapEditorMenuScene');
    }

    create(): void {
        const fon = this.add.sprite('fon-menu-editor');
        fon.x = this.halfWidth;
        fon.y = this.halfHeight;
    }
}