/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import { Row, Col, FormControl, Button } from 'react-bootstrap';


class dialpad extends Component{
    
    render(){
        return(            
            <div className="ibox">
                <div className="iboxHead"><h5>Dail Pad</h5></div>
                <div className="iboxContent">
                    <div className="dialPad">
                        <Row>
                            <Col md="12">
                                <FormControl type="text" placeholder="Enter Number" className="dSearch" />
                            </Col>
                        </Row>
                        <Row className="dialArea">
                            <Col md="4" sm="4"><span>1</span></Col>
                            <Col md="4" sm="4"><span>2</span></Col>
                            <Col md="4" sm="4"><span>3</span></Col>
                            <Col md="4" sm="4"><span>4</span></Col>
                            <Col md="4" sm="4"><span>5</span></Col>
                            <Col md="4" sm="4"><span>6</span></Col>
                            <Col md="4" sm="4"><span>7</span></Col>
                            <Col md="4" sm="4"><span>8</span></Col>
                            <Col md="4" sm="4"><span>9</span></Col>
                            <Col md="4" sm="4"><span>*</span></Col>
                            <Col md="4" sm="4"><span>0</span></Col>
                            <Col md="4" sm="4"><span>#</span></Col>
                        </Row>
                        <Row className="dialBtn">
                            <Button bsSize="large" className="btn-available"><i className="fa fa-phone"></i></Button>
                        </Row>
                    </div>
                </div>
            </div>            
        );
    }
}

export default dialpad