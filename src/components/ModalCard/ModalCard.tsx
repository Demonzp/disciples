import styles from "./modal-card.module.css";

export default function ModalCard({ title, onHide = () => { }, children }:{
    children?: JSX.Element[] | JSX.Element | React.ReactElement,
    onHide?: () => any,
    title?: string
}){
    return (
      <div className={styles.card}>
        <div className={styles.head}>
          <label>{title}</label>
          <button className={styles.buttonClose} onClick={onHide}>X</button>
        </div>
        {children}
      </div>
    );
}