import { useEffect, useRef, useState } from "react";
import LoaderScene from "utils/game/scenes/loaderScene";
import MainScane from "utils/game/scenes/mainScene";
import Game from "utils/gameLib/Game";

import classes from "./game.module.css";
import { useAppSelector } from "store/hooks";

const GameComp = () => {
    const refCont = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game | undefined>();
    const { pointerMatrix } = useAppSelector(state => state.game);

    useEffect(() => {
        if (refCont.current && !game) {
            document.addEventListener('contextmenu', onContext);

            const g = new Game({
                canvas: refCont.current,
                // width: 640,
                // height: 360,
                width: 854,
                height: 480,
                scenes: [LoaderScene, MainScane]
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

    const onContext = (e: MouseEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <div>
                <h4>[{ pointerMatrix[0] }, { pointerMatrix[1] }]</h4>
            </div>
            <div className={classes.gameCont}>
                <canvas ref={refCont} />
            </div>
        </>

    );
};

export default GameComp;