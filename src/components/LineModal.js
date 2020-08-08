import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
} from "reactstrap";

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
        let updatedStatus = this.props.line.lineStatuses.map(({reason, statusSeverityDescription, statusSeverity}, i) => {
            if (this.props.line.lineStatuses[i].reason === undefined) {
                let reasonShort = `A Good Service has been reported on the ${this.props.line.name} line`;
                return reasonShort
            } else {
                let reasonLong = this.props.line.lineStatuses[i].reason;
                let reasonSeparator = this.props.line.lineStatuses[i].reason.indexOf(": ") + 2;
                let reasonShort = this.props.line.lineStatuses[i].reason.substring(reasonSeparator, reasonLong.length);
                return reasonShort;
            }
        })
        return updatedStatus
    }


 

    render() {
        const { id, name, modified, lineStatuses } = this.props.line;

        const m = (() => {
            let modifiedDate = new Date(modified);
            return modifiedDate.toString();
        })();

        const extremeAlert = "dark";
        const majorAlert = "danger";
        const minorAlert = "warning";
        const goodService = "success";
        const bugFound = "info";

        const warningLevel = (() => {
            let lineCurrentStatus = this.props.line.lineStatuses[0].statusSeverityDescription;
            if (lineCurrentStatus === "Suspended") {
                return extremeAlert;
            } else if (lineCurrentStatus === "Part Suspended") {
                return majorAlert;
            } else if (lineCurrentStatus === "Planned Closure") {
                return majorAlert;
            } else if (lineCurrentStatus === "Part Closure") {
                return minorAlert;
            } else if (lineCurrentStatus === "Severe Delays") {
                return majorAlert;
            } else if (lineCurrentStatus === "Reduced Service") {
                return minorAlert;
            } else if (lineCurrentStatus === "Minor Delays") {
                return minorAlert;
            } else if (lineCurrentStatus === "Special Service") {
                return minorAlert;
            } else if (lineCurrentStatus === "Good Service") {
                return goodService;
            } else if (lineCurrentStatus === "Service Closed") {
                return extremeAlert;
            } else {
                return bugFound;
            }
        })();

        return (
            <div>
                {lineStatuses.map(status => (
                    <React.Fragment key={this.props.line.id}>
                        <Button
                            id={this.props.line.id + "_button"}
                            onClick={this.toggle}
                            className={"btn-" + warningLevel + " btn-lg btn-block"}
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
                                    className={"bg-" + warningLevel + " text-center align-middle my-auto"} >
                                        {status.statusSeverityDescription}
                                    </Col>
                                </Row>
                            </ModalHeader>
                            <ModalBody>
                                <h6>{this.shortReason(lineStatuses)}</h6>
                                <hr />
                                <Row>
                                    <Col xs="12">
                                        <small>Last modified: <br />{m}</small>
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
