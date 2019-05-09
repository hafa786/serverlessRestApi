import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";
import uuid from "uuid";
import { s3Upload } from "../libs/awsLib";


export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: "",
      user_limit:'',
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }
  handleImportUsers = async event =>{
    event.preventDefault();
    let records = [];
    this.setState({ isLoading: true });
    const errormessagebox = document.querySelector("#errormessagebox");
    fetch("https://randomuser.me/api/?page=30&results="+this.state.content)
      .then(response => response.json())
      .then(data =>{
          if (data.length > 0){
            let row = null;
            data.forEach(user => {
                  this.addNewRandomUsers({
                    userId: uuid.v1(),
                    noteId: uuid.v1(),
                    email: user.email,
                    gender : user.gender,
                    age: user.age[1],
                    createdAt: Date.now()
                  });
              });
          }
          else{
            errormessagebox.innerHTML = "No records founds";
          }
      });

  }
  async addNewRandomUsers(users) {
    return await API.post("notes", "/notes", {
      body: users,
    });
  }
  

  render() {
    return (
      <div className="NewNote">
      <div id="errormessagebox" style={{color: "red"}}></div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <select
              onChange={this.handleChange}
              value={this.state.user_limit}
              componentClass="textarea"
            >
            <option value="">Select the limit</option>
            <option value="10">10</option>
            <option value="100">100</option>
            <option value="500">500</option>
            </select>
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Importing New Random users records"
            loadingText="Importing…"
          />
        </form>
      </div>
    );
  }
}
