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

    // We need to catch all within one function, to combine shortReason, warningLevel and statusChanged

    shortReason = () => {
        let updatedStatus = this.props.line.lineStatuses.map(({ reason, statusSeverityDescription, statusSeverity, validityPeriods }, i) => {
            if (this.props.line.lineStatuses[i].reason === undefined) {
                let reasonShort = `A Good Service has been reported on the ${this.props.line.name} line`;
                return reasonShort
            } else {
                let reasonLong = this.props.line.lineStatuses[i].reason;
                let reasonSeparator = reasonLong.indexOf(":") + 1;
                let reasonShort = reasonLong.substring(reasonSeparator, reasonLong.length);
                // console.log("reasonShort: " + reasonShort, i);
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
        const location = this.props.line.lineStatuses;
        let lineStatusSeverity = location.map(({ reason, lineId, statusSeverityDescription, statusSeverity, validityPeriods }, i) => {
            // console.log(lineId, statusSeverity, statusSeverityDescription, reason, validityPeriods);
            if (location[i].statusSeverityDescription === "Suspended") {
                return extremeAlert;
            } else if (location[i].statusSeverityDescription === "Part Suspended") {
                return majorAlert;
            } else if (location[i].statusSeverityDescription === "Planned Closure") {
                return majorAlert;
            } else if (location[i].statusSeverityDescription === "Part Closure") {
                return minorAlert;
            } else if (location[i].statusSeverityDescription === "Severe Delays") {
                return majorAlert;
            } else if (location[i].statusSeverityDescription === "Reduced Service") {
                return minorAlert;
            } else if (location[i].statusSeverityDescription === "Minor Delays") {
                return minorAlert;
            } else if (location[i].statusSeverityDescription === "Special Service") {
                return minorAlert;
            } else if (location[i].statusSeverityDescription === "Good Service") {
                return goodService;
            } else if (location[i].statusSeverityDescription === "Service Closed") {
                return extremeAlert;
            } else {
                return bugFound;
            }
        });
        // console.log("lineStatusSeverity is " + lineStatusSeverity)
        return lineStatusSeverity
    };

    statusChanged = () => {

        const calendarSettings = {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD/MM/YYYY [at] LT'
        };
        const [data] = this.props.line.lineStatuses.map(({ validityPeriods, lineId }, i) => {
            // console.log("this.validityPeriods is: " + JSON.stringify(this.props.line.lineStatuses[i].validityPeriods));
            const periods = this.props.line.lineStatuses[i].validityPeriods.map(({ fromDate, toDate, isNow }, j) => {
                // console.log("Validity periods are: " + fromDate, toDate);
                return { from: fromDate, end: toDate, active: isNow };
            });
            const m = (() => {
                if (periods.length === 0) {
                    let startTime = moment().calendar(null, calendarSettings);
                    return [startTime];
                } else {
                    let startTime = moment.utc(periods[0].from).calendar(null, calendarSettings);
                    let endTime = moment.utc(periods[0].end).calendar(null, calendarSettings);
                    // console.log("startTime = " + startTime, "endTime = " + endTime);
                    return [startTime, endTime]
                };
            })();
            let m0 = m[0];
            let m1 = m[1];
            // console.log("m0 is " + m0 + " and m1 is " + m1)
            return [[m0], [m1]];
        });
        // console.log("Data is " + data);
        // console.log("Data 0 is: " + data[0]);
        // console.log("Data 1 is: " + data[1]);
        return (<React.Fragment>
            <Col xs="6">
                <small>Last updated: <br />{data[0]}</small>
            </Col>
            <Col xs="6">
            {/* {(() => {
                let length = data[1].length;
                console.log("Length is: " + length);
                switch (length) {
                    case 0 : return (<small>Estimated finish: <br />{data[1]}</small>);
                    case 1 : break;
                }                
            }
            )} */}
            </Col>
        </React.Fragment>
        );
    };

    render() {
        const { id, name, lineStatuses } = this.props.line;
        // const { statusChanged } = this.props.line.lineStatuses[i].validityPeriods[i].fromDate;


        return (
            <div>
                {lineStatuses.map((status, i) => (
                    <React.Fragment key={this.props.line.id + i}>
                        <Button
                            id={this.props.line.id + "_button-" + i}
                            onClick={this.toggle}
                            className={"btn-" + this.warningLevel() + " btn-lg btn-block"}
                        >
                            <h4>{status.statusSeverityDescription}</h4>
                        </Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader id={id} toggle={this.toggle}>
                                <Row>
                                    <Col xs="6">
                                        {name}
                                    </Col>
                                    <Col xs="6"
                                        className={"bg-" + this.warningLevel() + " text-center align-middle my-auto"} >
                                        {status.statusSeverityDescription}
                                    </Col>
                                </Row>
                            </ModalHeader>
                            <ModalBody>
                                <h6>{this.shortReason()}</h6>
                                <hr />
                                <Row>
                                    {this.statusChanged()}
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
