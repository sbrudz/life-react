import React from "react";
import styles from "./app.module.css";
import Game from "../game";

const App = () => {
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1>Conway&apos;s Game of Life</h1>
      </header>
      <Game />
    </div>
  );
};

export default App;
