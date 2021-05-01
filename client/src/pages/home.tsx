import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import styles from "./home.module.scss";

interface Props{}


export const Home: React.FC<Props> = () => {
    const history = useHistory();

    const nextPage=(e)=>{
        history.push("/studio");
    }

    return(
        <div  style={{textAlign:"center"}}>
            <h1 >
                Welcome to Box It Website
            </h1>
            <button className={styles.submitButton} onClick={nextPage}>Next Page</button>

        </div>
    );
};

