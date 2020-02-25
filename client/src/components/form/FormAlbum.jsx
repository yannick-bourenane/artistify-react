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
  state = {};

  componentDidMount() {
    this.props.mode === "edit"
      ? apiHandler
          .get("/albums/" + this.props._id)
          .then(resAlbums => {
            apiHandler
              .get("/labels")
              .then(resLabels => {
                apiHandler
                  .get("/artists")
                  .then(resArtists => {
                    this.setState({
                      ...resAlbums.data,
                      labels: resLabels.data.labels,
                      artists: resArtists.data.artists
                    });
                    console.log(this.state);
                  })
                  .catch(err => {
                    console.error(err);
                  });
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(err => console.log(err))
      : apiHandler
          .get("/labels")
          .then(resLabels => {
            apiHandler
              .get("/artists")
              .then(resArtists => {
                this.setState({
                  labels: resLabels.data.labels,
                  artists: resArtists.data.artists
                });
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(err => {
            console.error(err);
          });
  }

  handleCover = e => {
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
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state)
    );
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
      if (this.props.mode === "edit") {
        const apiRes = await apiHandler.patch("/albums/" + this.props._id, fd);
        console.log(apiRes);
      } else {
        const apiRes = await apiHandler.post("/albums", fd);
        console.log(apiRes);
      }
    } catch (apiErr) {
      console.log(apiErr);
    }
  };
  render() {
    return (
      <>
        {this.props.mode === "edit" ? (
          <h1 className="title diy">Edit an Album</h1>
        ) : (
          <h1 className="title diy">Create an Album</h1>
        )}
        <form
          onChange={this.handleForm}
          onSubmit={this.handleSubmit}
          className="form"
        >
          <label className="label" htmlFor="title">
            title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="input"
            defaultValue={this.state.title && this.state.title}
          />
          <label className="label" htmlFor="artist">
            Artist
          </label>
          <select
            className="input"
            name="artist"
            id="artist"
            defaultValue="Pick an artist"
          >
            <option disabled>Pick an artist</option>
            {this.state.artists &&
              this.state.artists.map((artist, i) => (
                <Artist
                  isSelected={this.state.artist === artist._id ? true : false}
                  artist={artist}
                  key={i}
                />
              ))}
          </select>
          <label className="label" htmlFor="label">
            label
          </label>
          <select
            className="input"
            name="label"
            id="label"
            defaultValue="Pick a label"
          >
            <option disabled>Pick a label</option>
            {this.state.labels &&
              this.state.labels.map((label, i) => (
                <Label
                  isSelected={this.state.label === label._id ? true : false}
                  label={label}
                  key={i}
                />
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
            defaultValue={
              this.state.releaseDate && this.state.releaseDate.substr(0, 10)
            }
          />
          <label className="label" htmlFor="cover">
            Cover
          </label>
          <label
            style={
              this.state.imgPreview
                ? this.state.imgPreview && {
                    backgroundImage: `url(${this.state.imgPreview})`
                  }
                : this.state.cover && {
                    backgroundImage: `url(${this.state.cover})`
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
            onChange={this.handleCover}
            defaultValue={this.state.cover && this.state.cover}
          />
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            className="input"
            type="text"
            name="description"
            id="description"
            defaultValue={this.state.description && this.state.description}
          />
          <button className="btn">
            {this.props.mode === "edit" ? "Edit" : "Create"}
          </button>
        </form>
        <LabPreview name="albumForm" isSmall />
      </>
    );
  }
}

export default withRouter(FormAlbum);
