import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Container,
  Card,
  Typography,
  Avatar,
  Alert,
  Box,
  Slider,
  LinearProgress,
  Grid,
} from "@mui/material";

import { pad } from "lodash";
import { styled } from "@mui/material/styles";
import { PauseCircleFilled, PlayCircleFilled } from "@material-ui/icons";
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import Iconify from "../components/Iconify";
import useAudioPlayer from "./useAudioPlayer";
import { BabyUnitServices } from "../services/BabyUnitServices";
import { root } from "../config";
import "./Audio.css";
import Bar from "./Bar";


const CSlider = styled(LinearProgress)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));


export default function Audio(props) {
  const audioRef = React.useRef(null);
  const progressBar = React.useRef(null);
  const { src } = props;
  const [playedtiming, setPlayedTiming] = useState('');

  //  const [soundMarkers, setSoundMarkers]=useState(BabyUnit.SoundMarkers ? [...JSON.parse(BabyUnit.SoundMarkers)] : []);
  const {
    curTime,
    duration,
    playing,
    mute,
    setPlaying,
    setClickedTime,
    markers,
    setMarkers,
    setMute
  } = useAudioPlayer();


  useEffect(() => {
    if(src){
      const playedMinites = parseInt(curTime/60);
      const playedSeconds = pad(parseInt(curTime % 60));
      setPlayedTiming(`${playedMinites}:${playedSeconds} `)
    }
    // if (playing) {
    //   const sizevalue = curTime / duration;
    //   const size = parseInt(sizevalue);
    //   progressBar.current.style.width = `${size}px`;
    // }
    console.log(curTime);
  }, [curTime]);

  return (
    <Box>
      <audio ref={audioRef} src={src} id="audio" />
      <Stack spacing={2} direction={"row"} width={"100%"}>
        {playing ? (
          <div onClick={() => setPlaying(false)} style={{ width: "50px" }}>
            <img
              src="/images/pause.png"
              alt="audio"
              width={"100%"}
              height={"100%"}
            />
          </div>
        ) : (
          <div
            className="player__button"
            onClick={() => setPlaying(true)}
            style={{ width: "50px" }}
          >
            <img
              src="/images/play-button.png"
              alt="audio"
              width={"100%"}
              height={"100%"}
            />
          </div>
        )}
       
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
        <Box>
        { mute ? (
          <div onClick={() =>{
            setMute(false); 
          } }
          style={{ width: "30px", height: "30px" }}
         >
            <img
              src="/images/mute.png"
              alt="audio"
              width={"100%"}
              height={"100%"}
             
            />
          </div>
        ) : (
          <div
          style={{ width: "30px", height: "30px" }}
            onClick={() => setMute(true)} 
          >
            <img
              src="/images/volume.png"
              alt="audio"
              width={"100%"}
              height={"100%"}
             
            />
          </div>
        )}
        </Box>
      </Stack>
    </Box>

  );
}
