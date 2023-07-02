import { useEffect, useState } from "react";
import classes from "./mapeditor.module.css";
import ModalAddRace from "components/ModalAddRace";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { actionSetEditorMod } from "store/actions/actionsGame";

const MapEditor = () => {
    const { editorMod } = useAppSelector(state=>state.game);
    const dispatch = useAppDispatch();
    const [showAddRace, setShowAddRace] = useState(false);
    const onToggle = ()=>{
        if(showAddRace){
            dispatch(actionSetEditorMod('properties'));
        }
        setShowAddRace(!showAddRace); 
    };

    useEffect(()=>{
        switch (editorMod) {
            case 'add-race':
                onToggle();
                break;
        
            default:
                setShowAddRace(false);
                break;
        }
    }, [editorMod]);

    const onAddRace = ()=>{
        dispatch(actionSetEditorMod('add-race'));
    };

    const onMove = ()=>{
        dispatch(actionSetEditorMod('move'));
    };

    return (
        <>
            <ModalAddRace show={showAddRace} onToggle={onToggle}/>
            <div className={`content ${classes.cont} row`}>
                <label>Objects</label>
                <button>Errase</button>
                <div className="row">
                    <div className="col">
                        <button disabled={editorMod==='properties'}>Propertise</button>
                        <button disabled={editorMod==='add-party'}>Add Party</button>
                    </div>
                    <div className="col">
                        <button
                            onClick={onMove} 
                            disabled={editorMod==='move'}
                        >Move</button>
                        <button disabled={editorMod==='copy-party'}>Copy Party</button>
                    </div>
                </div>
                <button 
                    onClick={onAddRace}
                    disabled={editorMod==='add-race'}
                >Add Race</button>
                <div>
                </div>
            </div>
        </>
        
    );
};

export default MapEditor;