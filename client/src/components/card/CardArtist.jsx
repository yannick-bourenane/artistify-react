import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ 
  name,
  style,
  key,
  artistId
 }) {
  return style ? (
    <div className="cards">
      <Link to={"/artists/"+ artistId} key={key}>
        <div className="card">
          <div className="color" style={{backgroundColor: style.color}}></div>
          <p className="title">{name}</p>
        </div>
      </Link>
    </div>
  ) : <p>...loading</p>
}
