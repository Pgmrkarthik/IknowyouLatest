import React, { useEffect, useState } from 'react';
import { Stack, Container, Typography, Link, Box, Grid, Card } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { PatAlongServices } from '../../../services/PatAlongService';
import SetMarker from '../Components/SetMarker';
import { url,root } from '../../../config';

const newWord = {
    Word: 'Word1 Word2',
    ThumbnailStoragePath: 'picture.png',
    VideoStoragePath: '/static/video/SampleVideo.mp4',
    SoundStoragePath: '/static/audio/SampleAudio.mp3',
    Markers: '',
    SoundMarkers: '',
    CreatedAt: new Date(),
    UpdatedAt: new Date()
}

function PatWordList() {

    const [WordList, setWordList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        PatAlongServices.GetPatAlong().then((response) => {
            setWordList(response.result);
            console.log(response)
        });
    },[])

    const addNewWord = () => {
        PatAlongServices.AddNewWordPatAlong().then((response) => {
            setWordList(response.result);
            console.log(response)
        });
    }
    const ImportAdminWords = () =>{
        console.log('Import Admin Words!');
    }

    const RemoveWord = (word)=>{
        PatAlongServices.DeletePatAlong(word.id).then((response)=>{
            console.log(response)
            setWordList(response.result);
        })
    }

    return (
        <Container>
            <Stack spacing={2}>
                <Stack spacing={2}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <button onClick={ImportAdminWords}>
                            <p>Import Words</p>
                        </button>
                        <p className='Instraction' style={{ alignSelf: 'flex-end' }}>Words List</p>
                        <button onClick={() => {
                            navigate('/home/toddlers')
                        }}>
                            <p>Back</p>
                        </button>
                    </Stack>
                    <Stack spacing={2} className={'Unitcontainer'} p={2} >
                        <Box
                            style={{ maxHeight: '45vh', overflow: 'auto' }}
                        >
                            <Stack spacing={2} px={2} pb={2}>
                                {
                                    WordList && WordList.length > 0 &&
                                    WordList.map((word, index) =>(
 
                                        <Box key={index}>
                                            <div className='gridbutton' style={{ width: '100%' }} >
                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                    <Stack
                                                        textAlign={'left'}
                                                        direction={'row'}
                                                        spacing={1.5}
                                                    >
                                                        <div className='imageContanier'>
                                                            <img src={root+word.ThumbnailStoragePath} alt='thumbnail' style={{ borderRadius: '15px' }} width='100' height='80' />
                                                        </div>
                                                        <Stack
                                                            textAlign={'left'}
                                                            alignContent={'bottom'}
                                                            alignSelf={'center'}
                                                        >
                                                            <p className='UnitName'>{word.Word}</p>
                                                            <h3 className='DateTimeText'>Date Modified : {new Date(word.UpdatedAt).getDate()}/{new Date(word.UpdatedAt).getMonth()}/{new Date(word.UpdatedAt).getFullYear()} {new Date(word.UpdatedAt).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}</h3>
                                                        </Stack>
                                                    </Stack>
                                                    <Box
                                                        py={1}
                                                        alignContent={'right'}
                                                        justifyContent={'right'}
                                                        alignSelf={'center'}
                                                    >
                                                        <Stack direction={'row'} spacing={1.5}>
                                                            <button className='bgorange' onClick={()=>{
                                                                navigate('/home/patalong/setmarker/',{state:{Word: word}})
                                                            }}>Set Marker</button>
                                                            <button className='bgpink' onClick={()=>{
                                                               navigate('/home/patalong/Modify/',{state:{Word: word}})
                                                            }}>Modify</button>
                                                            <button className='garyClose' onClick={()=>{
                                                                RemoveWord(word);
                                                            }}>x</button>
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                            </div>
                                        </Box>
                                    ))
                                    ||
                                    <p className='Instraction' style={{ textAlign: 'center',fontSize:'18px' }}> Empty!</p>
                                }
                            </Stack>

                        </Box>
                        <Stack px={2} pb={2} width={'100%'}>
                            <button onClick={addNewWord}><p>Add New Word</p></button>
                        </Stack>
                    </Stack>

                </Stack>
            </Stack>
        </Container>
    )
}

export default PatWordList