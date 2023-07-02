import React, {useEffect, useState, useRef} from "react";
import styles from "./modal.module.css";

export default function Modal({ show, onToggle, children }: {
    show: Boolean,
    onToggle: () => any,
    children?: React.ReactElement
}) {
    const modal = useRef(null);
    const fon = useRef(null);
  
    const [newChild, setNewChild] = useState<React.ReactElement|undefined>();
    
    useEffect(() => {
        if (children) {
            setNewChild(React.cloneElement(children, { onToggle }));
        }
    }, [children, onToggle]);

    return (
        <>
            {
                show &&
                <div ref={modal} className={styles.cont}>
                    <div ref={fon} className={styles.fon} onClick={onToggle}></div>
                    {newChild}
                </div>
            }
        </>
    );
}