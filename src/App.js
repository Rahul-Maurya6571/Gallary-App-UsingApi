import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
      indexValue: 0,
      textInput: "fruits",
    };
  }
  componentDidMount() {
    this.ReloadIMage();
  }
  ReloadIMage = () => {
    let REACT_APP_API_KEY = "Use Your Own Api Key";
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
        REACT_APP_API_KEY +
        "&tags=" +
        this.state.textInput +
        "&per_page=100&page=1000&format=json&nojsoncallback=1"
    )
      .then(function (response) {
        return response.json();
      })
      .then(
        function (j) {
          let picArray = j.photos.photo.map((pic) => {
            var srcPath =
              "https://farm" +
              pic.farm +
              ".staticflickr.com/" +
              pic.server +
              "/" +
              pic.id +
              "_" +
              pic.secret +
              ".jpg";
            return <img className="photo" alt="dogs" src={srcPath}></img>;
          });
          this.setState({ pictures: picArray });
        }.bind(this)
      );
  };
  NextHandler = () => {
    let CurrentIndex = this.state.indexValue;
    if (CurrentIndex === 1000) {
      CurrentIndex = 0;
    } else {
      CurrentIndex++;
    }

    this.setState({ indexValue: CurrentIndex });
  };
  PrevHandler = () => {
    let CurrentIndex = this.state.indexValue;
    if (CurrentIndex === 0) {
      CurrentIndex = 1000;
    } else {
      CurrentIndex--;
    }

    this.setState({ indexValue: CurrentIndex });
  };
  HandleChange = (e) => {
    this.setState({ textInput: e.target.value });
  };
  Delay = (function () {
    let timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <div>Picture #{this.state.indexValue}</div>
          {this.state.pictures[this.state.indexValue]}
        </p>
        <p>
          <input
            className="textInput"
            onChange={this.HandleChange}
            onKeyUp={() =>
              this.Delay(
                function () {
                  this.ReloadIMage();
                }.bind(this),
                1000
              )
            }
          ></input>
        </p>
        <div>
          <button onClick={this.PrevHandler}>prev</button>
          <button onClick={this.NextHandler}>next</button>
        </div>
      </div>
    );
  }
}
export default App;
