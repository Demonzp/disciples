import classes from "./mapeditor.module.css";

const MapEditor = () => {
    return (
        <div className={`content ${classes.cont} row`}>
            <label>Objects</label>
            <button>Errase</button>
            <div>
                <div>
                    <button>Propertise</button>
                    <button>Add Party</button>
                </div>
                <div>
                    <button>Move</button>
                    <button>Copy Party</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default MapEditor;