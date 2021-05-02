import React, { useState } from "react";
import styles from "./studioSelect.module.scss";
import BoxOptions from "./boxOptions";
import ImageScanner from "./imageScanner";

const StudioSelect = ({ boxOptions, changeCount }) => {
  const labels = ["All Items", "My Items", "Image Uploader"];
  const [active, setActive] = useState<string>(labels[0]);
  const [fileURL, setFileURL] = useState<string>("");
  const [objectList, setObjectList] = useState(null);

  const Tab = ({ label }) => {
    return (
      <div
        className={active === label ? styles.activeTab : styles.tab}
        onClick={() => setActive(label)}
      >
        <span className={styles.textSpan}>
          <h5>{label}</h5>
        </span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        {labels.map((label) => (
          <Tab label={label} />
        ))}
      </div>

      {active === labels[0] && (
        <BoxOptions
          boxOptions={boxOptions}
          changeCount={changeCount}
          myList={false}
        />
      )}
      {active === labels[1] && (
        <BoxOptions
          boxOptions={boxOptions}
          changeCount={changeCount}
          myList={true}
        />
      )}
      {active === labels[2] && (
        <ImageScanner
          boxOptions={boxOptions}
          changeCount={changeCount}
          fileURL={fileURL}
          setFileURL={setFileURL}
          objectList={objectList}
          setObjectList={setObjectList}
        />
      )}
    </div>
  );
};
export default StudioSelect;
