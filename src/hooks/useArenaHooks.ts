import { useEffect } from "react";
import { unitToUnitRes } from "store/actions/actionArena";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { IUnit } from "store/slices/sliceGame";
import { setMenuType } from "store/slices/sliceMenuGame";
import { TOnlineInfo, TServerInfo, initState, setIsConnect, setOnlineInfo, setServerInfo } from "store/slices/sliceMultiArena";
import MainGameMenuScene from "utils/game/scenes/mainGameMenuScene";
import Game from "utils/gameLib/Game";
import socketInst from "utils/socket";

type TProps = {
    game: Game
};

const useArenaHooks = ({ game }: TProps) => {
    const { user } = useAppSelector(state => state.multiplayer);
    const { isInited, units, isShowHireHero } = useAppSelector(state=>state.multiArena);
    //const {menuType} = useAppSelector(state=>state.gameMenu);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!isInited){
            return;
        }
        //if(menuType==='arena-manager-menu'){
            const gameScene = game.scene.getScene<MainGameMenuScene>('MainGameMenuScene');
            if(gameScene){
                gameScene.arenaManagerMenu.party.updateUnits();
            }
        //}
    }, [units, isInited]);

    useEffect(()=>{
        if(!isInited){
            return;
        }
        const gameScene = game.scene.getScene<MainGameMenuScene>('MainGameMenuScene');
        if(isShowHireHero){
            gameScene.arenaManagerMenu.hireHeroMenu.show();
        }else{
            gameScene.arenaManagerMenu.hireHeroMenu.hide();
        }

    }, [isInited, isShowHireHero]);

    const connectArenaSocket = () => {
        const gameScene = game.scene.getScene<MainGameMenuScene>('MainGameMenuScene');
        socketInst.init({ url: 'http://localhost:4000', path: '', uid: user.uid });
        socketInst.on('connect', () => {
            console.log('i`m conected');
            //dispatch(setIsConnect(true));
            //dispatch(setMenuType('arena-menu'));
        });

        socketInst.on('init-arena-menu', () => {
            //console.log('i`m conected');
            //dispatch(setIsConnect(true));
            dispatch(setMenuType('arena-menu'));
        });
        
        socketInst.on('server-info', (data:TServerInfo) => {
            console.log('server-info = ', data);

            dispatch(setServerInfo(data));
            //dispatch(setMenuType('arena-menu'));
        });

        socketInst.on('update-online', (data:TOnlineInfo) => {
            console.log('update-online = ', data);

            dispatch(setOnlineInfo(data));
            //dispatch(setMenuType('arena-menu'));
        });

        socketInst.on('to-queue', (data:any) => {
            console.log('to-queue = ', data);

            //dispatch(setOnlineInfo(data));
            dispatch(setMenuType('queue-arena'));
        });

        socketInst.on('exit-queue', (data:any) => {
            console.log('exit-queue = ', data);

            //dispatch(setOnlineInfo(data));
            dispatch(setMenuType('arena-menu'));
        });

        socketInst.on('init-game', (data:any) => {
            console.log('init-game = ', data);
            dispatch(initState({
                playerRace: data.player.race,
                units: data.player.units,
                enemyRace: data.enemy.race
            }));
            dispatch(setMenuType('arena-manager-menu'));
            //dispatch(setOnlineInfo(data));
            //dispatch(setMenuType('arena-menu'));
        });

        socketInst.on('reconnect-game', (data:any) => {
            console.log('reconnect-game = ', data);
            dispatch(initState({
                playerRace: data.player.race,
                units: data.player.units,
                enemyRace: data.enemy.race
            }));
            dispatch(setMenuType('arena-manager-menu'));
            //dispatch(setOnlineInfo(data));
            //dispatch(setMenuType('arena-menu'));
        });

        socketInst.on('unit-to-unit', (data:IUnit[]) => {
            console.log('unit-to-unit = ', data);
            dispatch(unitToUnitRes(data));
        });

        socketInst.on('error', () => {
            console.log('socketInst error');
        });
        socketInst.on('disconnect', () => {
            gameScene.arenaMenu.hideCallback = ()=>dispatch(setMenuType('multiplayer'));
            gameScene.arenaMenu.hide();
            console.log('socketInst disconnected----');
        });

        //socketInst.emit('gg', {data:'ggdata'});
    };

    return {
        connectArenaSocket,
    }
};

export default useArenaHooks;