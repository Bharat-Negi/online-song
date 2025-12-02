import { useState } from 'react';

export default function AddBtnPage() {
    const [isHeart, setIsHeart] = useState(false);
    const [isPlus, setIsPlus] = useState(false);

    const toggleHeart = () => setIsHeart(prev => !prev);
    const togglePlus = () => setIsPlus(prev => !prev);
    
    return (
        <div className="bottom padder m-b-sm">
            {/* ❤️ Heart Button */}
            <span onClick={toggleHeart} className={isHeart ? "pull-right heart active" : "pull-right heart"}>
                <i className={isHeart ? "fa fa-heart text-active text-danger" : "fa fa-heart-o"}></i>
            </span>

            {/* ➕ / ✔ Add Button */}  
            <span onClick={togglePlus} className={isPlus ? "plus active" : "plus"}>
                <i className={isPlus ? "fa fa-check-circle text-active text-info" : "fa fa-plus-circle"}></i>
            </span>
        </div>
    )
}