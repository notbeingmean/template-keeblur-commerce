"use client";
import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";

function Backoffice() {
  const [value, setValue] = useState("");
  return (
    <div>
      <h1>Backoffice</h1>
      <div>
        <MDEditor
          value={value}
          onChange={(val) => setValue(val || "")}
          highlightEnable={false}
        />
      </div>
    </div>
  );
}

export default Backoffice;
