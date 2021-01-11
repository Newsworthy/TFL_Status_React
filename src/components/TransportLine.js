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
