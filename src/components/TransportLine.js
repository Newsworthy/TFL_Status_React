import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Container,
    Col,
    Row,
} from 'reactstrap';
import LineModal from "./LineModal";
import UIfx from 'uifx';
import dual_beep from '.././beep_beep.mp3'

export class TransportLine extends Component {

    componentDidUpdate(prevProps) {
        // console.log("Prevprops: " + JSON.stringify(prevProps.line));
        if (JSON.stringify(prevProps.line) !== JSON.stringify(this.props.line)) {
            console.log("Something changed");
            const beep = new UIfx(
              dual_beep,
              {
                volume: 0.5,
              });
            beep.play();
        } else {
            console.log("Nothing changed.")
        }
    }
    render() {
        const { id, name } = this.props.line;
        return (
            <Container fluid>
                <Row xs="1" sm="2" className="alignMiddle transportLine" id={id}>
                    <Col>
                        <h2 className="lineName">{name}</h2>
                    </Col>
                    <Col className="text-center alignMiddle my-auto">
                        <LineModal key={id} line={this.props.line} />
                    </Col>
                </Row>
            </Container>
        );
    };
}

// PropTypes
TransportLine.propTypes = {
    line: PropTypes.object.isRequired,
}

export default TransportLine
