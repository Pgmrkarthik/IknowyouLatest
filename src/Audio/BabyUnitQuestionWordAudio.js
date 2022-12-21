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
import Iconify from "../components/Iconify";
import useAudioPlayer from "./useAudioPlayer";
import { BabyUnitServices } from "../services/BabyUnitServices";
import { root } from "../config";
import "./Audio.css";


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
  const audioReference = React.useRef(null);
  const progressBar = React.useRef(null);
  const { src } = props;
  const [playedtiming, setPlayedTiming] = useState('');
  //  const [soundMarkers, setSoundMarkers]=useState(BabyUnit.SoundMarkers ? [...JSON.parse(BabyUnit.SoundMarkers)] : []);
  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    markers,
    setMarkers,
  } = useAudioPlayer();
  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      audioReference.current.currentTime = newValue;
    }
  };

  const Update = () => {
    const sizevalue = (curTime * 400) / duration;
    const size = parseInt(sizevalue);
    progressBar.current.style.width = `${size}px`;
  };

  useEffect(() => {
    if(src){
      const playedMinites = parseInt(curTime/60);
      const playedSeconds = pad(parseInt(curTime % 60));
      setPlayedTiming(`${playedMinites}:${playedSeconds} `)
    }
    if (playing) {
      const sizevalue = curTime / duration;
      const size = Number(sizevalue);
      progressBar.current.style.width = `${size}px`;
    }
    console.log(curTime);
  }, [curTime]);

  return (
    <Box>
      <audio ref={audioReference} src={src}   id="audioref" />
      <Stack spacing={2} direction={"row"} width={"100%"}>
        {playing ? (
          <div onClick={() => setPlaying(false)} style={{ width: "50px" }}>
            <img
              src="/images/play-button.png"
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
        <Stack spacing={1} pt={1} direction={'column'}>
          <div class="defaultBar">
            <div class="progressBar" ref={progressBar} />
          </div>
         <Box>
           <p> {parseInt(curTime/60)}:{parseInt(curTime%60)} / {parseInt(duration/60)}:{parseInt(duration%60)}</p>
         </Box>
        </Stack>
        <Box>
          <div style={{ width: "30px", height: "30px" }}>
            <img
              src="/images/volume.png"
              alt="audio"
              width={"100%"}
              height={"100%"}
            />
          </div>
        </Box>
      </Stack>
    </Box>

  );
}
