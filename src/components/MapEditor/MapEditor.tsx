import { FC, useEffect, useState } from "react";
import classes from "./mapeditor.module.css";
import ModalAddRace from "components/ModalAddRace";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { actionAddCity, actionSetEditorMod } from "store/actions/actionsGame";
import Game from "utils/gameLib/Game";
import ModalMainCapitalCity from "components/ModalMainCapitalCity";
import EditorScene from "utils/game/scenes/editorScene";

type Props = {
    game: Game;
}

const MapEditor: FC<Props> = ({ game }) => {
    const { editorMod, selectObj, units, capitalCities, cities } = useAppSelector(state => state.game);
    const { isOpen } = useAppSelector(s=>s.cityParty);
    const dispatch = useAppDispatch();
    const [showAddRace, setShowAddRace] = useState(false);
    const onToggle = () => {
        if (showAddRace) {
            dispatch(actionSetEditorMod('properties'));
            return;
        }
        setShowAddRace(true);
    };

    const [showPropsCapital, setShowPropsCapital] = useState(false);

    const onTogglePropsCapital = () => setShowPropsCapital(!showPropsCapital);

    useEffect(() => {
        switch (editorMod) {
            case 'add-race':
                onToggle();
                break;

            default:
                setShowAddRace(false);
                break;
        }
    }, [editorMod]);

    useEffect(() => {
        //if(selectObj){
        const gameScene = game.scene.getScene<EditorScene>('EditorScene');
        //console.log('update state capitalCities = ', scene);
        if (gameScene) {
            if(selectObj){
                switch (editorMod) {
                    case 'properties':
                        if(selectObj.type === 'city'){
                            const city = cities[selectObj.idx];
                            gameScene.modalPropertiesCity.init(city);
                        }
                        break;
                
                    default:
                        break;
                }
            }else{
                
            }
            
            //gameScene.openProperties();
        }
        //onTogglePropsCapital();
        //}
    }, [editorMod, selectObj]);

    useEffect(() => {
        const gameScene = game.scene.getScene<EditorScene>('EditorScene');
        //console.log('update state capitalCities = ', scene);
        if (gameScene) {
            gameScene.updateUnits();
        }
    }, [units]);

    useEffect(()=>{
        if(game){
            const gameScene = game.scene.getScene<EditorScene>('EditorScene');
            //console.log('update state cities = ',gameScene.isInit);
            if(gameScene){
                if(selectObj){
                    const city = cities[selectObj.idx];
                    if(isOpen){
                        //const city = cities[selectObj.idx];
                        gameScene.modalPropertiesCity.hide();
                        gameScene.modalCityParty.init(city);
                    }else{
                        
                        gameScene.modalCityParty.hide();
                        gameScene.modalPropertiesCity.init(city);
                    }
                    
                }
                //gameScene.updateCityParty();
            }
        }
    }, [isOpen]);

    const onAddRace = () => {
        dispatch(actionSetEditorMod('add-race'));
    };

    const onMove = () => {
        dispatch(actionSetEditorMod('move'));
    };

    const onAddCity = () => {
        //console.log('onAddCity');
        dispatch(actionAddCity());
    };

    const onProperties = () => {
        dispatch(actionSetEditorMod('properties'));
    };

    return (
        <>
            {/* <ModalMainCapitalCity game={game} show={showPropsCapital} onToggle={onTogglePropsCapital}/> */}
            <ModalAddRace show={showAddRace} onToggle={onToggle} />
            <div className={`content ${classes.cont} row`}>
                <label>Objects</label>
                <button>Errase</button>
                <div className="row">
                    <div className="col">
                        <button
                            disabled={editorMod === 'properties'}
                            onClick={onProperties}
                        >Propertise</button>
                        <button disabled={editorMod === 'add-party'}>Add Party</button>
                    </div>
                    <div className="col">
                        <button
                            onClick={onMove}
                            disabled={editorMod === 'move'}
                        >Move</button>
                        <button disabled={editorMod === 'copy-party'}>Copy Party</button>
                    </div>
                </div>
                <button
                    onClick={()=>{}}
                    disabled={editorMod === 'add-race'}
                >Add Race</button>
                <div className="row">
                    <div className="col">
                        <button
                            onClick={onAddCity}
                            disabled={editorMod === 'add-city'}
                        >City</button>
                        <button >Mage</button>
                        <button >Trainer</button>
                    </div>
                    <div className="col">
                        <button >Merchant</button>
                        <button >Mercenary</button>
                        <button >Ruins</button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default MapEditor;