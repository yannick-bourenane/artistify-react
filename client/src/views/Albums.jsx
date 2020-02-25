import React, { useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import CardAlbum from "../components/card/CardAlbum";
import List from "../components/List";
import LabPreview from "../components/LabPreview";
// styles
import "../styles/card.css";
import "../styles/icon-favorite.css";

export default function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    apiHandler.get("/albums").then(apiRes => {
      setAlbums(apiRes.data.albums);
    });

    return () => {};
  }, []);

  return (
    <React.Fragment>
      <h1 className="title diy">Albums</h1>
      {/*       <div className="cards">
        {albums ? (
          albums.map((album, i) => <CardAlbum data={album} key={i} />)
        ) : (
          <p>No albums yet</p>
        )}
      </div> */}

      <hr />
      <h1 className="title">All albums</h1>
      <List
        data={albums}
        Component={CardAlbum}
        cssList="cards"
        cssItem="card album"
      />
    </React.Fragment>
  );
}
