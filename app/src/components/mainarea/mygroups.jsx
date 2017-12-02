/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';


class mygroups extends Component{
    render(){
        return(            
            <div className="ibox">
                <div className="iboxHead"><h5>My Groups</h5></div>
                <div className="iboxContent">                    
                    <Row>
                        <div className="mygroup">
                            <Col md={4}>
                                <h3><a href="#">Network Support</a></h3>
                                <ul>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="online"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="offline"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="busy"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="away"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="online"></span>
                                    </li>
                                </ul>                                
                            </Col>
                            
                            <Col md={4}>
                                <h3><a href="#">Drive</a></h3>
                                <ul>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="online"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="offline"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="busy"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="away"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="online"></span>
                                    </li>
                                </ul>
                            </Col>
                            <Col md={4}>
                                <h3><a href="#">Testing Team</a></h3>
                                <ul>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="online"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="offline"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="busy"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="away"></span>
                                    </li>
                                    <li>
                                        <Image src="./images/profile-pic.jpg" responsive />
                                        <span className="online"></span>
                                    </li>
                                </ul>
                            </Col>
                        </div>
                    </Row>
                </div>
            </div>             
        );
    }
}

export default mygroups