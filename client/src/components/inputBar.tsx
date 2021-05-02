import React, { useRef, useState, useEffect, Suspense } from "react";
import styles from "./inputBar.module.scss";
import { boxTemplate } from "../fixtures";

interface Props {
  boxType: boxTemplate;
  setVal: (num: number, id: Array<number>) => void;
}

export const InputBar: React.FC<Props> = ({ boxType, setVal }) => {
  function increment(e) {
    const idList = [boxType.id]
    setVal(1, idList);
  }

  function decrement(e) {
    if (boxType.count > 0) {
      const idList = [boxType.id]
      setVal(-1, idList);
    }
  }
  return (
    <ul className={styles.inputBarContainer}>
      <img className={styles.boxImage} src={boxType.imgUrl} alt={"Box Image"} />
      <br />
      <div className={styles.boxInfo}>
        <h5 style={{ marginBottom: "10px" }}>
          {boxType.displayName + " " + boxType.size.toUpperCase()}
        </h5>
        <h6>
          {"L " +
            boxType.l +
            "'' x " +
            "W " +
            boxType.w +
            "'' x " +
            "H " +
            boxType.h +
            "''"}
        </h6>
      </div>
      <div className={styles.boxNum}>
        <button onClick={increment}>
          <b>+</b>
        </button>
        {boxType.count}
        <button onClick={decrement}>
          <b>-</b>
        </button>
      </div>
    </ul>
  );
};

export default InputBar;
