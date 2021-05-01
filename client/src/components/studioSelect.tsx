import React, {useState} from "react";
import styles from "./studioSelect.module.scss";
import BoxOptions from "./boxOptions";
import ImageScanner from "./imageScanner"


const StudioSelect = ({boxOptions, changeCount}) => {
    const [displayComp, setDisplayComp]= useState<number>(1);
    const [fileURL, setFileURL]= useState<string>("")
    const [objectList, setObjectList]= useState(null);
    const buttonChange1= ()=>{
        setDisplayComp(1);
    }
    const buttonChange2= ()=>{
        setDisplayComp(2);
    }    
    const buttonChange3= ()=>{
        setDisplayComp(3);
    }
    return(
        <div className={styles.container}>
            <h1 style={{ marginLeft: "2vw" }}>Box-it Platform</h1>
            <h4 style={{ marginLeft: "2vw" }}>Unit (British Imperial)</h4>
            <div className={styles.btnContainer}>
                <button className={styles.btn} disabled={displayComp===1} onClick={buttonChange1}>
                    All Items
                </button>
                <button className={styles.btn} disabled={displayComp===2} onClick={buttonChange2}>
                    My Items
                </button>
                <button className={styles.btn} disabled={displayComp===3} onClick={buttonChange3}>
                    Image Scanner
                </button>
            </div>

            {displayComp===1 && <BoxOptions boxOptions={boxOptions} changeCount={changeCount} myList ={false}/>}
            {displayComp===2 && <BoxOptions boxOptions={boxOptions} changeCount={changeCount} myList ={true}/>}
            {displayComp===3 && <ImageScanner boxOptions={boxOptions} changeCount={changeCount} fileURL={fileURL} setFileURL={setFileURL} objectList={objectList} setObjectList = {setObjectList} />}


        </div>
    )
    
}
export default StudioSelect