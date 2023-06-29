import { FC, useState, Dispatch, SetStateAction } from "react";
import classes from "./menu-create-q.module.css";
import { TMenu } from "components/MenuEditor/MenuEditor";
import { TCapitalRace } from "utils/game/objects/CapitalCity";

type TChooseRace = {
    race: TCapitalRace,
    value: boolean
}

type TProps={
    setMenuType: Dispatch<SetStateAction<TMenu>>
}

const MenuCreateQuest:FC<TProps> = ({setMenuType})=>{
    const [mapName, setMapName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [mapSize, setMapSize] = useState('48');
    const [errorSize, setErrorSize] = useState('');
    const [race, setRace] = useState<TCapitalRace[]>([]);
    const [errorRace, setErrorRace] = useState('');

    const onChooseRace = (data:TChooseRace)=>{
        console.log('data = ', data);
        if(data.value){
            setRace(prev=>{
                return [...prev, data.race];
            });
        }else{
            setRace(prev=>{
                return prev.filter(v=>v!==data.race);
            });
        }
    };

    const submit = ()=>{
        
    };

    return(
        <div className={`${classes.cont} content`}>
            <div>
                <h3 className={classes.item}>Create new Map</h3>
                <div className={classes.item}>
                    <label>Enter name:</label>
                    <input 
                        type="text" 
                        value={mapName}
                        onChange={(e)=>setMapName(e.target.value)}
                    />
                </div>
                <div className={classes.item}>
                    <label>Enter map size(min:48, max:144):</label>
                    <input 
                        type="number" 
                        value={mapSize}
                        onChange={(e)=>setMapSize(e.target.value)}
                    />
                </div>
                <div className={classes.item}>
                    <label>Choose race:</label>
                    <div>
                        <input
                            type="checkbox" 
                            onChange={(e)=>onChooseRace({race:'empire',value:e.target.checked})}
                        />
                        <label>The Empire</label>
                    </div>
                    <div>
                        <input
                            type="checkbox" 
                        />
                        <label>Legions of the Demned</label>
                    </div>
                </div>
                <div>
                    <button>
                        Ok
                    </button>
                    <button
                        onClick={()=>setMenuType('main')}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuCreateQuest;