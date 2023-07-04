import Modal from "components/Modal";
import ModalCard from "components/ModalCard";
import { FC } from "react";
import Game from "utils/gameLib/Game";

type Props = {
    show: boolean;
    onToggle: ()=>any;
    game: Game;
}

const ModalMainCapitalCity: FC<Props> = ({show, onToggle, game }) => {

    return (
        <Modal show={show} onToggle={onToggle}>
            <ModalCard>
                <div>
                    {/* <img
                        src={URL.createObjectURL(game.load.getBLob('castle-legions'))}
                        onLoad={(e)=>{URL.revokeObjectURL(e.currentTarget.src)}}
                    /> */}

                </div>
            </ModalCard>
        </Modal>
    );
};

export default ModalMainCapitalCity;