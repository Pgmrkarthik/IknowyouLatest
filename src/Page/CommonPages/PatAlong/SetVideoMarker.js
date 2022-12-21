import React, { useState, useRef, useEffect } from 'react';
import { Stack, Container, Typography, Link, Box, Grid, Card, Divider, Alert, Button } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react'
import { LoadingButton } from '@mui/lab';
import Audio from '../../../Audio/SimpleAudio';
import { VideoJS } from '../../../Video/VideoJs';
import "videojs-markers-plugin/dist/videojs-markers-plugin";
import "../../../Video/videojs.markers.plugin.css";
import { root } from '../../../config';
import Iconify from "../../../components/Iconify";
import { PatAlongServices } from '../../../services/PatAlongService';

function SetVideoMarker(props) {

    // const { word, action, id } = props;
    const location = useLocation();
    const [word, setWord] = useState(location.state.Word || false);
    const [wordName, setwordName] = useState();
    const [patAlong, setPatAlong] = useState();
    const [selectedMarkers, setSelectedMarkers] = useState([]); //  adding Markers from the previously stored
    const playerRef = useRef(null);
    const VideoJsRef = useRef(null);
    const navigate = useNavigate();
    const [saveloading, setSaveLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: root+word.VideoStoragePath,      // starting src needs to give first
            type: 'video/mp4'
        }]
    };


    // player on ready function 
    const handlePlayerReady = (player) => {
        console.log('hello')
        playerRef.current = player;
        if (word.Markers != null) {
            if (JSON.parse(word.Markers)) {
                selectedMarkers.push(...JSON.parse(word.Markers));
                console.log(selectedMarkers);
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
        console.log(word)
        PatAlongServices.UpdateMarkers(word.id, selectedMarkers).then((response) => {
            console.log(response.result);
            // word.Markers = response.result;
            setWord(response.result[0]);
            setSuccess(response.message);
            setSaveLoading(false);
            setSelectedMarkers(JSON.parse(`${word.Markers}`));
            playerRef.current.markers.reset(selectedMarkers);
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
    return (
        <Container>
            <Stack spacing={2}>
                <Stack direction={'row'} justifyContent={'space-between'} pl={4.5} >
                    <p className='Instraction' style={{ alignSelf: 'flex-end' }}>Words List{" > "} Word {" > "} Set Marker</p>
                    <button onClick={() => {
                        navigate('/home/patalong/')
                    }}>
                        <p>Back</p>
                    </button>
                </Stack>
                <Box className={'Unitcontainer'} p={2}>
                   
                    <Stack direction={'column'} spacing={2} p={2}>
                    <p className='Instraction'>Set Markers for the video:</p>
                        <Box
                        >
                            <VideoJS ref={VideoJsRef} options={videoJsOptions} onReady={handlePlayerReady} />
                        </Box>
                        <Box
                        >
                            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                                <Stack spacing={2} direction={'row'}>
                                <button className='MarkerButton' style={{ backgroundColor: '#f79000' }}
                                    onClick={AddMarker}>
                                    <p>+ Add Marker</p>
                                </button>
                                <button className='MarkerButton' style={{ backgroundColor: '#f40000' }}
                                    onClick={RemoveMarker}>
                                    <p>- Remove Marker</p>
                                </button>
                                </Stack>
                                <button className='MarkerButton'
                                    onClick={SaveMarkers}>
                                    <p>{<Icon icon="charm:circle-tick" />} Save Marker</p>
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
                </Box>
            </Stack>
        </Container>
    )
}

export default SetVideoMarker