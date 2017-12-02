/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import { Grid, Row, Col, Breadcrumb, Image } from 'react-bootstrap';


class topmenu extends Component{
    render(){
        return(            
            <Row>
                <div className="pagetopMenu">
                    <Col md={6}>
                        <div className="topbreadCrum">
                            <h1>Operator Dashboard</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">
                                    Contact Center Dashboard
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="#" active>
                                    Operator Dashboard
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="topbarRight">
                            <ul>
                                <li>
                                    <div className="topAlert"><a href="#"><i className="icon-messages"></i> <span>5</span></a></div>
                                </li>
                                <li>
                                    <div className="topAlert"><a href="#"><i className="icon-notifications"></i> <span>10</span></a></div>
                                </li>
                                <li className="topProfile">
                                    <div class="profilePic"><Image src="./images/profile-pic.jpg" responsive /></div>
                                    <div className="profileInfo">
                                        <a href="#">
                                            <h3>Hemant Kumar</h3>
                                            <p>UI Tester <i className="fa fa-caret-down"></i></p>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </div>
            </Row>            
        );
    }
}

export default topmenu