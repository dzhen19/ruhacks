import React,{useState, useEffect} from "react";
import InputBar from "./inputBar";
import styles from "./boxOptions.module.scss";
import { BiSearchAlt2 } from "react-icons/bi";


export default function BoxOptions({ boxOptions, changeCount, myList}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchInputHandle=(boxType)=>{
    return boxType.displayName.toLowerCase().includes(searchKeyword.toLowerCase());
  }

  const inputHandler= (e)=>{
    setSearchKeyword(e.target.value);
  }

  return (
    <div>
      <div className={styles.searchContainer}> 
        <BiSearchAlt2 className={styles.searchIcon}/>
        <input className={styles.searchBar} type="text" value={searchKeyword} onChange={inputHandler}/>
      </div>
      <div className={styles.container}>
        {boxOptions.map((boxType) => {
          if ((!myList || boxType.count != 0) &&searchInputHandle(boxType)) {
            return (
              <InputBar key={boxType.id} boxType={boxType} setVal={changeCount} />
            );
          }
        })}
        <br />
        <div style={{ textAlign: "right", marginRight: "2vw" }}></div>
      </div>
    </div>

  );
}
