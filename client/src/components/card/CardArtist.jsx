import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  return data ? (
    <div>
      <Link to={"/artists/"+ data._id}>
        <div>
          <div className="color" style={{backgroundColor: data.style.color}}></div>
          <p className="title">{data.name}</p>
        </div>
      </Link>
    </div>
  ) : <p>...loading</p>
}
