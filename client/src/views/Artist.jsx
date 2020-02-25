import React, { useContext, useEffect, useState } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
// import CardAlbum from "../components/card/CardAlbum";
import Comments from "../components/comment/Comments";
// import List from "../components/List";
// import Stars from "../components/star/Stars";
import UserContext from "./../auth/UserContext";
import LabPreview from "../components/LabPreview";
// styles
import "./../styles/artist.css";
import "./../styles/comment.css";
import "./../styles/star.css";

export default function Artist({ match }) {

  const [artistInfo, setArtistInfo] = useState();
  const [artistAlbums, setArtistAlbums] = useState();

  useEffect(() => {
    apiHandler
      .get(match.url)
      .then(infos => {
        console.log(infos)
        setArtistInfo(infos.data.artistInfo)
        setArtistAlbums(infos.data.artistAlbums)
        
      })
      .catch(err => console.log(err))

  }, [match.url])
  
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  
  return artistInfo && artistAlbums ? (
    <div>
      <div className="page artist">
        <h1 className="title">{artistInfo.name}</h1>
        <p className="description">{artistInfo.description}</p>
        
        <div className="discography">
          <h1 className="title">Discography</h1>
          <div className="albums">
            {artistAlbums.length === 0 ? "Sorry, no data yet..." :
            artistAlbums.map((album, i) => (
              <div key={i}>
                <img src={album.cover} alt="cover" />
                <p className="title">{album.title}</p>
              </div>
            ))
            }
          </div> 
        </div>

        <Comments />
      </div>

    </div>
  ) : <p>...loading</p>
}
