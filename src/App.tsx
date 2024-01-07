import GameComp from "./components/GameComp";
import "./css/index.css";
import styles from './css/app.module.css';

const App = () => {
    return (
        <div className="app">
            <div className={styles.content}>
                <h2>Disciples: annals of Nevendaar</h2>
                <GameComp />
                <div>
                    <p>
                        To move Camera use keyboard arrows;
                        <br/>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;