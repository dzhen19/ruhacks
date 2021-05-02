import React from "react";
import styles from "./storageList.module.scss";

const StorageList = ({ item }) => {
  console.log(item);
  return (
    <li>
      {/* // className = {styles.itemContainer}> */}
      Item Name: {item.name}
      <br />
      Confidence Level: {item.score.toFixed(2) * 100} %
    </li>
  );
};

export default StorageList;
