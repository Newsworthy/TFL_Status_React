import React, { Component } from 'react';
import axios from 'axios';
import Lines from './components/Lines';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Container } from 'reactstrap';
import './App.css';
import moment from 'moment';
// import './testData.json';

class App extends Component {
  state = {
    tflData: [],
    lastUpdate: '',
    loading: false,
  }

  async axiosFunc() {
    try {
      // DEV must use direct to TFL API, BUILD must use direct file link
      // Get your own TFL developer access at https://tfl.gov.uk/info-for/open-data-users/
      // A testData.json file is now included in the public folder for testing. It used the following address: https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr,tflrail,tram/Status?detail=False
      const res = await axios.get('./testData.json');

      const updateTime = new Date();
      this.setState({
        tflData: res.data,
        lastUpdate: moment(updateTime).format("dddd, MMMM Do YYYY, HH:mm:ss "),
        loading: false,
      })
    } catch (e) {
      console.log("ERROR: " + e);
    }
  }

  componentDidMount() {
    this.axiosFunc();
    setInterval(() => {
      this.setState({loading: true});
      this.axiosFunc();
    }, 30000)
  };

  render() {
    return (
      <div className="App" style={bodyStyle}>
        <Container>
          <Header lastUpdate={this.state.lastUpdate} />
          <Lines tflData={this.state.tflData} />
          <Footer />
        </Container>
      </div>

    )
  }
}

const bodyStyle = {
  background: '#555',
  color: '#fff',
  padding: '30px'
}

export default App;
