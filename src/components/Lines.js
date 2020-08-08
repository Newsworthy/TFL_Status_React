import React, { Component } from 'react';
import TransportLine from './TransportLine';

class Lines extends Component {
    render() {
        return this.props.tflData.map((line) => (
            <TransportLine key={line.id} line={line} />
        ));
    }
}

export default Lines
