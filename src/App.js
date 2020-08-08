import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Lines from './components/Lines';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import {
  Container
} from 'reactstrap';
import './App.css';



class App extends Component {
  state = {
    tflData: [],
    lastUpdate: '',
  }

  axiosFunc = () => {
    console.log(process.env);
    const APP_ID = process.env.APP_ID;
    const APP_KEY = process.env.APP_KEY;
    // console.log('Here is what I got: ' + id + ' ' + key)
    axios.get('https://cors-anywhere.herokuapp.com/https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr,tflrail,tram/Status?detail=False&app_id=' + APP_ID + '&app_key=' + APP_KEY)
      .then(res => this.setState({ tflData: res.data, lastUpdate: new Date() }));
    console.log("Axios updated the data.")
  }

  componentDidMount() {
    this.axiosFunc();
  };

  render() {
    // console.log(this.state.tflData);
    return (
      <Router>
        <Route path="/" render={props => (
          <div className="App">
            <Container>
              <Header lastUpdate={this.state.lastUpdate} />
              <Lines tflData={this.state.tflData} />
              <Footer />
            </Container>
          </div>
        )} />
      </Router>
    )
  }

}
export default App;
