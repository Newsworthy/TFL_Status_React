import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
} from "reactstrap";
import moment from 'moment';

class LineModal extends Component {
    state = {
        modal: false,
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    shortReason = () => {
        let updatedStatus = this.props.line.lineStatuses.map(({ reason, statusSeverityDescription, statusSeverity, validityPeriods }, i) => {
            if (this.props.line.lineStatuses[i].reason === undefined) {
                let reasonShort = `A Good Service has been reported on the ${this.props.line.name} line`;
                return reasonShort
            } else {
                let reasonLong = this.props.line.lineStatuses[i].reason;
                let reasonSeparator = reasonLong.indexOf(": ") + 2;
                let reasonShort = reasonLong.substring(reasonSeparator, reasonLong.length);
                console.log("reasonShort: " + reasonShort, i);
                return reasonShort;
            }
        })
        return updatedStatus
    }

    warningLevel = () => {
        const extremeAlert = "dark";
        const majorAlert = "danger";
        const minorAlert = "warning";
        const goodService = "success";
        const bugFound = "info";
        let lineStatusSeverity = this.props.line.lineStatuses.map(({ reason, lineId, statusSeverityDescription, statusSeverity, validityPeriods }, i) => {
            console.log(lineId, statusSeverity, statusSeverityDescription, reason, validityPeriods);
            if (this.props.line.lineStatuses[i].statusSeverityDescription === "Suspended") {
                return extremeAlert;
            } else if (this.props.line.lineStatuses[i].statusSeverityDescription === "Part Suspended") {
                return majorAlert;
            } else if (this.props.line.lineStatuses[i].statusSeverityDescription === "Planned Closure") {
                return majorAlert;
            } else if (this.props.line.lineStatuses[i].statusSeverityDescription === "Part Closure") {
                return minorAlert;
            } else if (this.props.line.lineStatuses[i].statusSeverityDescription === "Severe Delays") {
                return majorAlert;
            } else if (this.props.line.lineStatuses[i].statusSeverityDescription === "Reduced Service") {
                return minorAlert;
            } else if (this.props.line.lineStatuses[i].statusSeverityDescription === "Minor Delays") {
                return minorAlert;
            } else if (this.props.line.lineStatuses[i].statusSeverityDescription === "Special Service") {
                return minorAlert;
            } else if (this.props.line.lineStatuses[i].statusSeverityDescription === "Good Service") {
                return goodService;
            } else if (this.props.line.lineStatuses[i].statusSeverityDescription === "Service Closed") {
                return extremeAlert;
            } else {
                return bugFound;
            }
        });
        console.log("lineStatusSeverity is " + lineStatusSeverity)
        return lineStatusSeverity
    };

    statusChanged = () => {
        const data = this.props.line.lineStatuses.map(({ validityPeriods, lineId }, i) => {
            console.log("this.validityPeriods is: " + JSON.stringify(this.props.line.lineStatuses[i].validityPeriods));
            const periods = this.props.line.lineStatuses[i].validityPeriods.map(({ fromDate, toDate, isNow }, j) => {
                console.log("Validity periods are: " + fromDate, toDate);
                return fromDate;
            })
            console.log(this.props.line.id + " Periods are: " + periods);
            const m = (() => {
                console.log("Here is the original time: " + periods)
                const timeFixed = moment(periods).format("dddd, MMMM Do YYYY, h:mm:ss a");
                console.log("Here is the fixed time: " + timeFixed)
                return timeFixed;
            })();
            console.log("m is: " + m);
            return m;

        });
        return data;
    };

    render() {
        const { id, name, modified, lineStatuses } = this.props.line;
        // const { statusChanged } = this.props.line.lineStatuses[i].validityPeriods[i].fromDate;


        return (
            <div>
                {lineStatuses.map((status, i) => (
                    <React.Fragment key={this.props.line.id + i}>
                        <Button
                            id={this.props.line.id + "_button" + i}
                            onClick={this.toggle}
                            className={"btn-" + this.warningLevel(lineStatuses) + " btn-lg btn-block"}
                        >
                            <h4>
                                {status.statusSeverityDescription}</h4>
                        </Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader id={id} toggle={this.toggle}>
                                <Row>
                                    <Col xs="6">
                                        {name}
                                    </Col>
                                    <Col xs="6"
                                        className={"bg-" + this.warningLevel(lineStatuses) + " text-center align-middle my-auto"} >
                                        {status.statusSeverityDescription}
                                    </Col>
                                </Row>
                            </ModalHeader>
                            <ModalBody>
                                <h6>{this.shortReason(lineStatuses)}</h6>
                                <hr />
                                <Row>
                                    <Col xs="12">
                                        <small>Last modified: <br />{this.statusChanged(lineStatuses)}</small>
                                    </Col>
                                </Row>
                            </ModalBody>
                        </Modal>
                    </React.Fragment>
                ))}
            </div >
        )
    }
}

export default LineModal
