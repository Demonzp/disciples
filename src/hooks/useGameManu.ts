import { useEffect } from "react";
import { actionLogouded } from "store/actions/actionsMultiplayer";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setMenuType } from "store/slices/sliceMenuGame";
import MainGameMenuScene from "utils/game/scenes/mainGameMenuScene";
import Game from "utils/gameLib/Game";
import io from "socket.io-client";
import socketInst from "utils/socket";
import useArenaHooks from "./useArenaHooks";

type TProps = {
    game: Game
};

const useGameMenu = ({ game }: TProps) => {
    const { scene, sceneStatus } = useAppSelector((state) => state.game);
    const { menuType } = useAppSelector((state) => state.gameMenu);
    const { isLogin, isLogout, user } = useAppSelector(state => state.multiplayer);
    const dispatch = useAppDispatch();
    const { connectArenaSocket } = useArenaHooks({ game });

    useEffect(() => {
        if (sceneStatus === 'notReady') {
            return;
        }
        if (scene === 'mainGameMenu') {
            const gameScene = game.scene.getScene<MainGameMenuScene>('MainGameMenuScene');
            switch (menuType) {
                case 'main':
                    console.log('-------main----------');
                    gameScene.mainMenu.create();
                    break;
                case 'multiplayer-signin':
                    console.log('-------multiplayer-signin----------');
                    if (isLogin) {
                        dispatch(setMenuType('multiplayer'));
                        return;
                    }
                    gameScene.multiplayerSigninMenu.create();
                    break;
                case 'multiplayer':
                    console.log('-------multiplayer----------');
                    gameScene.multiplayerMenu.create();
                    gameScene.profileMenu.create();
                    break;
                case 'connect-arena':
                    connectArenaSocket();
                    //console.log('-------arena-menu----------');
                    //gameScene.arenaMenu.create();
                    break;
                case 'arena-menu':
                    console.log('-------arena-menu----------');
                    gameScene.arenaMenu.create();
                    break;
                case 'queue-arena':
                    gameScene.queueArenaMenu.create();
                    break;
                case 'arena-manager-menu':
                    gameScene.queueArenaMenu.hide();
                    gameScene.arenaManagerMenu.create();
                    break;
                default:
                    break;
            }
        }

        //MainGameMenuScene
    }, [sceneStatus, menuType, scene]);

    useEffect(() => {
        if (isLogin) {
            const gameScene = game.scene.getScene<MainGameMenuScene>('MainGameMenuScene');
            gameScene.multiplayerSigninMenu.hideCallback = () => dispatch(setMenuType('multiplayer'));
            gameScene.multiplayerSigninMenu.hide();
        }
    }, [isLogin]);

    useEffect(() => {
        console.log('useEffect isLogout = ', isLogout);
        if (isLogout) {
            window.google.accounts.id.revoke(user.id, () => {
                console.log('---------------revoke----------------');
                dispatch(actionLogouded());
                //dispatch(setLogout(false));
                //dispatch(setMenuType('multiplayer-signin'));
            });
        }
    }, [isLogout]);
};

export default useGameMenu;