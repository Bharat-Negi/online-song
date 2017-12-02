/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

// call page from other file
import CallList from './calllist'
import CallScripting from './callscripting'
import CallWaiting from './callwaiting'
import DialPad from './dialpad'
import MyGroups from './mygroups'
import OperatorDetails from './operatordetails'

class maincontainer extends Component{
    render(){
        return(
            <div>           
                <Row>
                    <Col md={6}>
                        <OperatorDetails />
                    </Col>
                    <Col md={6}>
                        <CallScripting />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <DialPad />
                    </Col>
                    <Col md={8}>
                        <CallWaiting />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CallList />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <MyGroups />
                    </Col>
                </Row>                
            </div>            
        );
    }
}

export default maincontainer