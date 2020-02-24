import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardAlbum({ data }) {
  return (
    <div className="card album">
      <h2 className="title">{data.title}</h2>
      <Link to={"albums/" + data._id}>
        <img className="cover" src={data.cover} alt={data.title} />
      </Link>
    </div>
  );
}
