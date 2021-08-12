import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './MeasurementItemComponent.css'
import '../../../Style.css';

class MeasurementItemComponent extends Component {

    state = {
        measurement : null
    }

    componentDidMount = () => {
        this.getLatestMeasurement();
    }

    getLatestMeasurement = () => { 
        axios.get(`/api/data/device/${this.props.deviceId}/latest`)
        .then(response => {
            this.setState({
                measurement : response.data.result
            })
        })  
    }

    render() { 
        return (
            
            <div class="tr">
                {this.state.measurement==null?

                <div className="measurement-item">
                    <h2>Device: {this.props.deviceId}</h2>
                    No data.
                </div>

                :

                <div className="measurement-item">
                    <h2>Device: {this.props.deviceId}</h2>

                    <div>Temperature:   {this.state.measurement.temperature}</div>
                    <div>Gyroscope:     ({this.state.measurement.gyroX}, {this.state.measurement.gyroY}, {this.state.measurement.gyroZ})</div>
                    <div>Accelerometer: ({this.state.measurement.accX}, {this.state.measurement.accY}, {this.state.measurement.accZ})</div>
                    <div>Magnetometer:  ({this.state.measurement.magX}, {this.state.measurement.magY}, {this.state.measurement.magZ})</div>
                    <div>Date:          {moment(this.state.measurement.date).format('DD-MM-YYYY HH:mm')}</div>
                    <div id="link-wrapper">
                        <Link to = {{pathname: '/device/' + this.props.deviceId, myParam: 'CHART'}} id="link-chart"> More data... </Link>
                    </div>
                </div>
                
                }

            </div>
         );
    }

    
}
 
export default MeasurementItemComponent;