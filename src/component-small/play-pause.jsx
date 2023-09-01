import { useState } from 'react';

export default function playPause() {

    const [isplay, setIsPlay] = useState("false");

    const PlayPausebtn = () => {        
        setIsPlay(!isplay);        
    };

    return (
        <>
            <div className="center text-center m-t-n cus-hand" onClick={PlayPausebtn}>
                {
                    isplay ? <i className="icon-control-play i-2x"></i> : <i className="icon-control-pause i-2x"></i>
                }
            </div>
        </>
    )
}