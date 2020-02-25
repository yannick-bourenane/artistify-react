import React, { Component } from "react";
// import FormComment from "../form/FormComment";
// import apiHandler from "../../api/APIHandler";
// import Comment from "./Comment";

export default class Comments extends Component {
  state = {
    comments: []
  };

  render() {

    return (
      <div className="comments">
        <p className="title">express y@self</p>
        <form className="form">
          <input placeholder="leave a comment here..." className="input"></input>
          <button className="btn">send!</button>
        </form>

        <div className="comment">

        </div>
      </div>
    );
  }
}
