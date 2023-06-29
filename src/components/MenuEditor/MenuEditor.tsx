import { useState } from "react";
import classes from "./menu-editor.module.css";
import MenuCreateQuest from "components/MenuCreateQuest";

export type TMenu = 'main'|'createNew';

const MenuEditor = ()=>{
    const [menuType, setMenuType] = useState<TMenu>('main');

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
                    <button>Quit</button>
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