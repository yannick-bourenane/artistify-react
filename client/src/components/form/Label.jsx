import React from "react";

export default function Label({ label }) {
  return <option value={label._id}>{label.name}</option>;
}
