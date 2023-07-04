import Modal from "components/Modal";
import ModalCard from "components/ModalCard";
import { FC, useState } from "react";
import Game from "utils/gameLib/Game";

type Props = {
    game: Game;
}

const ModalMainCapitalCity: FC<Props> = ({ game }) => {
    const [show, setShow] = useState(false);
    const onToggle = () => setShow(!show);

    return (
        <Modal show={show} onToggle={onToggle}>
            <ModalCard>
                <div>
                    {
                        game.load.getImage('castle-legions') as unknown as JSX.Element
                    }
                </div>
            </ModalCard>
        </Modal>
    );
};

export default ModalMainCapitalCity;