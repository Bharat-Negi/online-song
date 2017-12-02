/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';


class operatordetails extends Component{
    render(){
        return(            
            <div className="ibox">
                <div className="iboxHead"><h5>Operator Details</h5></div>
                <div className="iboxContent">
                    <Row className="operatorArea">
                        <Col md={5}>
                            <div className="operatorImg">
                                <Image src="./images/oper-img.jpg" alt="" responsive/>
                                <span className="info online"></span>
                            </div>
                        </Col>
                        <Col md={7}>
                            <p><span>Name</span>Hemant Kumar</p>
                            <p><span>Company Name</span>Asergis Telecom</p>
                            <Button bsSize="large" className="btn-available">Available for Call</Button>
                        </Col>
                    </Row>
                </div>
            </div>            
        );
    }
}

export default operatordetails