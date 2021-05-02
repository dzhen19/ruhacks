import React, { useState } from "react";
import StudioSelect from "../components/studioSelect";
import { allBoxes, testBin } from "../fixtures";
import Preview from "../components/preview";
import MetaControls from "../components/metaControls";
import axios from "axios";
import "./studio.css";

interface Props {}

export const Studio: React.FC<Props> = () => {
  const [boxOptions, setBoxOptions] = useState(allBoxes);
  const [result, setResult] = useState({ result: allBoxes, binInfo: testBin });
  const [loading, setLoading] = useState(false);

  const changeCount = async (num: number, idList: Array<number>) => {
    const newBoxOptions = JSON.parse(JSON.stringify(boxOptions));
    idList.forEach((id)=>{
      newBoxOptions.find((boxOption) => {
        if (boxOption.id === id) {
          boxOption.count += num;
          console.log(boxOption.displayName);
          console.log(boxOptions);
        }
      });
    })


    await setBoxOptions(newBoxOptions);
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post("/api/packit4meWrapper", boxOptions)
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const handleClear = () => {
    setBoxOptions(allBoxes);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          maxHeight: "100vh",
          flexDirection: "row",
        }}
      >
        <StudioSelect boxOptions={boxOptions} changeCount={changeCount} />
        <Preview APIResult={result} />
      </div>
      {/* <ClearButton handleClear={handleClear} />
      <SubmitButton handleSubmit={handleSubmit} loading={loading} /> */}
      <MetaControls
        handleClear={handleClear}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
};
