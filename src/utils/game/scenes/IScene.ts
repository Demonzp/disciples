import { TCell } from "store/slices/sliceGame";
import Scene from "utils/gameLib/Scene";

export interface IScene extends Scene{
    vMatrix: (TCell[])[];
}