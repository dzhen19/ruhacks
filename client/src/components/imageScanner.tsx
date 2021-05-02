import React, { useState, useCallback } from "react";
import { boxTemplate, itemDict } from "../fixtures";
import axios from "axios";
import styles from "./imageScanner.module.scss";
import StorageList from "./storageList";
import { useDropzone } from "react-dropzone";

interface Props {
  boxOptions: Array<boxTemplate>;
  changeCount: (num: number, id: number) => void;
  fileURL: string;
  setFileURL: (newURL: string) => void;
  objectList: Array<Object>;
  setObjectList: (objectList: Array<Object>) => void;
}

const ImageScanner: React.FC<Props> = ({
  boxOptions,
  changeCount,
  fileURL,
  setFileURL,
  objectList,
  setObjectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  //dictionary

  async function handleSubmission(file) {
    // e.preventDefault();
    setFileURL(URL.createObjectURL(file));
    setIsLoading(true);
    const form = new FormData();
    form.append("objectImage", file);
    await axios
      .post("/api/upload", form)
      .then((res) => {
        if (res.data.state === false) {
          alert(res.data.msg);
          setIsLoading(false);
          setFile(null);
          setIsLoading(false);
        } else {
          const pathLink = "./" + res.data.path;
          axios
            .get("api/imageDetect", {
              params: {
                path: pathLink,
              },
            })
            .then(async (e) => {
              //cannot debug this issue
              await setObjectList(e.data);
              //iterate it through and use the identifible object to add
              axios.delete("api/imageDelete", {
                params: {
                  path: pathLink,
                },
              });
              e.data.forEach((object) => {
                if (itemDict[object.name]) {
                  changeCount(1, itemDict[object.name]);
                }
              });
              setIsLoading(false);
            });
        }
      })
      .catch((err) => console.error(err));
  }

  const fileHandler = async (e) => {
    setFile(e.target.files[0]);
    setObjectList(null);
  };

  const DropZone = () => {
    const onDrop = useCallback((acceptedFile) => {
      setObjectList(null);
      handleSubmission(acceptedFile[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={styles.dropZone}>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </div>
    );
  };

  console.log(objectList);
  return (
    <div style={{ textAlign: "center" }}>
      <DropZone />
      {/* <form className={styles.inputContainer} onSubmit={handleSubmission}> */}
      {/* <input id="fileInput" type="file" onChange={fileHandler} /> */}
      {/* <br /> */}
      {/* <button disabled={isLoading && file !== null} value="submit">
          {isLoading && file !== null ? "Loading ..." : "Submit"}
        </button> */}
      {/* </form> */}
      {objectList !== null && (
        <div className={styles.resultContainer}>
          <div
            style={{
              width: "50%",
              height: "30vh",
              backgroundImage: `url(${fileURL})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {/* list-style-position: outside; */}

          <ul
            style={{
              listStylePosition: "outside",
              textAlign: "left",
              padding: "0 3%",
            }}
          >
            <h5 style={{ textAlign: "center" }}>Items Identified</h5>
            {objectList.map((object) => (
              <StorageList item={object} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageScanner;
