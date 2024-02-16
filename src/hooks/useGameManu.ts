import { useEffect } from "react";
import { useAppSelector } from "store/hooks";
import MainGameMenuScene from "utils/game/scenes/mainGameMenuScene";
import Game from "utils/gameLib/Game";

type TProps = {
    game:Game
};

const useGameMenu = ({game}:TProps)=>{
    const {scene} = useAppSelector((state)=>state.game);
    const {menuType} = useAppSelector((state)=>state.gameMenu);

    useEffect(()=>{
        if(scene==='mainGameMenu'){
            const gameScene = game.scene.getScene<MainGameMenuScene>('MainGameMenuScene');
            switch (menuType) {
                case 'main':
                    //gameScene.mainMenu.create();
                    break;
            
                default:
                    break;
            }
        }
        
        //MainGameMenuScene
    }, [menuType, scene]);
};

export default useGameMenu;