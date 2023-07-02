import { FC, useState, Dispatch, SetStateAction } from "react";
import classes from "./menu-create-q.module.css";
import { TMenu } from "components/MenuEditor/MenuEditor";
import { useAppDispatch } from "store/hooks";
import { actionInitNewMap } from "store/actions/actionsGame";
import { TCapitalRace } from "store/slices/sliceGame";

type TChooseRace = {
    race: TCapitalRace,
    value: boolean
}

type TProps={
    setMenuType: Dispatch<SetStateAction<TMenu>>
}

const minSize = 24;
const maxSize = 144;

const MenuCreateQuest:FC<TProps> = ({setMenuType})=>{
    const [mapName, setMapName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [mapSize, setMapSize] = useState(String(minSize));
    const [errorSize, setErrorSize] = useState('');
    const [race, setRace] = useState<TCapitalRace[]>([]);
    const [errorRace, setErrorRace] = useState('');
    const dispatch = useAppDispatch();

    const onChooseRace = (data:TChooseRace)=>{
        //console.log('data = ', data);
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
        let isCan = true;
        setErrorName('');
        setErrorSize('');
        setErrorRace('');
        if(mapName.length<=0){
            isCan = false;
            setErrorName('please enter name');
        }
        
        if(mapSize.length<=0){
            isCan = false;
            setErrorSize('please enter size of map');
        }

        const size = Number(mapSize);
        if(Number.isNaN(size)||size<minSize||size>maxSize){
            isCan = false;
            setErrorSize('please enter correct size');
        }

        if(race.length<=0){
            isCan = false;
            setErrorRace('Please select at least one race');
        }

        if(!isCan){
            return;
        }

        dispatch(actionInitNewMap({
            name:mapName,
            size,
            race,
        }));
    };

    return(
        <div className={`${classes.cont} content`}>
            <div>
                <h3 className={classes.item}>Create new Map</h3>
                <div className={classes.item}>
                    <label>Enter name:</label>
                    {errorName.length>0&&<label className={classes.error}>{errorName}</label>}
                    <input 
                        type="text" 
                        value={mapName}
                        onChange={(e)=>setMapName(e.target.value)}
                    />
                </div>
                <div className={classes.item}>
                    <label>Enter map size(min:{minSize}, max:{maxSize}):</label>
                    {errorSize.length>0&&<label className={classes.error}>{errorSize}</label>}
                    <input 
                        type="number"
                        value={mapSize}
                        onChange={(e)=>setMapSize(e.target.value)}
                    />
                </div>
                <div className={classes.item}>
                    <label>Choose race:</label>
                    {errorRace.length>0&&<label className={classes.error}>{errorRace}</label>}
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
                            onChange={(e)=>onChooseRace({race:'legions',value:e.target.checked})}
                        />
                        <label>Legions of the Demned</label>
                    </div>
                </div>
                <div>
                    <button
                        onClick={submit}
                    >
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