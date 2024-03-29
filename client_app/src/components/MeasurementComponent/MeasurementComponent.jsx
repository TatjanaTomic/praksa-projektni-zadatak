import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MeasurementItemComponent from './MeasurementItemComponent/MeasurementItemComponent';
import qs from 'qs';
import './MeasurementComponent.css';
import '../../Style.css';

class MeasurementComponent extends Component {
    
    constructor(props){
        super(props);
        console.log('device props', props);
        //this.state.deviceId = this.props.deviceId;
        this.state.deviceId = this.props.match?.params?.id ? this.props.match.params.id : 'NO PARAMS PASSED';
        let queryParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        console.log(queryParams);
        this.state.myParam = queryParams?.myParam;
    }

    state = {
        devices : null
    }

    componentDidMount(){
        this.getAllDevices();
    }

    getAllDevices = () => {
        axios.get('/api/device')
        .then(response => {
            this.setState({
                devices : response.data.devices
            })
        })
    }

    mapMeasurements = () => {
        let devices = this.state.devices;

        return(
            devices==null?

            <div>
                Loading data...
            </div>

            :

            devices&&devices.length>0? 
            devices.map(device => (
                <MeasurementItemComponent 
                    key={device.id}
                    deviceId = {device.id}
                >
                </MeasurementItemComponent>
            ))

            :

            <div>
                No data.
            </div>
        )
    }

    render() { 
        return ( 
            <div class="measurement-component">
                <div class="measurement-holder">
                    <h1 id="measurement-title">Data list</h1>
                    {this.mapMeasurements()}
                </div>
            </div>
         );
    }
}
 
export default MeasurementComponent;