import { useEffect } from "react";
import { useAppSelector } from "store/hooks";
import Game from "utils/gameLib/Game";

type TProps = {
    game:Game
};

const useGameMenu = ({game}:TProps)=>{
    const {menuType} = useAppSelector((state)=>state.gameMenu);

    useEffect(()=>{
        
    }, [menuType]);
};

export default useGameMenu;