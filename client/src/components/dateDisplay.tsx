import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./dateDisplay.module.scss";

export default function DateDisplay() {
  const [expressData, setExpressData] = useState<string>("");

  useEffect(() => {
    axios.get("/api/date").then((e) => {
      console.log(e);
      setExpressData(e.data);
    });
  }, []);

  return (
    <div className={styles.dateText}>Fetched from server: {expressData}</div>
  );
}
