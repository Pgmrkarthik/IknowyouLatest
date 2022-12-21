import React, { useState, useRef, useEffect } from 'react';
import { Stack, Container, Typography, Link, Box, Grid, Card, Divider, Alert, Button } from "@mui/material";
import { json, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react'
import { LoadingButton } from '@mui/lab';

import Audio from '../../../Audio/BabyUnitModifyAudio';
import { VideoJS } from '../../../Video/VideoJs';
import "videojs-markers-plugin/dist/videojs-markers-plugin";
import "../../../Video/videojs.markers.plugin.css";
import { root } from '../../../config';
import Iconify from "../../../components/Iconify";
import { PatAlongServices } from '../../../services/PatAlongService';
import { BabyUnitServices } from '../../../services/BabyUnitServices';
import '../../../Audio/Bar.css';



function SetMarker(props) {

  const { action } = props;
  const [remove, setRemove] = useState(false);
  const [word, setWord] = useState(props.word);
  const [patAlong, setPatAlong] = useState();
  const [selectedMarkers, setSelectedMarkers] = useState([]); //  adding Markers from the previously stored
  const [selectedAM, setSelectedAM] = useState();

  const playerRef = useRef(null);
  const AudioPlayerRef = useRef(null);


  const [saveloading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [asuccess, setASuccess] = useState(false);
  const [aerror, setAError] = useState(false);
  const [aCurrentTime, setAudioCurrentTime] = useState(props.word.SoundMarkers ? JSON.parse(props.word.SoundMarkers) : []);
  const [soundMarkers, setSoundMarkers] = useState([]);


  const [VideoFile, setVideoFile] = useState({
    preview: root + word.VideoStoragePath,
    raw: false
  });
  const [SoundFile, setSoundFile] = useState(
    {
      preview: root + word.SoundStoragePath,
      raw: false
    }
  );


  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: VideoFile.preview,      // starting src needs to give first
      type: 'video/mp4'
    }]
  };

  // player on ready function 
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    if (word.Markers != null) {
      if (JSON.parse(word.Markers)) {
        selectedMarkers.push(...JSON.parse(word.Markers));
        player.markers({
          markers: selectedMarkers
        });
      }
      else {
        player.markers({
          markers: []
        });
      }
    }
    else {
      player.markers({
        markers: []
      });
    }
    // You can handle player events here
    player.on('waiting', () => {
      console.log('player waiting')
      //  videojs.log('player is waiting');
    });
    player.on('dispose', () => {
      console.log('player waiting')
      // videojs.log('player will dispose');
    });
  };

  console.log(word);

  const AddMarker = () => {
    if (selectedMarkers) {
      setSelectedMarkers([...selectedMarkers, { time: playerRef.current.currentTime() }]);
      playerRef.current.markers.add([{ time: playerRef.current.currentTime() }]);
    }
    else {
      setSelectedMarkers([{ time: playerRef.current.currentTime() }]);
      playerRef.current.markers.add([{ time: playerRef.current.currentTime() }]);
    }
  };


  // Save Markers......................................................................
  const SaveMarkers = () => {
    setSaveLoading(true);
    BabyUnitServices.UpdateMarkers(word.id, selectedMarkers).then((response) => {
      console.log(response);
      setWord(response.result[0]);
      setSuccess(response.message);
      setSaveLoading(false);
      setSelectedMarkers(JSON.parse(`${word.Markers}`));
      setTimeout(() => {
        setSuccess(false);
      }, 3000)
    });
  };

  // Remove Marker........................................................................  
  const RemoveMarker = () => {
    playerRef.current.markers.remove([selectedMarkers.length - 1]);
    if (selectedMarkers) {
      selectedMarkers.pop();
      setSelectedMarkers(selectedMarkers);
    }
    else {
      // alert Markers is empty
      setSelectedMarkers([]);
      playerRef.current.markers({
        markers: []
      });
    }
  }

  // const AddSoundMarker = () => {
  //   console.log(aCurrentTime);
  //   if (aCurrentTime.length >= 2) {
  //     alert('you can not add more then two markers!')
  //   } else {
  //     setAudioCurrentTime([...aCurrentTime, { time: AudioPlayerRef.current.currentTime }]);
  //   }
  //   console.log(AudioPlayerRef.current.currentTime);
  // }

  const SaveSoundMarker = () => {
    BabyUnitServices.UpdateSoundMarkers(word.id, aCurrentTime).then((response) => {
      if(response.success){
        setWord(response.result[0]);
        setASuccess(response.message);
        setAudioCurrentTime(JSON.parse(`${word.SoundMarkers}`));
        setTimeout(() => {
          setASuccess(false);
        }, 3000)
      }
    })
  }


  const handleAudioPlayerReady = (player, duration) => {
   
    console.log('values');

    AudioPlayerRef.current = player.current;
    

    if(player.current && aCurrentTime.length > 0){

      if(word.SoundMarkers != null){
        soundMarkers.push(...JSON.parse(word.SoundMarkers));
        // const duration = AudioPlayerRef.current.duration;
        console.log(duration)
        soundMarkers.map((values,index)=>{
          console.log(values.time)
          console.log(duration)
              const curPercentage = (values.time / duration) * 100;
              const markerdiv = document.createElement('div');
              console.log(curPercentage)
              markerdiv.className = 'bar__marker_start';
              markerdiv.style.left = `${curPercentage}%`;
              document.getElementById('bar_progress').appendChild(markerdiv);
              });
      }
      
     
    }
  }

  const addmarker = () => {
    console.log(aCurrentTime.length);
    if (aCurrentTime.length < 2) {
      setAudioCurrentTime([...aCurrentTime, { time: AudioPlayerRef.current.currentTime }]);
      const curtime = AudioPlayerRef.current.currentTime;
      const duration = AudioPlayerRef.current.duration;
      console.log(duration, curtime);
      const curPercentage = (curtime / duration) * 100;
      const markerdiv = document.createElement('div');
      markerdiv.className = 'bar__marker_start';
      markerdiv.style.left = `${curPercentage}%`;
      document.getElementById('bar_progress').appendChild(markerdiv);
    } 
    else {
      alert('you can not add more then two markers!');
    }
  }


  const removeMarker = () => {
    if(aCurrentTime.length === 0){
      alert('There is no marker');
    }
    else{
      const progressBar = document.getElementById('bar_progress');
      progressBar.removeChild(progressBar.lastChild);
      aCurrentTime.pop();
    
    }
  }


  return (
    <Stack spacing={2}>
      <Stack direction={'row'} justifyContent={'space-between'} pl={4.5}>
        <p className='Instraction' alignSelf={'center'}>Words List{" > "} Word {" > "} Set Marker</p>
        <button onClick={() => {
          action('IsImage');
        }}>
          <p>Back</p>
        </button>
      </Stack>
      <Box className={'Unitcontainer'} p={4} style={{ maxHeight: '70vh', overflow: 'auto' }}>
        <Stack spacing={2} pb={2} direction={'column'}>
          <p className='Instraction'>Set Markers for the video:</p>
          <Stack direction={'row'} spacing={3} width={'100%'}>
            <Box
              width={'100%'}
              pb={1}
            >
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </Box>
            <Box
              width={'25%'}
              alignSelf={'center'}
            >
              <Stack direction={'column'} spacing={2}>
                <button className='MarkerButton' style={{ backgroundColor: '#f79000' }}
                  onClick={AddMarker}>
                  <p>+ Add Marker</p>
                </button>
                <button className='MarkerButton' style={{ backgroundColor: '#f40000' }}
                  onClick={RemoveMarker}>
                  <p>- Remove Marker</p>
                </button>
                <button className='MarkerButton'
                  onClick={SaveMarkers}>
                  <p style={{ alignSelf: 'center' }}>{<Icon icon="charm:circle-tick" />} Save Marker</p>
                </button>
                {/* <LoadingButton style={{backgroundColor:'#000000'}} startIcon={<Icon icon="charm:circle-tick" />} loading={saveloading}
                                 color="success" onClick={SaveMarkers}>
                                Save Marker
                                </LoadingButton> */}


              </Stack>
            </Box>
          </Stack>
          {success &&
            <Alert variant="outlined" severity="success">{success}</Alert>
          }
          {error &&
            <Alert variant="contained" severity="error">{error}</Alert>
          }
          <hr />
        </Stack>
        <p className='Instraction'>Set Markers for the audio:</p>
        <i className="Instraction" style={{ fontSize: '16px' }}>{"(Only 2 markers needed, Start and End)"}</i>
        <Stack direction={'row'} spacing={2} mt={2}>
          <Audio src={SoundFile.preview} onReady={handleAudioPlayerReady} audioMarker={aCurrentTime} remove={remove} />
          <Stack direction={'column'} spacing={1} >
            <button className='MarkerButton' style={{ backgroundColor: '#f79000' }}
              onClick={addmarker}>
              <p>+ Add Marker</p>
            </button>
            <button className='MarkerButton' style={{ backgroundColor: '#f40000' }}
              onClick={removeMarker}>
              <p>- Remove Marker</p>
            </button>
          </Stack>
          <Box
            alignSelf={'flex-end'}
          >
            <button className='MarkerButton'
              onClick={SaveSoundMarker}>
              <p style={{ alignSelf: 'center' }}>{<Icon icon="charm:circle-tick" />} Save Marker</p>
            </button>
          </Box>
        
        </Stack>
        {asuccess &&
          <Alert variant="outlined" severity="success">{asuccess}</Alert>
        }
        {aerror &&
          <Alert variant="contained" severity="error">{aerror}</Alert>
        }

      </Box>

    </Stack>
  )
}

export default SetMarker