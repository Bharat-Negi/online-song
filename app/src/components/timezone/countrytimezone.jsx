/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap';


class countrytimezone extends Component{
    render(){
        return(            
            <div className="">
                <div className="timeZone">
                    <Col md={4}>
                        <div className="flagImg">
                            <Image src="./images/india-flag.jpg" responsive />
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="timeText">
                            <h2>India</h2>
                            <p>03:23:16PM <br />
                            Monday 21 Nov,17</p>
                        </div>
                    </Col>
                </div>

                <div className="timeZone">
                    <Col md={4}>
                        <div className="flagImg">
                            <Image src="./images/newyork-flag.jpg" responsive />
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="timeText">
                            <h2>New York</h2>
                            <p>03:23:16PM <br />
                            Monday 21 Nov,17</p>
                        </div>
                    </Col>
                </div>

                <div className="timeZone">
                    <Col md={4}>
                        <div className="flagImg">
                            <Image src="./images/london-flag.jpg" responsive />
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="timeText">
                            <h2>London</h2>
                            <p>03:23:16PM <br />
                            Monday 21 Nov,17</p>
                        </div>
                    </Col>
                </div>

                <div className="timeZone">
                    <Col md={4}>
                        <div className="flagImg">
                            <Image src="./images/tokyo-flag.jpg" responsive />
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="timeText">
                            <h2>Tokyo</h2>
                            <p>03:23:16PM <br />
                            Monday 21 Nov,17</p>
                        </div>
                    </Col>
                </div>

                <div className="timeZone">
                    <Col md={4}>
                        <div className="flagImg">
                            <Image src="./images/malta-flag.jpg" responsive />
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="timeText">
                            <h2>Malta</h2>
                            <p>03:23:16PM <br />
                            Monday 21 Nov,17</p>
                        </div>
                    </Col>
                </div>

                <div className="timeZone">
                    <Col md={4}>
                        <div className="flagImg">
                            <Image src="./images/beijing-flag.jpg" responsive />
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="timeText">
                            <h2>Beijing</h2>
                            <p>03:23:16PM <br />
                            Monday 21 Nov,17</p>
                        </div>
                    </Col>
                </div>
            </div>            
        );
    }
}

export default countrytimezone