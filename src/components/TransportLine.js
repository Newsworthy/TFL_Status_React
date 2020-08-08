import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Col,
    Row,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LineModal from "./LineModal";

export class TransportLine extends Component {


    // setStatus = () => {
    //     this.setState({ status: [this.props.lineStatuses] })
    // }

    componentDidMount = (props) => {
        // console.log("Transport Line gave me this: " + this.props.tflData);
    };




    render() {
        const { id, name, modeName, modified, created, lineStatuses } = this.props.line;
        return (
            <Container fluid>
                <TransitionGroup className="lineList">
                    <Row className="alignMiddle" id={id}>
                        <Col xs="6">
                            <h2 className="lineName">{name}</h2>
                        </Col>
                        <Col className="text-center align-middle my-auto" xs="6">
                            <LineModal key={id} line={this.props.line} />


                            {/* Type: {modeName}
                                        Created: {created}
                                        Modified: {modified}
                                        Status: {status.statusSeverity}
                                        Reason: {status.reason} */}
                        </Col>
                    </Row>
                </TransitionGroup>
            </Container>
        );
    };
}

// PropTypes
TransportLine.propTypes = {
    line: PropTypes.object.isRequired,
}

export default TransportLine
