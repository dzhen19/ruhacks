import React from "react";
import styles from "./boxOptions.module.scss";

export default function SubmitButton({ handleSubmit, loading }) {
  return (
    <div style={{ position: "fixed", top: "92%", left: "90%" }}>
      <button className={styles.submitButton} onClick={handleSubmit}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
}
