import { useState } from 'react';
import DiscoverData from '../json-data/discover.json';
import AddBtnPage from '../component-small/addBtn';
import PlayPause from '../component-small/play-pause'
import { Link } from 'react-router-dom';

export default function DiscoverPage() {
    
    const renderStar = (data)=> {
        let startLink = [];
        for (let b = 1; b <= data.disStar; b++) {
            // console.log(data);
            startLink.push(<i className="fa fa-star" key={`${b}`} />);                    
        }
        // console.log(startLink);
        return startLink
    }

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
                                                renderStar(DiscoverData)
                                                // DiscoverData.disStar && DiscoverData.disStar.map((data,idx) => { 
                                                //     return renderStar(DiscoverData, idx, data);                                                                                                                                     
                                                // })
                                            }
                                            {/* <i className="fa fa-star-o text-muted"></i> */}
                                        </div>
                                        <PlayPause />                                        
                                        <AddBtnPage />                                            
                                    </div>
                                    <Link>
                                        <img src={DiscoverData.disImg} alt="" className="r r-2x img-full" />
                                    </Link>
                                </div>
                                <div className="padder-v">
                                    <Link className="text-ellipsis">{DiscoverData.disName}</Link>
                                    <Link className="text-ellipsis text-xs text-muted">{DiscoverData.disSinger}</Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}