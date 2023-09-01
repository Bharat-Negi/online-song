import { Link } from "react-router-dom";
import { useState } from 'react';

export default function ProfileDetails() {
    const [isFollow, setIsFollow] = useState("false");

    const Followbtn = () => {
        setIsFollow(!isFollow);
    };

    return (
        <aside className="aside-lg bg-light lter b-r">
            <section className="vbox">
                <section className="scrollable profileScroll">
                    <div className="wrapper">
                        <div className="text-center m-b m-t">
                            <Link className="thumb-lg">
                                <img src="images/a0.png" className="img-circle" />
                            </Link>
                            <div>
                                <div className="h3 m-t-xs m-b-xs">John.Smith</div>
                                <small className="text-muted"><i className="fa fa-map-marker"></i> Delhi, India</small>
                            </div>
                        </div>
                        <div className="panel wrapper">
                            <div className="row text-center">
                                <div className="col-xs-6">
                                    <Link>
                                        <span className="m-b-xs h4 block">245</span>
                                        <small className="text-muted">Followers</small>
                                    </Link>
                                </div>
                                <div className="col-xs-6">
                                    <Link>
                                        <span className="m-b-xs h4 block">55</span>
                                        <small className="text-muted">Following</small>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group btn-group-justified m-b">
                            <Link className="btn btn-success btn-rounded" onClick={Followbtn}>
                                {
                                    isFollow ?  
                                    <span className="text"> <i className="fa fa-eye"></i> Follow </span> : 
                                    <span className="text-active"><i className="fa fa-eye"></i> Following </span>
                                }
                            </Link>
                            <Link className="btn btn-dark btn-rounded">
                                <i className="fa fa-comment-o"></i> Chat
                            </Link>
                        </div>
                        <div>
                            <small className="text-uc text-xs text-muted">about me</small>
                            <p>Artist</p>
                            <small className="text-uc text-xs text-muted">info</small>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat.</p>
                            <div className="line"></div>
                            <small className="text-uc text-xs text-muted">connection</small>
                            <p className="m-t-sm">
                                <Link className="btn btn-rounded btn-twitter btn-icon">
                                    <i className="fa fa-twitter"></i>
                                </Link>
                                <Link className="btn btn-rounded btn-facebook btn-icon">
                                    <i className="fa fa-facebook"></i>
                                </Link>
                                <Link className="btn btn-rounded btn-gplus btn-icon">
                                    <i className="fa fa-google-plus"></i>
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </aside>
    )
}