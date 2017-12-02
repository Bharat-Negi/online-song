/**
 * Created by krishna on 09/05/17.
 */
import React from 'react';

const SideBar =(props)=> {
    return(
        <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
            <header className="demo-drawer-header">
                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" className="demo-avatar" role="presentation"/>
                <div className="demo-avatar-dropdown">
                    <span>Ktishna</span>
                    <div className="mdl-layout-spacer"></div>
                </div>
            </header>
            <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                <Link to="/dashboard" className="mdl-navigation__link" style={{padding:'10px 30px'}}><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">dashboard</i>Dashboard</Link>
                <a className="mdl-navigation__link" style={{padding:'10px 30px'}} href="#"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>CRM</a>
                <a className="mdl-navigation__link" style={{padding:'10px 30px'}} href="#"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">assessment</i>Data Analytics</a>
                <a className="mdl-navigation__link" style={{padding:'10px 30px'}} href="#"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">settings_phone</i>Call Configuration</a>
                <Link to="/setting" className="mdl-navigation__link" style={{padding:'10px 30px'}} ><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">vpn_key</i>Change Password</Link>
                <a className="mdl-navigation__link" style={{padding:'10px 30px'}} href="#"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">receipt</i>CDR</a>
                <a className="mdl-navigation__link" style={{padding:'10px 30px'}} href="#"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">build</i>Settings</a>
                <div className="mdl-layout-spacer"></div>
            </nav>
        </div>
    );
}
export default SideBar;
