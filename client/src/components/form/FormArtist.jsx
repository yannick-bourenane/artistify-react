import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// custom tools
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import APIHandler from '../../api/APIHandler';


class FormArtist extends Component {

  state = {
    name: "",
    style: "",
    description: "",
    isBand: Boolean,
    styles: []
  }

  componentDidMount() {
    if(this.props.mode === "create") {
      APIHandler
      .get('/styles')
      .then(res => {
        this.setState({styles: res.data.styles});
      })
      .catch(err => console.error(err))
    }


    if(this.props.mode === "edit") {
      APIHandler
      .get(`/artists/${this.props._id}`)
      .then(res => {
        APIHandler
        .get('/styles')
        .then(res => {
          this.setState({styles: res.data.styles});
        })
        .catch(err => console.error(err))
        this.setState({
          // name: res.data.name,
          // isBand: res.data.isBand,
          // description: res.data.description,
          // style: res.data.style
          ...res.data
        })
      })
      .catch(err => console.error(err))
    }
    
  }

  handleChange = e => {
    let val = e.target.value
    if (e.target.name === "isBand") {
      val = !!e.target.value
    }
    this.setState({ [e.target.name]: val })
  };

  handleSubmit = async e => {
    e.preventDefault();

    if(this.props.mode === "create") {
      APIHandler
      .post("/artists", {
        name: this.state.name,
        description: this.state.description,
        style: this.state.style,
        isBand: this.state.isBand
      })
      .then(res => console.log(res))
      .catch(err => console.error(err))
    }

    if(this.props.mode === "edit") {
      APIHandler
      .patch(`/artists/${this.props._id}`, {
        name: this.state.name,
        description: this.state.description,
        style: this.state.style,
        isBand: this.state.isBand
      })
      .then(res => console.log(res))
      .catch(err => console.error(err))
    }
    
  }
  

  render() {
    return this.state.styles ? (
      <>
        <form
        className="form"
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        >
          <label htmlFor="name" className="label">name</label>
          <input
          defaultValue={this.state.name && this.state.name}
          type="text" name="name" id="name" className="input" />

          <label htmlFor="description" className="label">description</label>
          <textarea
          defaultValue={this.state.description && this.state.description}
          name="description" id="description" className="input" />

          <label htmlFor="style" className="label">style</label>
          <select defaultValue="Choose a style" name="style" id="style" className="input">
              <option disabled>Choose a style</option>
              {this.state.styles.map((style, index) => (
                <option selected={this.state.style === style._id && "selected"} key={index} value={style._id}>{style.name}</option>
              ))}

          </select>

          <label className="label">is band?</label>
          <div>
            <label htmlFor="yes" className="label">yes</label>
            <input checked={this.state.isBand} value="yes" name="isBand" id="yes" type="radio" />

            <label htmlFor="no" className="label">no</label>
            <input checked={!this.state.isBand} value="" name="isBand" id="no" type="radio" />
          </div>


          <button className="btn">ok</button>
          

        </form>


        <h1 className="title diy">D.I.Y (FormArtist)</h1>
        <p>Code a form to Create/Update artists.</p>
        <LabPreview name="artistForm" isSmall />
        <hr />
      </>
    ) : <p>...loading</p>
  }
}

export default withRouter(FormArtist);
