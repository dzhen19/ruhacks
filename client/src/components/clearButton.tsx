import React from "react";
import styles from "./boxOptions.module.scss";

export default function ClearButton({ handleClear }) {
  return (
    <div style={{ position: "fixed", top: "87%", right: "2%" }}>
      <button
        className="button-primary"
        style={{ background: "#D22C3C", border: "#D22C3C" }}
        onClick={handleClear}
      >
        {"Clear Selection"}
      </button>
    </div>
  );
}
