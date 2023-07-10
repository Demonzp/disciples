import { FC, useEffect, useState } from "react";
import Modal from "components/Modal/Modal";
import ModalCard from "components/ModalCard/ModalCard";

import classes from "./modal-add-race.module.css";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { TCapitalRace, arrRaces } from "store/slices/sliceGame";
import { actionAddCapitalCity } from "store/actions/actionsGame";

type TProps = {
    show: Boolean,
    onToggle: () => any,
}

const ModalAddRace: FC<TProps> = ({ show, onToggle }) => {
    const { capitalCities } = useAppSelector(state => state.game);
    const [races, setRaces] = useState([]);
    const [checkedRace, setCheckedRace] = useState<TCapitalRace|null>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setRaces(arrRaces.filter(r => {
            if (capitalCities.find(c => c.race === r)) {
                return false;
            }
            return true;
        }));
    }, [capitalCities]);

    const onChecked = (data:TCapitalRace)=>{
        setCheckedRace(data);
    };

    const onAddRace = ()=>{
        if(checkedRace){
            dispatch(actionAddCapitalCity(checkedRace))
                .unwrap()
                .then(()=>{
                    setCheckedRace(null);
                    //onToggle();
                });
        }else{
            onToggle();
        }
        
    };

    return (
        <div className={classes.cont}>
            <Modal show={show} onToggle={onToggle}>
                <ModalCard title={"add race"} onHide={onToggle}>
                    <div className={classes.cardBody}>
                        {
                            races.map(race => {
                                return (
                                    <div
                                        className={classes.item}
                                        onClick={()=>onChecked(race)} 
                                        key={race}
                                    >
                                        <input 
                                            type="radio" 
                                            name="race" 
                                            value={race} 
                                            checked={checkedRace===race?true:false} 
                                            onChange={(e)=>e.preventDefault()}
                                        />
                                        <label>{race}</label>
                                    </div>
                                );
                            })
                        }
                        <div className="row">
                            <button onClick={onAddRace}>OK</button>
                            <button onClick={onToggle}>cancel</button>
                        </div>
                    </div>
                </ModalCard>
            </Modal>
        </div>

    );
};

export default ModalAddRace;