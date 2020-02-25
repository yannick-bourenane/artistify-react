import React, { useState, useContext, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import UserContext from "../auth/UserContext";
// import Comments from "../components/comment/Comments";
// import FormatDate from "../components/FormatDate";
// import Stars from "../components/star/Stars";
import LabPreview from "../components/LabPreview";
// styles
import "../styles/album.css";
import "../styles/comment.css";
import "../styles/star.css";

export default function Album({ match }) {
  /*   const userContext = useContext(UserContext);
  const { currentUser } = userContext; */

  const [album, setAlbum] = useState({});

  useEffect(() => {
    apiHandler.get(match.url).then(apiRes => {
      setAlbum(apiRes.data);
    });
  }, []);

  return album.artist ? (
    <>
      <div className="page album">
        <h1 className="title">{album.title}</h1>
        <img className="cover" src={album.cover} alt={album.title} />
        <p className="publishing">
          Album by {album.artist.name && album.artist.name} published the{" "}
          {new Date(album.releaseDate).toLocaleDateString()}{" "}
          <b>by {album.label.name && album.label.name}</b>
        </p>
        <p className="description">{album.description}</p>
      </div>
      <h1 className="title diy">D.I.Y (Stars)</h1>
      <p>
        The Stars component allow the end-users to rate an artist/album.
        <br />
        The black stars represent the average rate for a given resource.
        <br />
        The yellow stars represent the logged in user rate fro the current
        album.
        <br />
        Bonus: make it modular to rate labels/styles as well.
      </p>
      <hr />
      <h1 className="title diy">D.I.Y (Comments)</h1>
      <p>
        Import a custom {`<Comments />`} allowing the end-users to post comments
        in database related to the current artist.
        <br />
      </p>
      <LabPreview name="album" />
    </>
  ) : (
    <p>No album yet</p>
  );
}
