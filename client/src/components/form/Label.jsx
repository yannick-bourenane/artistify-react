import React from "react";

export default function Label({ label, isSelected }) {
  return (
    <option selected={isSelected && "selected"} value={label._id}>
      {label.name}
    </option>
  );
}
