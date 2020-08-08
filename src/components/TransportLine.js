import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Container,
    Col,
    Row,
} from 'reactstrap';
import LineModal from "./LineModal";

export class TransportLine extends Component {

    componentDidMount = (props) => {

    };

    render() {
        const { id, name } = this.props.line;
        return (
            <Container fluid>
                <Row className="alignMiddle transportLine" id={id}>
                    <Col xs="6">
                        <h2 className="lineName">{name}</h2>
                    </Col>
                    <Col className="text-center align-middle my-auto" xs="6">
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
