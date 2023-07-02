import { FC, useEffect, useState } from "react";
import Modal from "components/Modal/Modal";
import ModalCard from "components/ModalCard/ModalCard";

import classes from "./modal-add-race.module.css";
import { useAppSelector } from "store/hooks";
import { TCapitalRace, arrRaces } from "store/slices/sliceGame";

type TProps = {
    show: Boolean,
    onToggle: () => any,
}

const ModalAddRace: FC<TProps> = ({ show, onToggle }) => {
    const { capitalCities } = useAppSelector(state => state.game);
    const [races, setRaces] = useState([]);
    const [checkedRace, setCheckedRace] = useState<TCapitalRace>();

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
    }

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
                    </div>
                </ModalCard>
            </Modal>
        </div>

    );
};

export default ModalAddRace;