import React from "react";

export default function Artist({ artist, isSelected }) {
  return (
    <option selected={isSelected && "selected"} value={artist._id}>
      {artist.name}
    </option>
  );
}
