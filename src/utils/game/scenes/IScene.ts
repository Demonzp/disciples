import { TCell } from "store/slices/sliceGame";
import Scene from "utils/gameLib/Scene";
import ModalPropertiesCapital from "../objects/ModalPropertiesCapital";
import ModalPropertiesCity2 from "../objects/ModalPropertiesCity2";

export interface IScene extends Scene{
    vMatrix: (TCell[])[];
    modalPropertiesCapital: ModalPropertiesCapital;
    modalPropertiesCity: ModalPropertiesCity2;
}