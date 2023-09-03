import Container from "utils/gameLib/Container";
import ModalPropertiesCityParty from "./ModalPropertiesCityParty";
import Sprite from "utils/gameLib/Sprite";
import PartyPortrait from "./PartyPortrait";
import { TPoint } from "utils/gameLib/Game";
import { IUnit } from "store/slices/sliceGame";

export default class CityPartyIn{
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
    squad: IUnit[] = [];
    constructor(public parent:ModalPropertiesCityParty){}

    init(){

    }

    hide(){

    }
}