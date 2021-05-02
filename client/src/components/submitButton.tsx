import React from "react";
import styles from "./boxOptions.module.scss";

export default function SubmitButton({ handleSubmit, loading }) {
  return (
    <div style={{ position: "fixed", top: "92%", right: "2%" }}>
      <button className="button-primary" onClick={handleSubmit}>
        {loading ? "Loading..." : "Arrange"}
      </button>
    </div>
  );
}
