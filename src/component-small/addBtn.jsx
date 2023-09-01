import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            <Link onClick={ToggleHeart} className={isHeart ? "pull-right heart" : "pull-right heart active"}>
                <i className={isHeart ? "fa fa-heart-o" : "fa fa-heart text-active text-danger"}></i>
            </Link>
            <Link onClick={TogglePlus} className={isPlus ? "plus" : "plus active"}>
                <i className={isPlus ? "fa fa-plus-circle" : "fa fa-check-circle text-active text-info"}></i>
            </Link>
        </div>
    )
}