import React, { useEffect,useState,useRef } from 'react';
import {  Link as RouterLink, useParams, useLocation, json } from "react-router-dom";
import { Button,
    Stack,
    Container,
    Card,
    Typography,
    Avatar,
    Alert,
Box,  
Grid} from "@mui/material";
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import {VideoJS} from '../../../Video/VideoJs';
import "videojs-markers-plugin/dist/videojs-markers-plugin";
import "../../../Video/videojs.markers.plugin.css";

import Iconify from "../../../components/Iconify";
// custom components
import Page from '../../../components/Page';
import { PatAlongServices } from '../../../services/PatAlongService';
import { root } from '../../../config';



export default function DetailTeacherPatAlong() {

    const location = useLocation();
    const [patAlong, setPatAlong] = useState();
    const [spatAlong, setSPatAlong] = useState(location.state);
    const {id} = useParams();
    const [selectedMarkers, setSelectedMarkers] = useState([]); //  adding Markers from the previously stored
    const playerRef = useRef(null);
    const [saveloading, setSaveLoading] = useState(false);
    const [success, setSuccess]= useState(false);
    const [error, setError] = useState(false);

    
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src:root+spatAlong.VideoStoragePath,      // starting src needs to give first
      type: 'video/mp4'
    }]
  };

  // player on ready function 
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    if(patAlong.Markers != null){
      if(JSON.parse(patAlong.Markers)){
        selectedMarkers.push(...JSON.parse(patAlong.Markers));
        console.log(selectedMarkers);
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


    // Save Markers......................................................................

    const SaveMarkers=()=>{
        setSaveLoading(true);
        PatAlongServices.UpdateMarkers(patAlong.id, selectedMarkers).then((response)=>{
            console.log(response);
            setPatAlong(response.result[0]);
            setSuccess(response.message);
            setSaveLoading(false);
            setSelectedMarkers(JSON.parse(`${patAlong.Markers}`));

            setTimeout(()=>{
              setSuccess(false);
            },3000)
        });
    };

    // Remove Marker........................................................................  
    const RemoveMarker=()=>{
      playerRef.current.markers.remove([selectedMarkers.length-1]);
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
      PatAlongServices.getPatAlongbyId(id).then((response)=>{
        setPatAlong(response.result[0]);
        setSelectedMarkers(JSON.parse(`${patAlong.Markers}`));
    })
  },[]);
    

  return (
        <Page title="PatAlong">
                      <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h5" gutterBottom>
                            PatAlong Detail
                        </Typography>
                            <Button variant="contained"  to="/Teacher/PatAlong"  component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
                            Back
                           </Button>
                    </Stack>
                        <Card>
                           <Container>
                           <Typography variant="h6" gutterBottom>
                            PatAlong
                           </Typography>
                           {
                            patAlong &&
                            <Stack spacing={3} m={2}>
                                <Stack spacing={2}>
                                 <h4>Word :</h4> 
                                 {patAlong.Word}
                                 </Stack>
                              <Stack spacing={2}>
                              <h4>Thumbnail :</h4>
                              <img src={root+patAlong.ThumbnailStoragePath} width={250} height={220} alt="thumbnail" />
                              </Stack>

                              <Stack spacing={2}>
                              <h4>Video :</h4>
                              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                              </Stack>
                                <Stack JustifyContent={'center'} direction={'row'} spacing={2}>
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
