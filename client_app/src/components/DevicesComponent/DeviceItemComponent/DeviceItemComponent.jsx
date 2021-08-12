import React, { Component } from 'react';
import './DeviceItemComponent.css';


class DeviceItemComponent extends Component {
    state = { 
        newMeasurementInterval : this.props.device.measurementInterval,
        device : this.props.device
        //serialNumber : ''
        //newCarName : ''
     }
    render() { 
        return ( 
            <div className="device-item">
                <div>
                    <label id="device-item-label">Device ID</label>
                    <label id="device-item-label">{this.props.device.id}</label>
                </div>
                <div>
                    <label id="device-item-label">Serial number</label>
                    <label id="device-item-label">{this.props.device.serialNumber}</label>
                </div>
                <div>
                    <label id="device-item-label">Measurement interval</label>
                    <input id="device-item-input" type='text' value={this.state.newMeasurementInterval} onChange={this.handleMeasurementIntervalInputChange}></input>
                    <button id="device-item-button" onClick={this.updateDevice}>SET</button>
                </div>
            </div>
         );
    }

    handleMeasurementIntervalInputChange = (event) => {
        this.setState({
            newMeasurementInterval : event.target.value
        })
    }

    updateDevice = () => {
        this.props.updateDeviceHandler(this.props.device, this.state.newMeasurementInterval);
    }
}
 
export default DeviceItemComponent;