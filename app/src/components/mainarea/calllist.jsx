/**
 * Created by Bharat Negi on 24/11/17.
 */
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Table } from 'react-bootstrap';


class calllist extends Component{
    render(){
        return(            
            <div className="ibox">
                <div className="iboxHead"><h5>Call List</h5></div>
                <div className="iboxContent">
                    <ReactTooltip />
                    <Table responsive className="calllistTable">
                        <thead>
                            <tr>
                                <th>Date & Time</th>
                                <th>Caller ID</th>
                                <th>Phone No.</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="23%">19/08/2017 - 08:30 am</td>
                                <td width="18%">442071008804</td>
                                <td width="20%">9210740008</td>
                                <td width="15%">00:01:05</td>
                                <td width="25%">
                                    <a href="#" data-tip="Receive"><i className="icon-receive"></i></a>
                                    <a href="#" data-tip="Call Log"><i className="icon-call-log"></i></a>
                                    <a href="#" data-tip="On Hold"><i className="icon-on-hold"></i></a>
                                    <a href="#" data-tip="Transfer"><i className="icon-transfer"></i></a>
                                    <a href="#" data-tip="Call Script"><i className="icon-call-script"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>19/08/2017 - 08:30 am</td>
                                <td>442071008804</td>
                                <td>9210740008</td>
                                <td>00:01:05</td>
                                <td>
                                    <a href="#" data-tip="Receive"><i className="icon-receive"></i></a>
                                    <a href="#" data-tip="Call Log"><i className="icon-call-log"></i></a>
                                    <a href="#" data-tip="On Hold"><i className="icon-on-hold"></i></a>
                                    <a href="#" data-tip="Transfer"><i className="icon-transfer"></i></a>
                                    <a href="#" data-tip="Call Script"><i className="icon-call-script"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>19/08/2017 - 08:30 am</td>
                                <td>442071008804</td>
                                <td>9210740008</td>
                                <td>00:01:05</td>
                                <td>
                                    <a href="#" data-tip="Receive"><i className="icon-receive"></i></a>
                                    <a href="#" data-tip="Call Log"><i className="icon-call-log"></i></a>
                                    <a href="#" data-tip="On Hold"><i className="icon-on-hold"></i></a>
                                    <a href="#" data-tip="Transfer"><i className="icon-transfer"></i></a>
                                    <a href="#" data-tip="Call Script"><i className="icon-call-script"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>19/08/2017 - 08:30 am</td>
                                <td>442071008804</td>
                                <td>9210740008</td>
                                <td>00:01:05</td>
                                <td>
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

export default calllist