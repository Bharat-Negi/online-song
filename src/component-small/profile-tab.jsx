import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileTab() {
    const [tabState, setTabState] = useState(1);

    const tabClick = (index) => {
        setTabState(index)
    }

    return (
        <aside className="bg-white">
            <section className="vbox">
                <header className="header bg-light lt">
                    <ul className="nav nav-tabs nav-white">
                        <li className={tabState === 1 ? 'active' : null}>
                            <Link onClick={()=> tabClick(1)}>Activity</Link>
                        </li>
                        <li className={tabState === 2 ? 'active' : null}>
                            <Link onClick={()=> tabClick(2)}>Events</Link>
                        </li>
                        <li className={tabState === 3 ? 'active' : null}>
                            <Link onClick={()=> tabClick(3)}>Interaction</Link>
                        </li>
                    </ul>
                </header>
                <section className="scrollable profileScrollTab">
                    <div className="tab-content">
                        <div className={tabState === 1 ? 'tab-pane active' : 'tab-pane'}>
                            <ul className="list-group no-radius m-b-none m-t-n-xxs list-group-lg no-border">
                                <li className="list-group-item">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a0.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">3 minuts ago</small>
                                        <strong className="block">Drew Wllon</strong>
                                        <small>Wellcome and play this web application template ... </small>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a1.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">1 hour ago</small>
                                        <strong className="block">Jonathan George</strong>
                                        <small>Morbi nec nunc condimentum...</small>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a2.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">2 hours ago</small>
                                        <strong className="block">Josh Long</strong>
                                        <small>Vestibulum ullamcorper sodales nisi nec...</small>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a3.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">1 day ago</small>
                                        <strong className="block">Jack Dorsty</strong>
                                        <small>Morbi nec nunc condimentum...</small>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a4.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">3 days ago</small>
                                        <strong className="block">Morgen Kntooh</strong>
                                        <small>Mobile first web app for startup...</small>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a5.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">Jun 21</small>
                                        <strong className="block">Yoha Omish</strong>
                                        <small>Morbi nec nunc condimentum...</small>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a6.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">May 10</small>
                                        <strong className="block">Gole Lido</strong>
                                        <small>Vestibulum ullamcorper sodales nisi nec...</small>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a7.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">Jan 2</small>
                                        <strong className="block">Jonthan Snow</strong>
                                        <small>Morbi nec nunc condimentum...</small>
                                    </a>
                                </li>
                                <li className="list-group-item" href="#email-content" data-toggle="class:show">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a8.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">3 minuts ago</small>
                                        <strong className="block">Drew Wllon</strong>
                                        <small>Vestibulum ullamcorper sodales nisi nec sodales nisi nec sodales nisi nec...</small>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#" className="thumb-sm pull-left m-r-sm">
                                        <img src="images/a9.png" className="img-circle" />
                                    </a>
                                    <a href="#" className="clear">
                                        <small className="pull-right">1 hour ago</small>
                                        <strong className="block">Jonathan George</strong>
                                        <small>Morbi nec nunc condimentum...</small>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={tabState === 2 ? 'tab-pane active' : 'tab-pane'}>
                            <div className="text-center wrapper">
                                <i className="fa fa-spinner fa fa-spin fa fa-large"></i>
                            </div>
                        </div>
                        <div className={tabState === 3 ? 'tab-pane active' : 'tab-pane'}>
                            <div className="text-center wrapper">
                                <i className="fa fa-spinner fa fa-spin fa fa-large"></i>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </aside>
    )
}