import React from "react";

export default function Artist({ artist }) {
  return <option value={artist._id}>{artist.name}</option>;
}
