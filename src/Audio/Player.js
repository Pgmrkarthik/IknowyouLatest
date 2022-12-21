import React,{useState, useRef, useEffect} from 'react';

export default function AudioPlayer(props) {
    const { src } = props;
    const audioPlayerref = useRef();
    const progressBar = useRef();
    const [isplaying, setIsplaying] = useState();
    
    const [currentTime, setCurrentTime] = useState(0);
    const [audioMarkers, setAudioMarkers] = useState([]);
    const [trackProgress, setTrackProgress] = useState(0);


    const changeRange = () => {
        audioPlayerref.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    };

    const changePlayerCurrentTime = () => {
        const { duration } = audioPlayerref.current;
        console.log(duration);
        progressBar.current.style.setProperty(
            "--seek-before-width",
            `${(progressBar.current.value / duration) * 100}%`
        );
        setCurrentTime(progressBar.current.value);
    };

  return (
    <>
    <audio
    ref={audioPlayerref}
    src={src}
    preload="auto"
    volume
    controls
   />

    <input
        type="range"
        className="progressBar bar"
        defaultValue="0"
        value={trackProgress}
        ref={progressBar}
        onChange={changeRange}
        width="50%"
    />
    </>
  )
}
