import { useEffect, useRef, useState } from "react";
import LoaderScene from "utils/game/scenes/loaderScene";
import MainScene from "utils/game/scenes/mainScene";
import Game from "utils/gameLib/Game";

import classes from "./game.module.css";
import { useAppSelector } from "store/hooks";
import MapEditor from "components/MapEditor";
import MainMenu from "components/MainMenu";
import MapEditorMenuScene from "utils/game/scenes/mapEditMenuScene";
import MenuEditor from "components/MenuEditor";
import EditorScene from "utils/game/scenes/editorScene";
import MainGameMenuScene from "utils/game/scenes/mainGameMenuScene";
import useGameMenu from "hooks/useGameManu";

const GameComp = () => {
    const refCont = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game | undefined>();
    const { pointerMatrix, capitalCities, cities, fieldMatrix, scene, isMapInit, editorMod, selectObj } = useAppSelector(state => state.game);
    useGameMenu({game});
    useEffect(() => {
        if (refCont.current && !game) {
            document.addEventListener('contextmenu', onContext);

            const g = new Game({
                canvas: refCont.current,
                // width: 640,
                // height: 360,
                width: 854,
                height: 480,
                scenes: [LoaderScene, MainScene, MapEditorMenuScene, EditorScene, MainGameMenuScene]
            });

            setGame(g);
        }
    }, [refCont, game]);

    useEffect(() => {
        return () => {
            document.removeEventListener('contextmenu', onContext);
            if (game) {
                game.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (game) {
            const gameScene = game.scene.getScene<EditorScene>('EditorScene');
            console.log('update state capitalCities = ', scene);
            if (isMapInit && gameScene && gameScene.isInit) {
                gameScene.updateCapitals();
            }
        }
    }, [capitalCities, isMapInit, game]);

    useEffect(() => {
        if (game) {
            const gameScene = game.scene.getScene<EditorScene>('EditorScene');
            //console.log('update state cities = ',gameScene.isInit);
            if (isMapInit && gameScene && gameScene.isInit) {

                gameScene.updateCities();
            }
        }
    }, [cities, isMapInit, game]);

    // useEffect(() => {
    //     if (game) {
    //         const gameScene = game.scene.getScene<EditorScene>('EditorScene');
    //         //console.log('update state capitalCities = ', scene);
    //         if(
    //             isMapInit
    //             &&gameScene
    //             &&gameScene.isInit
    //         ){
    //             gameScene.updateProperties();
    //         }
    //     }
    // }, [selectObj, editorMod, game]);

    useEffect(() => {
        //console.log('fieldMatrix = ', fieldMatrix);
    }, [fieldMatrix]);

    useEffect(() => {
        if (game) {
            // const scene = game.scene.getScene<MainScene>('MainScene');
            // //console.log('update state updatePointer = ', scene);
            // if(scene){
            //     scene.updatePointer();
            // }
        }
    }, [pointerMatrix]);

    useEffect(() => {
        if (game) {
            switch (scene) {
                case 'mainMenu':
                    game.scene.start('MainScene');
                    break;

                case 'mapEditorMenu':
                    game.scene.start('MapEditorMenuScene');
                    break;

                case 'mapEditor':
                    game.scene.start('EditorScene');
                    break;

                case 'mainGameMenu':
                    game.scene.start('MainGameMenuScene');
                    break;

                default:
                    break;
            }
        }

    }, [scene]);

    const onContext = (e: MouseEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <div>
                <h4>[{pointerMatrix[0]}, {pointerMatrix[1]}]</h4>
            </div>
            <div className={`${classes.gameCont} row`}>
                <canvas ref={refCont} />
                {scene === 'mainMenu' && <MainMenu />}
                {scene === 'mapEditorMenu' && <MenuEditor />}
                {scene === 'mapEditor' && <MapEditor game={game} />}
            </div>
        </>

    );
};

export default GameComp;