import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/APIHandler";
import Label from "./Label";
import Artist from "./Artist";
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

class FormAlbum extends Component {
  state = {
    imgPreview:
      "https://s1.qwant.com/thumbr/0x380/3/e/38241f096fcbc253212fd57ad2acbab0a7fdf0eab51d8e9790ab3f01027e75/default.jpeg?u=https%3A%2F%2Flargeasse.fr%2Fwp-content%2Fuploads%2F2015%2F05%2Fdefault.jpeg&q=0&b=1&p=0&a=1"
  };

  componentDidMount() {
    apiHandler
      .get("/labels")
      .then(res => {
        this.setState({ labels: res.data.labels });
        apiHandler
          .get("/artists")
          .then(resArtists => {
            this.setState({ artists: resArtists.data.artists });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleAvatar = e => {
    this.setState(
      {
        cover: e.target.files[0]
      },
      () => console.log(this.state.cover)
    );

    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      this.setState({
        imgPreview: reader.result
      });
    };
  };
  handleForm = e => {
    if (e.target.name === "cover") return;
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", this.state.title);
      fd.append("releaseDate", this.state.releaseDate);
      fd.append("artist", this.state.artist);
      fd.append("cover", this.state.cover);
      fd.append("description", this.state.description);
      fd.append("label", this.state.label);
      const apiRes = await apiHandler.post("/albums", fd);
      console.log(apiRes);
    } catch (apiErr) {
      console.log(apiErr);
    }
  };
  render() {
    return (
      <>
        <h1 className="title diy">Create an Album</h1>
        <form
          onChange={this.handleForm}
          onSubmit={this.handleSubmit}
          className="form"
        >
          <label className="label" htmlFor="title">
            title
          </label>
          <input type="text" name="title" id="title" className="input" />
          <label className="label" htmlFor="artist">
            Artist
          </label>
          <select className="input" name="artist" id="artist">
            <option defaultValue="" selected disabled>
              Pick an artist
            </option>
            {this.state.artists &&
              this.state.artists.map((artist, i) => (
                <Artist artist={artist} key={i} />
              ))}
          </select>
          <label className="label" htmlFor="label">
            label
          </label>
          <select className="input" name="label" id="label">
            <option defaultValue="" selected disabled>
              Pick a label
            </option>
            {this.state.labels &&
              this.state.labels.map((label, i) => (
                <Label label={label} key={i} />
              ))}
          </select>

          <label className="label" htmlFor="releaseDate">
            Release date
          </label>
          <input
            className="input"
            type="date"
            name="releaseDate"
            id="releaseDate"
          />
          <label className="label" htmlFor="cover">
            Cover
          </label>
          <label
            style={
              this.state.imgPreview && {
                backgroundImage: `url(${this.state.imgPreview})`
              }
            }
            className="label img-preview"
            htmlFor="cover"
          ></label>
          <input
            className="input is-hidden"
            type="file"
            name="cover"
            id="cover"
            onChange={this.handleAvatar}
          />
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            className="input"
            type="text"
            name="description"
            id="description"
          />
          <button className="btn">Create</button>
        </form>
        <LabPreview name="albumForm" isSmall />
      </>
    );
  }
}

export default withRouter(FormAlbum);
