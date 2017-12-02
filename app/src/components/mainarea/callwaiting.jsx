/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Table } from 'react-bootstrap';


class callwaiting extends Component{  
    
    render(){
        return(
            <div className="ibox">                
                <div className="iboxHead"><h5>Call Waiting</h5></div>
                <div className="iboxContent">
                    <ReactTooltip />
                    <Table responsive className="callWatingTable">
                        <tbody>
                            <tr>
                                <td>
                                    <h4>Daniel Caliste</h4>
                                    <p>+44(0)201 100 8804</p>
                                </td>
                                <td><i className="fa fa-map-marker"></i> New York, USA</td>
                                <td className="text-right">                                    
                                    <a href="#" data-tip="Receive"><i className="icon-receive"></i></a>
                                    <a href="#" data-tip="Call Log"><i className="icon-call-log"></i></a>
                                    <a href="#" data-tip="On Hold"><i className="icon-on-hold"></i></a>
                                    <a href="#" data-tip="Transfer"><i className="icon-transfer"></i></a>
                                    <a href="#" data-tip="Call Script"><i className="icon-call-script"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>Ian	Anderson</h4>
                                    <p>+44(0)201 100 8804</p>
                                </td>
                                <td><i className="fa fa-map-marker"></i> Noida, India</td>
                                <td className="text-right">
                                    <a href="#" data-tip="Receive"><i className="icon-receive"></i></a>
                                    <a href="#" data-tip="Call Log"><i className="icon-call-log"></i></a>
                                    <a href="#" data-tip="On Hold"><i className="icon-on-hold"></i></a>
                                    <a href="#" data-tip="Transfer"><i className="icon-transfer"></i></a>
                                    <a href="#" data-tip="Call Script"><i className="icon-call-script"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>Jessie Bennett</h4>
                                    <p>+44(0)201 100 8804</p>
                                </td>
                                <td><i className="fa fa-map-marker"></i> Mumbai, India</td>
                                <td className="text-right">
                                    <a href="#" data-tip="Receive"><i className="icon-receive"></i></a>
                                    <a href="#" data-tip="Call Log"><i className="icon-call-log"></i></a>
                                    <a href="#" data-tip="On Hold"><i className="icon-on-hold"></i></a>
                                    <a href="#" data-tip="Transfer"><i className="icon-transfer"></i></a>
                                    <a href="#" data-tip="Call Script"><i className="icon-call-script"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>Phillip	Jackson</h4>
                                    <p>+44(0)201 100 8804</p>
                                </td>
                                <td><i className="fa fa-map-marker"></i> London, UK</td>
                                <td className="text-right">
                                    <a href="#" data-tip="Receive"><i className="icon-receive"></i></a>
                                    <a href="#" data-tip="Call Log"><i className="icon-call-log"></i></a>
                                    <a href="#" data-tip="On Hold"><i className="icon-on-hold"></i></a>
                                    <a href="#" data-tip="Transfer"><i className="icon-transfer"></i></a>
                                    <a href="#" data-tip="Call Script"><i className="icon-call-script"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>Angela Craig</h4>
                                    <p>+44(0)201 100 8804</p>
                                </td>
                                <td><i className="fa fa-map-marker"></i> Shanghai, Japan</td>
                                <td className="text-right">
                                    <a href="#" data-tip="Receive"><i className="icon-receive"></i></a>
                                    <a href="#" data-tip="Call Log"><i className="icon-call-log"></i></a>
                                    <a href="#" data-tip="On Hold"><i className="icon-on-hold"></i></a>
                                    <a href="#" data-tip="Transfer"><i className="icon-transfer"></i></a>
                                    <a href="#" data-tip="Call Script"><i className="icon-call-script"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>    
                </div>
            </div>            
        );
    }
}

export default callwaiting