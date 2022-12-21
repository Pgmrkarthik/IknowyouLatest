
import React, { useEffect,useState,useRef } from 'react';
import {  Link as RouterLink, useParams, useLocation } from "react-router-dom";
import { Button,
    Stack,
    Container,
    Card,
    Typography,
    Alert
  } from "@mui/material";
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import Iconify from "../../../components/Iconify";
// custom components
import Page from '../../../components/Page';
import {VideoJS} from '../../../Video/VideoJs';
import "videojs-markers-plugin/dist/videojs-markers-plugin";
import "../../../Video/videojs.markers.plugin.css";
import { BabyUnitServices } from '../../../services/BabyUnitServices';
import { root } from '../../../config';
import '../../../css/audio.css';
import Audio from '../../../Audio/Audio';




function TeacherDetailBabyUnitQuestions() {

   
   const location = useLocation();
    const [BabyUnit, setBabyUnit] = useState();
    const {id} = useParams();
    const [sbabyunit, setSbabyunit] = useState(location.state);
    const [selectedMarkers, setSelectedMarkers] = useState([]); //  adding Markers from the previously stored
    const playerRef = useRef();
    const [saveloading, setSaveLoading] = useState(false);
    const [success, setSuccess]= useState(false);
    const [error, setError] = useState(false);
    const [audioMarkers, setAudioMarkers] = useState([]);


    const videoJsOptions = {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        src:root+sbabyunit.VideoStoragePath,      // starting src needs to give first
        type: 'video/mp4'
      }]
    };

      // player on ready function 
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    if(BabyUnit.Markers != null){
      if(JSON.parse(BabyUnit.Markers)){
        selectedMarkers.push(...JSON.parse(BabyUnit.Markers));
        player.markers({
          markers:selectedMarkers
      });
      }
      else{
        player.markers({
          markers:[]
      });
      }
    }
    else{
      player.markers({
        markers:[]
    });
    }

  }

  const AddMarker =()=>{ 
    if(selectedMarkers){
      setSelectedMarkers([...selectedMarkers,{time:playerRef.current.currentTime()}]);
       playerRef.current.markers.add([{time:playerRef.current.currentTime()}]);
    }
    else{
      setSelectedMarkers([{time:playerRef.current.currentTime()}]);
      playerRef.current.markers.add([{time:playerRef.current.currentTime()}]);
    }
    };

    const SaveMarkers=()=>{
      setSaveLoading(true);
      BabyUnitServices.UpdateMarkers(BabyUnit.id, selectedMarkers).then((response)=>{
          setBabyUnit(response.result[0]);
          setSuccess(response.message);
          setSelectedMarkers(JSON.parse(`${BabyUnit.Markers}`));
          setTimeout(()=>{
            setSaveLoading(false);
            setSuccess(false);
          },3000)
      });
  };


     // Remove Marker........................................................................  
     const RemoveMarker=()=>{
      playerRef.current.markers.remove([selectedMarkers.length - 1]);
      if(selectedMarkers){
        selectedMarkers.pop();
        setSelectedMarkers(selectedMarkers);
      }  
      else{
        // alert Markers is empty
        setSelectedMarkers([]);
        playerRef.current.markers({
          markers:[]
        });
      }
    }
    
    useEffect(()=>{
      BabyUnitServices.GetBabyUnitQuestion(id).then((response)=>{
          setBabyUnit(response.BabyUnitQuestion[0]);
          console.log(BabyUnit);
          if(BabyUnit.Markers){
            setSelectedMarkers(JSON.parse(BabyUnit.Markers));
          }
        })
    },[]);

  return (
    <Page title="BabyUnit">
        <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h5" gutterBottom>
                        BabyUnit Question
                        </Typography>
                            <Button variant="contained"  to="/Teacher/BabyUnit"  component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
                            Back
                           </Button>
                    </Stack>
                        <Card>
                           <Container>
                           <Typography variant="h6" gutterBottom>
                            Question 
                           </Typography>
                           {
                            BabyUnit &&
                            <Stack spacing={3} m={2}>
                                <Stack spacing={2}>
                                 <h4>Word :</h4> 
                                 {BabyUnit.Word}
                                 </Stack>
                            <Stack spacing={2}>
                            <h4>Thumbnail :</h4>
                            <img src={root + BabyUnit.ThumbnailStoragePath} width={250} height={220} alt="thumbnail" />
                            </Stack>
                            <Stack spacing={2}>
                            <h4>Sound :</h4>
                              <Audio BabyUnit={BabyUnit} setBabyUnit={setBabyUnit} AMarkers={BabyUnit.SoundMarkers || []} />
                            </Stack>
                            <Stack spacing={2}>
                              <h4>Video :</h4>
                              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                              </Stack>
                                <Stack  direction={'row'} spacing={2}>
                                <Button variant="contained" color="warning" startIcon={<Icon icon="ant-design:plus-outlined" />} 
                                onClick={AddMarker}>
                                  Add Marker
                                </Button>
                                <LoadingButton variant="contained" startIcon={<Icon icon="charm:circle-tick" />} loading={saveloading}
                                 color="success" onClick={SaveMarkers}>
                                Save Marker
                                </LoadingButton>
                                <Button variant="contained"  color="error" startIcon={<Icon icon="akar-icons:minus" />}
                                 onClick={RemoveMarker}>
                                 Remove Marker
                                </Button>
                                </Stack>
                                
                                {success && 
                                        <Alert variant="outlined" severity="success">{success}</Alert>
                                    } 
                                    {error && 
                                        <Alert variant="contained" severity="error">{error}</Alert>
                                    } 
                            </Stack>
                           } 
                           </Container>
                        </Card>
                       
                  
        </Container>
    </Page>
  )
}

export default TeacherDetailBabyUnitQuestions