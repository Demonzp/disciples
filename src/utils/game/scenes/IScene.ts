import { TCell } from "store/slices/sliceGame";
import Scene from "utils/gameLib/Scene";
import ModalPropertiesCapital from "../objects/ModalPropertiesCapital";
import ModalPropertiesCity from "../objects/ModalPropertiesCity";

export interface IScene extends Scene{
    vMatrix: (TCell[])[];
    modalPropertiesCapital: ModalPropertiesCapital;
    modalPropertiesCity: ModalPropertiesCity;
}