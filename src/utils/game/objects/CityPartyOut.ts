import Container from "utils/gameLib/Container";
import ModalPropertiesCityParty from "./ModalPropertiesCityParty";
import Sprite from "utils/gameLib/Sprite";
import PartyPortrait from "./PartyPortrait";
import { TPoint } from "utils/gameLib/Game";
import Graphics from "utils/gameLib/Graphics";
import Text from "utils/gameLib/Text";
import { IScene } from "../scenes/IScene";
import ModalAddHero from "./ModalAddHero";
import { ICity } from "store/slices/sliceGame";

export default class CityPartyOut{
    conts: Container[] = [];
    borders: Sprite[] = [];
    portraits: PartyPortrait[] = [];
    contPos: TPoint[][] = [
        [
            {
                x: 244,
                y: -132,
            },
            {
                x: 324,
                y: -132,
            },
        ],
        [
            {
                x: 244,
                y: -26,
            },
            {
                x: 324,
                y: -26,
            },
        ],
        [
            {
                x: 244,
                y: 80,
            },
            {
                x: 324,
                y: 80,
            },
        ]
    ];
    private _fonAddLeader: Graphics|undefined;
    private _textAddLeader: Text|undefined;
    private _contSelectParty:Container|undefined;
    cityData:ICity|undefined;
    modalAddHero:ModalAddHero;
    scene:IScene;
    constructor(public parent:ModalPropertiesCityParty){
        
    }

    init(){
        this.scene = this.parent.scene;
        this.modalAddHero = new ModalAddHero(this.parent.scene);
        this.cityData = this.parent.parent.cityData;
        if(!this.cityData.squadOut){
            this._contSelectParty = this.scene.add.container(this.parent.x-285,this.parent.y-25);
            //this._contSelectParty.x = this.parent.x;
            //this._contSelectParty.y = this.parent.y;
            this._contSelectParty.setInteractiveRect(154,320);
            this._contSelectParty.on('pointerup',()=>{
                console.log('_contSelectParty');
                this.modalAddHero.init([1,0],this.parent.parent.cityData.id);
            });
            this._fonAddLeader = this.scene.add.graphics();
            this._fonAddLeader.fillStyle('#7b786b');
            this._fonAddLeader.fillRect(this.parent.x-364,this.parent.y-185,154,320);
            this._fonAddLeader.setZindex(1000);
            this._textAddLeader = this.scene.add.text('Click to select party leader',0,0,148);
            this._textAddLeader.fontSize = 16;
            this._textAddLeader.x = this.parent.x-364+(154-this._textAddLeader.width)/2;
            this._textAddLeader.y = this.parent.y-185+this._textAddLeader.height+6;
            this._textAddLeader.setZindex(1000);
        }
    }

    hide(){
        if(this.cityData&&!this.cityData.squadOut&&this._fonAddLeader){
            this.scene.add.remove(this._fonAddLeader);
            this.scene.add.remove(this._textAddLeader);
            this.scene.add.remove(this._contSelectParty);
        }
    }
}