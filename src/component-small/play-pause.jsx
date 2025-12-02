export default function PlayPause({ isPlay, onToggle }) {
    return (
        <div className="center text-center m-t-n cus-hand" onClick={onToggle}>
            {isPlay ? (
                <i className="icon-control-pause i-2x"></i>
            ) : (
                <i className="icon-control-play i-2x"></i>
            )}
        </div>
    );
}