import React,{useState} from "react";
import {boxTemplate, itemDict} from "../fixtures";
import axios from "axios";
import styles from "./imageScanner.module.scss";
import StorageList from "./storageList"
import { O_EXCL } from "node:constants";


interface Props {
    boxOptions: Array<boxTemplate>,
    changeCount:  (num: number, id: number) =>void,
    fileURL: string,
    setFileURL: (newURL:string) => void,
    objectList: Array<Object>,
    setObjectList: (objectList: Array<Object>)=>void,
}

const ImageScanner: React.FC<Props> = ({boxOptions,changeCount, fileURL, setFileURL, objectList, setObjectList}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState(null);
    //dictionary

    async function handleSubmission(e){
        e.preventDefault();
        setFileURL(URL.createObjectURL(file));
        setIsLoading(true);
        const form = new FormData();
        form.append('objectImage', file);
        await axios
        .post("/api/upload", form)
        .then((res) => {
            if(res.data.state === false){
                alert(res.data.msg);
                setIsLoading(false);
                setFile(null); 
                setIsLoading(false);
            }
            else{
                const pathLink = "./"+  res.data.path;
                axios.get("api/imageDetect", {
                    params:{
                        path: pathLink,
                    }
                })
                .then(async (e)=>{
                    //cannot debug this issue
                    await setObjectList(e.data);
                    //iterate it through and use the identifible object to add
                    axios.delete("api/imageDelete", {
                        params:{
                            path: pathLink,
                        }
                    });
                    e.data.forEach(object => {
                        if(itemDict[object.name]){
                            changeCount(1, itemDict[object.name]);
                        }
                    });
                    setIsLoading(false);
                })
            }
        })
        .catch((err) => console.error(err));
    };

    const fileHandler= async(e)=>{
        setFile(e.target.files[0]);
        setObjectList(null);
    }

    return(
        <div style={{textAlign:"center"}}>
            <form className = {styles.inputContainer} onSubmit={handleSubmission}>
                <label>Please Upload A Photo of Everything You Wish to Store (we only Accept Images)</label>
                <br/>
                <input id="fileInput" type="file" onChange={fileHandler}/>
                <br/>
                <button className={styles.submitButton}  disabled ={isLoading && file!==null} value="submit">
                    {isLoading && file!==null ? "Loading ..." : "Submit"}
                </button>
            </form>
            {objectList !== null && 
            <div className={styles.resultContainer}>
                <img className={styles.resultImage} src={fileURL}/>
                <div className={styles.itemContainer}>
                    <h2 style={{textAlign:"center"}}>Items Identified</h2>
                    {objectList.map((object) =>(
                        <StorageList item={object}/>
                    ))}
                </div>
            </div>
            }
        </div>
    );
    
}

export default ImageScanner