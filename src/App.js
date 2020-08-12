import React, { Component } from 'react';
import axios from 'axios';
import Lines from './components/Lines';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Container } from 'reactstrap';
import './App.css';

// console.log(`${process.env.REACT_APP_APP_ID}`);

class App extends Component {
  state = {
    tflData: [],
    lastUpdate: '',
  }

  axiosFunc = () => {
    // console.log(process.env);
    // console.log(process.env.PORT);
    // const APP_ID = `${process.env.REACT_APP_APP_ID}`;
    // const APP_KEY = `${process.env.REACT_APP_APP_KEY}`;
    // console.log('Here is what I got: ' + id + ' ' + key)
    axios.get('https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr,tflrail,tram/Status?detail=False&app_id=ee65a450&app_key=3db5817b87411911cbde2fcf1fd5516e')
      .then(res => this.setState({ tflData: res.data, lastUpdate: new Date() }));
    console.log("Axios updated the data.")
  }

  componentDidMount() {
    this.axiosFunc();
  };

  render() {
    // console.log(this.state.tflData);
    return (
      <div className="App">
        <Container>
          <Header lastUpdate={this.state.lastUpdate} />
          <Lines tflData={this.state.tflData} />
          <Footer />
        </Container>
      </div>

    )
  }

}
export default App;
