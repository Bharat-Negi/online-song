/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

// call page from other file
import TopMenu from '../toparea/topmenu'
import MainContainer from '../mainarea/maincontainer'
import CountryTimezone from '../timezone/countrytimezone'
import FootLink from './footlink'

class rightsection extends Component{
    render(){
        return(
            <Col className="rightArea">
                <TopMenu />
                <Col md={9}>
                    <MainContainer />
                </Col>
                <Col md={3}>
                    <CountryTimezone />
                </Col>
                <FootLink />
            </Col>
        );
    }
}

export default rightsection