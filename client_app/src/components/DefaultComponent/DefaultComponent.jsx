import React, { Component } from 'react';
import './DefaultComponent.css'
import '../../Style.css';

class DefaultComponent extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="default-component">
                <h1 className="title" id="title1">Ljetna praksa 2021</h1>
                <h2 className="title" id="title2">Implementacija</h2>
                <h2 className="title" id="title2">IoT rješenja</h2>
            </div> 
         );
    }
}
 
export default DefaultComponent;