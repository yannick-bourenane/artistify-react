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
    APIHandler
    .get('/styles')
    .then(res => {
      this.setState({styles: res.data.styles});
      console.log(this.state.styles)
    })
    .catch(err => console.error(err))
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleSubmit = async e => {
    e.preventDefault();
    
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
  

  render() {
    return this.state.styles ? (
      <>
        <form
        className="form"
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        >
          <label htmlFor="name" className="label">name</label>
          <input type="text" name="name" id="name" className="input" />

          <label htmlFor="description" className="label">description</label>
          <textarea name="description" id="description" className="input" />

          <label htmlFor="style" className="label">style</label>
          <select name="style" id="style" className="input">
            <option selected disabled>Choose a style</option>
            {this.state.styles.map((style, index) => (
              <option key={index} value={style._id}>{style.name}</option>
            ))}
          </select>

          <label className="label">is band?</label>
          <div>
            <label htmlFor="yes" className="label">yes</label>
            <input value="yes" name="isBand" id="yes" type="radio" />

            <label htmlFor="no" className="label">no</label>
            <input value="no" name="isBand" id="no" type="radio" />
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
