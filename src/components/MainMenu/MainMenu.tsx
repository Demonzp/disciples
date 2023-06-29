import { useAppDispatch } from "store/hooks";
import classes from "./main-menu.module.css";
import { setScene } from "store/slices/sliceGame";

const MainMenu =()=>{

    const dispatch = useAppDispatch();

    const onMapEditor = ()=>{
        dispatch(setScene('mapEditorMenu'));
    };

    return(
        <div className={`${classes.cont} col`}>
            <button>Game</button>
            <button onClick={onMapEditor}>MapEditor</button>
        </div>
    );
};

export default MainMenu;