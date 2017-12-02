/**
 * Created by Bharat Negi on 24/11/17.
 */
import React from 'react';
import { Image } from 'react-bootstrap';

class leftBar extends React.Component{
     
    render(){
        return(
            <div className="leftArea">
                <div className="logo">
                    <Image src="./images/logo.png" responsive />
                </div>

                <div className="menu">
                    <ul>
                        <li className="mDropdown">
                            <a href="#" className="active"><i class="icon-dashboard"></i><span className="txt">Dashboard</span></a>
                            {/* <ul>
                                <li><a href="#">Link 1</a></li>
                                <li><a href="#">Link 2</a></li>
                                <li><a href="#">Link 3</a></li>
                                <li><a href="#">Link 4</a></li>
                            </ul> */}
                        </li>
                        <li><a href="#"><i class="icon-crm"></i><span className="txt">CRM</span></a></li>
                        <li><a href="#"><i class="icon-my-profile"></i><span className="txt">My Profile</span></a></li>
                        <li><a href="#"><i class="icon-change-password"></i><span className="txt">Change Password</span></a></li>
                        <li><a href="#"><i class="icon-cdr"></i><span className="txt">CDR</span></a></li>
                        <li><a href="#"><i class="icon-settings"></i><span className="txt">Settings</span></a></li>
                    </ul>
                </div>

            </div>       
        );
    }
}

export default leftBar