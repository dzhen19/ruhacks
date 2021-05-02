import React from "react";
import InputBar from "./inputBar";
import styles from "./boxOptions.module.scss";

export default function BoxOptions({ boxOptions, changeCount, myList }) {
  return (
    <div className={styles.container}>
      {boxOptions.map((boxType) => {
        if (!myList || boxType.count != 0) {
          return (
            <InputBar key={boxType.id} boxType={boxType} setVal={changeCount} />
          );
        }
      })}
      <br />
      <div style={{ textAlign: "right", marginRight: "2vw" }}></div>
    </div>
  );
}
