import React, { Component } from 'react';
import TransportLine from './TransportLine';
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Col,
    Row,
    ListGroup,
    ListGroupItem
} from 'reactstrap';


class Lines extends Component {
    render() {
        // console.log("Lines.js gave me this: " + this.props.tflData);
        return this.props.tflData.map((line) => (
            <TransportLine key={line.id} line={line} />
        ));
    }
}

Lines.propTypes = {
    lines: PropTypes.array.isRequired,

}

export default Lines
