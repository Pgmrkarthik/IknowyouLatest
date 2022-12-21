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
import Bar from "./AudioBar";


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

  const { src, onReady, audioMarker, remove} = props;
  const audioRef = React.useRef(false);
  const progressBar = React.useRef(null);

  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [clickedTime, setClickedTime] = useState();
  const [playedtiming, setPlayedTiming] = useState('');

  useEffect(()=>{
    if(audioRef !== null && audioRef && duration){
    if(onReady){
      onReady(audioRef,duration);
    }
  }
  },[audioRef, duration]);
  
  if(audioRef !== null && audioRef){
   
    // if(onReady){
    //   onReady(audioRef);
    // }
    useEffect(()=>{      
        const setAudioData = () => {
            setDuration(audioRef.current.duration);
            setCurTime(audioRef.current.currentTime);
          }
          const setAudioTime = () => setCurTime(audioRef.current.currentTime);
          audioRef.current.addEventListener('loadeddata', setAudioData);
          audioRef.current.addEventListener("timeupdate", setAudioTime);
     
            if(playing){
                audioRef.current.play();
              }
              else{
                audioRef.current.pause();
              }

              if(mute){
                audioRef.current.muted = true;
              }
              else{
                audioRef.current.muted = false;
              }

              if(clickedTime && clickedTime !== curTime){
                audioRef.current.currentTime = clickedTime;
                setClickedTime(null);
              }
            
        return () => {
            audioRef.current.removeEventListener("loadeddata", setAudioData);
            audioRef.current.removeEventListener("timeupdate", setAudioTime);
          }
    });
  }

  return (
    <Box>
      <audio ref={audioRef} src={src}/>
      <Stack spacing={2} direction={"row"} width={"100%"} justifyContent={'space-between'}>
        {playing ? (
          <div onClick={() =>{
            setPlaying(false); 
          } }
          style={{width:'50px'}}
         >
            <img
              src="/images/pause.png"
              alt="audio"
              style={{width:'50px'}}
            />
          </div>
        ) : (
          <div
            className="player__button"
            onClick={() => setPlaying(true)}
            
          >
            <img
              src="/images/play-button.png"
              alt="audio"
              style={{width:'50px'}}
            />
          </div>
        )}
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} MarkerTimes={audioMarker}  deletemarker={remove}/>
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
