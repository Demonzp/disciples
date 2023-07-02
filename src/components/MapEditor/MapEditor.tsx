import { useState } from "react";
import classes from "./mapeditor.module.css";
import ModalAddRace from "components/ModalAddRace";

const MapEditor = () => {
    const [showAddRace, setShowAddRace] = useState(false);
    const onToggle = ()=>setShowAddRace(!showAddRace);
    return (
        <>
            <ModalAddRace show={showAddRace} onToggle={onToggle}/>
            <div className={`content ${classes.cont} row`}>
                <label>Objects</label>
                <button>Errase</button>
                <div className="row">
                    <div className="col">
                        <button>Propertise</button>
                        <button>Add Party</button>
                    </div>
                    <div className="col">
                        <button>Move</button>
                        <button>Copy Party</button>
                    </div>
                </div>
                <button onClick={onToggle}>Add Race</button>
                <div>
                </div>
            </div>
        </>
        
    );
};

export default MapEditor;