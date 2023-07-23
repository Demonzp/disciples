import { TCell } from "store/slices/sliceGame";
import Scene from "utils/gameLib/Scene";
import ModalPropertiesCapital from "../objects/ModalPropertiesCapital";

export interface IScene extends Scene{
    vMatrix: (TCell[])[];
    modalPropertiesCapital: ModalPropertiesCapital;
}