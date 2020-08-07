import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Col,
    Row,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from "react-transition-group";

export class TransportLine extends Component {
    state = {
        status: []
    }

    componentDidMount = (props) => {
        // console.log("Transport Line gave me this: " + this.props.tflData);
    };

    // buttonColor(status) {
    //     if (status.statusSeverityDescription === 'Good Service') {
    //         return 'success';
    //     }
    //     if (status.statusSeverityDescription === 'Planned Closure') {
    //         return 'danger';
    //     }
    //     return 'warning';
    // }


    render() {
        const { id, name, modeName, modified, created, lineStatuses } = this.props.line;
        
        // console.log("TransportLine gave me this: " + JSON.stringify(lineStatuses));
        return (
            <Container fluid>
                    <TransitionGroup className="lineList">
                        <Row className="alignMiddle" id={id}>
                            <Col xs="6">
                                <h2 className="lineName">{name}</h2>
                            </Col>
                            {this.props.line.lineStatuses.map((status) => (                               
                                <Col className="text-center align-middle my-auto" xs="6">
                                    <Button
                                        className="btn btn-lg btn-block"
                                        style={{ 'className' : status.statusSeverityDescription === 'Good Service' ? 'btn-success' : status.statusSeverityDescription === 'Planned Closure' ? 'btn-danger' : 'btnwarning' }}
                                    >
                                        <h4>{status.statusSeverityDescription}</h4>
                                    </Button>
                                    {/* Type: {modeName}
                                        Created: {created}
                                        Modified: {modified}
                                        Status: {status.statusSeverity}
                                        Reason: {status.reason} */}
                            </Col>
                        ))}
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
