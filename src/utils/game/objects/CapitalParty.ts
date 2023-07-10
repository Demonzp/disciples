import Scene from "utils/gameLib/Scene";
import ModalPropertiesCapitalParty from "./ModalPropertiesCapitalParty";

export default class CapitalParty{
    scene: Scene;
    constructor(private parent: ModalPropertiesCapitalParty){
        this.scene = parent.scene;
    }
}