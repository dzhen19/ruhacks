import React from "react";

export default function metaControls({ handleSubmit, handleClear, loading }) {
  return (
    <div
      style={{ position: "fixed", top: "87%", right: "2%", display: "grid" }}
    >
      <button className="button-primary" onClick={handleSubmit}>
        {loading ? "Loading..." : "Arrange"}
      </button>

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
