import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Lines from './components/Lines';
import TransportLine from './components/TransportLine';
import Header from './components/layout/Header';
import {
  Button,
  Container,
  Col,
  Row,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import './App.css';

class App extends Component {
  state = {
    tflData: []
  }

  componentDidMount() {
    axios.get('https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr,tflrail,tram/Status?detail=False&app_id=ee65a450&app_key=3db5817b87411911cbde2fcf1fd5516e')
      .then(res => this.setState({ tflData: res.data }));
  }

  render() {
    // console.log(this.state.tflData);
    return (
      <Router>
        <Route path="/" render={props => (
          <div className="App">
            <Container>
            <Header />
              <Lines tflData={this.state.tflData} />
            </Container>
          </div>
        )} />
      </Router>
    )
  }

}
export default App;
