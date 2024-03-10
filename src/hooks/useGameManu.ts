import { useEffect } from "react";
import { useAppSelector } from "store/hooks";
import MainGameMenuScene from "utils/game/scenes/mainGameMenuScene";
import Game from "utils/gameLib/Game";

type TProps = {
    game:Game
};

const useGameMenu = ({game}:TProps)=>{
    const {scene, sceneStatus} = useAppSelector((state)=>state.game);
    const {menuType} = useAppSelector((state)=>state.gameMenu);

    useEffect(()=>{
        if(sceneStatus==='notReady'){
            return;
        }
        if(scene==='mainGameMenu'){
            const gameScene = game.scene.getScene<MainGameMenuScene>('MainGameMenuScene');
            switch (menuType) {
                case 'main':
                    console.log('-------main----------');
                    gameScene.mainMenu.create();
                    break;
                case 'multiplayer-signin':
                    console.log('-------multiplayer-signin----------');
                    gameScene.multiplayerSigninMenu.create();
                    break;
                case 'multiplayer':
                    console.log('-------multiplayer----------');
                    gameScene.multiplayerMenu.create();
                    break;
                case 'arena-menu':
                    console.log('-------arena-menu----------');
                    gameScene.arenaMenu.create();
                    break;
                default:
                    break;
            }
        }
        
        //MainGameMenuScene
    }, [sceneStatus, menuType, scene]);
};

export default useGameMenu;