import { useAppDispatch } from "store/hooks";
import classes from "./main-menu.module.css";
import { setScene } from "store/slices/sliceGame";

const MainMenu = () => {

    const dispatch = useAppDispatch();

    const onMapEditor = () => {
        dispatch(setScene('mapEditorMenu'));
    };

    const onGame = () => {
        dispatch(setScene('mainGameMenu'));
    };

    return (
        <div className={`${classes.cont} col`}>
            <button onClick={onGame}>Game</button>
            <button onClick={onMapEditor}>MapEditor</button>
        </div>
    );
};

export default MainMenu;