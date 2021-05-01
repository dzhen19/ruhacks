import React, { useRef, useState, useEffect, Suspense } from "react";
import styles from "./inputBar.module.scss";
import { boxTemplate } from "../fixtures";

interface Props {
  boxType: boxTemplate;
  setVal: (num: number, id: number) => void;
}

export const InputBar: React.FC<Props> = ({ boxType, setVal }) => {
  function increment(e) {
    setVal(1, boxType.id);
  }

  function decrement(e) {
    if (boxType.count > 0) {
      setVal(-1, boxType.id);
    }
  }
  return (
    <ul className={styles.inputBarContainer}>
      <img className={styles.boxImage} src={boxType.imgUrl} alt={"Box Image"} />
      <br />
      <div className={styles.boxInfo}>
        <h5>
          {boxType.displayName + " " + boxType.size.toUpperCase() + " Box"}
        </h5>
        <h5>
          {"L" + boxType.l + " x " + "W" + boxType.w + " x " + "H" + boxType.h}
        </h5>
      </div>
      <div className={styles.boxNum}>
        <button
          className={styles.choiceButton}
          style={{ backgroundColor: "lime" }}
          onClick={increment}
        >
          <h2>+</h2>
        </button>

        <h2>{boxType.count}</h2>
        <button
          className={styles.choiceButton}
          style={{ backgroundColor: "lightcoral" }}
          onClick={decrement}
        >
          <h2>-</h2>
        </button>
      </div>
    </ul>   
  );
};

export default InputBar;
