import { useState } from "react";
import classes from "./menu-editor.module.css";
import MenuCreateQuest from "components/MenuCreateQuest";
import { useAppDispatch } from "store/hooks";
import { setScene } from "store/slices/sliceGame";

export type TMenu = 'main'|'createNew';

const MenuEditor = ()=>{
    const [menuType, setMenuType] = useState<TMenu>('main');
    const dispatch = useAppDispatch();

    return(
        <div className={`${classes.cont} col`}>
            {
                menuType==='main'&&
                <>
                    <button 
                        onClick={()=>setMenuType('createNew')}
                    >
                        Create Quest
                    </button>
                    <button
                        onClick={()=>dispatch(setScene('mainMenu'))} 
                    >Quit</button>
                </>
            }
            {
                menuType==='createNew'&&
                <MenuCreateQuest setMenuType={setMenuType}/>
            }
            
        </div>
    );
};

export default MenuEditor;