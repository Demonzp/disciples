import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setMenuType } from "store/slices/sliceMenuGame";
import { setIsConnect } from "store/slices/sliceMultiArena";
import Game from "utils/gameLib/Game";
import socketInst from "utils/socket";

type TProps = {
    game: Game
};

const useArenaHooks = ({ game }: TProps) => {
    const { user } = useAppSelector(state => state.multiplayer);
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, []);

    const connectArenaSocket = () => {
        socketInst.init({ url: 'http://localhost:4000', path: '', uid: user.uid });
        socketInst.on('connect', () => {
            console.log('i`m conected');
            //dispatch(setIsConnect(true));
            dispatch(setMenuType('arena-menu'));
        });
        socketInst.on('error', () => {
            console.log('socketInst error');
        });
        socketInst.on('disconnect', () => {
            console.log('socketInst disconnected----');
        });

        //socketInst.emit('gg', {data:'ggdata'});
    };

    return {
        connectArenaSocket,
    }
};

export default useArenaHooks;