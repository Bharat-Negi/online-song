import { useState, useEffect } from 'react';

export default function addbtnPage(props) {
    const [isHeart, setIsHeart] = useState("false");
    const [isPlus, setIsPlus] = useState("false");

    const ToggleHeart = () => {
        setIsHeart(!isHeart);
    };
    const TogglePlus = () => {
        setIsPlus(!isPlus);
    };
    
    return (
        <div className="bottom padder m-b-sm">
            <a href="#" onClick={ToggleHeart} className={isHeart ? "pull-right heart" : "pull-right heart active"}>
                <i className="fa fa-heart-o"></i>
                <i className="fa fa-heart text-active text-danger"></i>
            </a>
            <a href="#" onClick={TogglePlus} className={isPlus ? "plus" : "plus active"}>
                <i className="fa fa-plus-circle"></i>
                <i className="fa fa-check-circle text-active text-info"></i>
            </a>
        </div>
    )
}