import React, { useState } from "react";
import StudioSelect from "../components/studioSelect";
import { boxTemplate, allBoxes, testResult } from "../fixtures";
import Preview from "../components/preview";
import SubmitButton from "../components/submitButton";
import axios from "axios";
import "./studio.css";

interface Props {}

export const Studio: React.FC<Props> = () => {
  const [boxOptions, setBoxOptions] = useState(allBoxes);
  const [result, setResult] = useState(testResult);
  const [loading, setLoading] = useState(false);

  const changeCount = (num: number, id: number) => {
    let newBox = boxOptions[id];
    newBox.count = boxOptions[id].count + num;

    setBoxOptions(
      boxOptions.map((boxType) =>
        boxType.id === id ? { ...boxType, newBox } : boxType
      )
    );
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post("/api/packit4meWrapper", boxOptions)
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "row",
        }}
      >
        <StudioSelect boxOptions={boxOptions} changeCount={changeCount} />
        <Preview APIResult={result} />
      </div>
      <SubmitButton handleSubmit={handleSubmit} loading={loading} />
    </>
  );
};
