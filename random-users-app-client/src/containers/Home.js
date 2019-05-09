import React, { Component } from "react";
import "./Home.css";
import { API } from "aws-amplify";

export default class Home extends Component {
    constructor(props) {
        super(props);
      }
    // find the average age according to records
    findAverageAge = event => {
        event.preventDefault();
        let records = [];
        this.setState({ isLoading: true });
        const resultBox = document.querySelector("#resultBox");
        records = this.getUsersList();
        if (records.length > 0){
            let totalNumberOfRecord= records.length;
            let ageSummation = 0;
            for(let i=0; i<totalNumberOfRecord;i++) {
                ageSummation = ageSummation + records[i].age;
            };
            let result = ageSummation/totalNumberOfRecord;
            resultBox.innerHTML = '<b>Average age:  </b>' + result.toString();
        }
        else{
            resultBox.innerHTML = '<b>Average age:  </b> No record found';
        }
    }
    // find the oldest user with respect to age
    findOldrestAge = event => {
        event.preventDefault();
        let records = [];
        this.setState({ isLoading: true });
        const resultBox = document.querySelector("#resultBox");
        records.push(this.getUsersList());
        try{
            if (records.length > 0){
                records.sort(function(a, b) {
                return b.age - a.age;
                });
                resultBox.innerHTML = '<b>User with Oldest age:  </b>' + records[0].age.toString();
            }
            else{
                resultBox.innerHTML = '<b>User with Oldest age:  </b> No record found';
            }
        }
        catch (e) {
            resultBox.innerHTML = e;
        }
        
          
    }
    // Find the youngest user with resect to age
    findYoungestAge = event => {
        event.preventDefault();
        let records = [];
        this.setState({ isLoading: true });
        const resultBox = document.querySelector("#resultBox");
        records.push(this.getUsersList());
        try{
            if (records){
                records.sort(function(a, b) {
                return a.age - b.age;
                });
                //console.log(records);
                resultBox.innerHTML = '<b>User with youngest age:  </b>' + records[0].age.toString();
            }
            else{
                resultBox.innerHTML = '<b>User with youngest age:  </b> No record found';
            }
        }
        catch (e) {
            resultBox.innerHTML = e;
        }          
    }
    findLocationNorthMost = event => {
        alert("in progess");  
    }
    findLocationEastMost = event => {
          alert("in progress");
    }
    async getUsersList() {
        return API.get("notes", "/notes");
      }
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Random Users App</h1>
          <p>A simple random users taking app</p>  
        </div><br></br>
        <div id="resultBox"></div>
        <div className="row">
            <hr></hr>
            <h4>Average age</h4>
            <button onClick={this.findAverageAge} className="btn btn-success">Average age</button><br></br>
            <hr></hr>
            <h4>Oldest age, and the name for that person</h4>
            <button onClick={this.findOldrestAge} className="btn btn-success">Oldest age</button><br></br>
            <hr></hr>
            <h4>Youngest age, and the name for that person</h4>
            <button onClick={this.findYoungestAge} className="btn btn-success">Youngest age</button><br></br>
            <hr></hr>
            <h4>Location of the northern most person, and the name of that person</h4>
            <button onClick={this.findLocationNorthMost} className="btn btn-success">Location of the northern most person</button><br></br>
            <hr></hr>
            <h4>Location of the southern most person, and the name of that person</h4>
            <button onClick={this.findLocationEastMost} className="btn btn-success">Location of the southern most person</button><br></br>
        </div>
      </div>
      
    );
  }
}
