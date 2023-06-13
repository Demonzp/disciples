import { useEffect, useRef, useState } from "react";
import LoaderScene from "utils/game/scenes/loaderScene";
import MainScane from "utils/game/scenes/mainScene";
import Game from "utils/gameLib/Game";

const GameComp = ()=>{
    const refCont = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game|undefined>();

    useEffect(()=>{
        if(refCont.current && !game){
            document.addEventListener( 'contextmenu', onContext);

            const g = new Game({
                canvas: refCont.current,
                width:640, 
                height:360,
                scenes: [LoaderScene, MainScane]
            });

            setGame(g);
        }
    }, [refCont, game]);

    useEffect(()=>{
        return()=>{
            document.removeEventListener( 'contextmenu', onContext);
            if(game){
                game.destroy();
            }
        };
    }, []);

    const onContext = (e:MouseEvent)=>{
        e.preventDefault();
    };

    return(
        <div>
            <canvas ref={refCont}/>
        </div>
    );
};

export default GameComp;