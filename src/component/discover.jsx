import { useState } from 'react';
import DiscoverData from '../json-data/discover.json';
import AddBtnPage from '../component-small/addBtn';
import PlayPause from '../component-small/play-pause'

export default function DiscoverPage() {
    
    return (
        <div className="row row-sm">

            {
                DiscoverData && DiscoverData.map(DiscoverData => {
                    return (
                        <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={DiscoverData.id}>
                            <div className="item">
                                <div className="pos-rlt">
                                    {
                                        DiscoverData.disPlayTime == 'on' ?
                                            <div className="bottom">
                                                <span className="badge bg-info m-l-sm m-b-sm">03:20</span>
                                            </div> : null
                                    }
                                    {
                                        DiscoverData.disBook == 'on' ?
                                            <div className="top" style={{ zIndex : 1 }}>
                                                <span className="pull-right m-t-n-xs m-r-sm text-white">
                                                    <i className="fa fa-bookmark i-lg"></i>
                                                </span>
                                            </div> : null
                                    }
                                    {
                                        DiscoverData.disBage == 'on' ?
                                            <div className="top">
                                                <span className="pull-right m-t-sm m-r-sm badge bg-info">6</span>
                                            </div> : null
                                    }
                                    <div className="item-overlay opacity r r-2x bg-black">
                                        <div className="text-info padder m-t-sm text-sm star-space">
                                            {
                                                DiscoverData.disStar && DiscoverData.disStar.map((data,idx) => {
                                                    return(
                                                        <i className="fa fa-star" key={idx}>{data.star}</i>
                                                    )                                                                                                     
                                                })
                                            }
                                            {/* <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o text-muted"></i> */}
                                        </div>
                                        <PlayPause />                                        
                                        <AddBtnPage />                                            
                                    </div>
                                    <a href="#">
                                        <img src={DiscoverData.disImg} alt="" className="r r-2x img-full" />
                                    </a>
                                </div>
                                <div className="padder-v">
                                    <a href="#" className="text-ellipsis">{DiscoverData.disName}</a>
                                    <a href="#" className="text-ellipsis text-xs text-muted">{DiscoverData.disSinger}</a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}