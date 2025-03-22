import GameComp from "./components/GameComp";
import "./css/index.css";
import styles from './css/app.module.css';

const App = () => {
    return (
        <div className="app">
            <div className={styles.content}>
                <GameComp />
            </div>
        </div>
    );
};

export default App;