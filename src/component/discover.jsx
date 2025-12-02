import { useState } from 'react';
import DiscoverData from '../json-data/discover.json';
import AddBtnPage from '../component-small/addBtn';
import PlayPause from '../component-small/play-pause';
import { Link } from 'react-router-dom';

export default function DiscoverPage() {
    const [currentPlayId, setCurrentPlayId] = useState(null);

    const togglePlay = (id) => {
        setCurrentPlayId(prev => (prev === id ? null : id));
    };

    const renderStar = (data) => {
        const maxStars = 5;
        const stars = [];

        for (let i = 1; i <= maxStars; i++) {
            if (i <= data.disStar) {
                stars.push(<i key={i} className="fa fa-star text-warning" />); // filled star
            } else {
                stars.push(<i key={i} className="fa fa-star-o text-muted" />); // empty star
            }
        }
        return stars;
    };

    return (
        <div className="row row-sm">
            {DiscoverData && DiscoverData.map(item => (
                <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={item.id}>
                    <div className="item">
                        <div className="pos-rlt">

                            {item.disPlayTime === 'on' && (
                                <div className="bottom">
                                    <span className="badge bg-info m-l-sm m-b-sm">03:20</span>
                                </div>
                            )}

                            {item.disBook === 'on' && (
                                <div className="top" style={{ zIndex: 1 }}>
                                    <span className="pull-right m-t-n-xs m-r-sm text-white">
                                        <i className="fa fa-bookmark i-lg"></i>
                                    </span>
                                </div>
                            )}

                            {item.disBage === 'on' && (
                                <div className="top">
                                    <span className="pull-right m-t-sm m-r-sm badge bg-info">6</span>
                                </div>
                            )}

                            <div className="item-overlay opacity r r-2x bg-black">
                                <div className="text-info padder m-t-sm text-sm star-space">
                                    {renderStar(item)}
                                </div>
                                <PlayPause 
                                    isPlay={currentPlayId === item.id}
                                    onToggle={() => togglePlay(item.id)}
                                 />
                                <AddBtnPage />
                            </div>

                            <Link>
                                <img src={item.disImg} alt="" className="r r-2x img-full" />
                            </Link>
                        </div>

                        <div className="padder-v">
                            <Link className="text-ellipsis">{item.disName}</Link>
                            <Link className="text-ellipsis text-xs text-muted">{item.disSinger}</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
