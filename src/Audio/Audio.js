import React, { useEffect,useState } from "react";
import { Button,
  Stack,
  Container,
  Card,
  Typography,
  Avatar,
  Alert,
Box,  
Slider} from "@mui/material";
import { styled } from '@mui/material/styles';
import { PauseCircleFilled, PlayCircleFilled } from "@material-ui/icons";
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import Iconify from "../components/Iconify";
import useAudioPlayer from './useAudioPlayer';
import './audioPlayer.css';
import {BabyUnitServices} from '../services/BabyUnitServices';
import { root } from '../config';

const CSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
}));

export default function Audio(props) {
    const audioRef = React.useRef(null);
    const {BabyUnit, setBabyUnit} = props;
    const [soundMarkers, setSoundMarkers]=useState(BabyUnit.SoundMarkers ? [...JSON.parse(BabyUnit.SoundMarkers)] : []);
    const { curTime, duration, playing, setPlaying, setClickedTime, markers, setMarkers} = useAudioPlayer();

    const [saveloading, setSaveLoading]=useState(false);
    const [success, setSuccess]= useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
      setMarkers(soundMarkers);
    },[soundMarkers]);

       // audio
      const AddMarker =()=>{ 
          console.log(audioRef);
          if(markers){
            setSoundMarkers([...soundMarkers,{value:audioRef.current.currentTime}]);
          }
          else{
            setSoundMarkers([{value:audioRef.current.currentTime}]);
          };
      }

      const SaveMarkers=()=>{
        setSaveLoading(true);
        BabyUnitServices.UpdateSoundMarkers(BabyUnit.id, markers).then((response)=>{
          setBabyUnit(response.result[0]);
            setSuccess(response.message);
            setSoundMarkers(response.result[0].SoundMarkers ? [...JSON.parse(response.result[0].SoundMarkers)] : []);
            setTimeout(()=>{
              setSaveLoading(false);
              setSuccess(false);
            },3000)
        });
    };
    const handleChange = (event, newValue) => {
      if (typeof newValue === 'number') {
        audioRef.current.currentTime = newValue;
      }
    };
    const RemoveAudioMarker = () =>{
      if(markers){
        markers.pop();
        setSoundMarkers(markers);
      }
      else{
        setSoundMarkers([]);
      }
    }

    return (
      <>
      <div className="player">
        <audio ref={audioRef} id="audio">
          <source src={root + BabyUnit.SoundStoragePath} />
          Your browser does not support the <code>audio</code> element.
        </audio>

        <div className="controls">
          {playing ? 
             <button className="player__button" onClick={() => setPlaying(false)}>
             <PauseCircleFilled />
           </button> :
             <button className="player__button" onClick={() => setPlaying(true)}>
             <PlayCircleFilled />
           </button>
          }
          {
            duration && audioRef &&
            <CSlider
            aria-label="Temperature"
            defaultValue={0}
            color="error"
            max={audioRef.current.duration}
            value={audioRef.current.currentTime}
            marks={soundMarkers}
            onChange={handleChange}
          />
          }          
        </div>
      </div>
        <Stack  direction={'row'} spacing={2} m={2}>
        <Button variant="contained" color="warning" startIcon={<Icon icon="ant-design:plus-outlined" />} 
        onClick={AddMarker}>
          Add Marker
        </Button>
        <LoadingButton variant="contained" startIcon={<Icon icon="charm:circle-tick" />} loading={saveloading}
         color="success" onClick={SaveMarkers}>
        Save Marker
        </LoadingButton>
        <Button variant="contained"  color="error" startIcon={<Icon icon="akar-icons:minus" />}
         onClick={RemoveAudioMarker}>
         Remove Marker
        </Button>
        </Stack>
        {success && 
                <Alert variant="outlined" severity="success">{success}</Alert>
            } 
            {error && 
                <Alert variant="contained" severity="error">{error}</Alert>
            } 
    </>
    );
  }
  
