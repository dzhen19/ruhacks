import React from "react";
import styles from "./storageList.module.scss"


const StorageList = ({item}) => {
    console.log(item);
    return(
        <div className = {styles.itemContainer}>
            Item Name: {item.name}
            <br/>
            Confidence Level:{item.score}
        </div>
    )
}

export default StorageList