import React, { useState, useRef } from 'react';
import { Stack, Container, Typography, Link, Box, Grid, Card, Divider, LinearProgress, Alert } from "@mui/material";
import axios, { CancelToken, isCancel } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Audio from '../../../Audio/BabyUnitModifyAudio';

import { root, config } from '../../../config';
import { handleResponse } from '../../../helpers/handle_response';


// Progress bar
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function WordModification(props) {

    const location = useLocation
    const [word, setWord] = useState(props.word);
    const { action } = props;
    const [wordName, setWordName] = useState(word.Word);
    const [imagefileName, setImageFileName] = useState('No file choosen');
    const [videofileName, setVideoFileName] = useState('No file choosen');
    const [soundfileName, setSoundFileName] = useState('No file choosen');
    const [response, setResponse] = useState();
    const [progress, setProgress] = useState(0);
    const [fileuploadresponse, setFileuploadresponse] = useState(false);
    const [errorresponse, setErrorresponse] = useState(false);
    const cancelFileupload = useRef(null);
    const [imageFile, setImageFile] = useState({
        preview: root + word.ThumbnailStoragePath,
        raw: false
    });
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

    const Update = () => {
        if (handleUpdate) {
            EditTeacherBabyUnit().then((response) => {
                console.log(response)
                setResponse(response.message);
                if (response.success){
                    setWord(response.result[0]);
                    setImageFile({
                        preview: root + response.result[0].ThumbnailStoragePath,
                        raw: false
                    })
                    setVideoFile({
                        preview: root + response.result[0].VideoStoragePath,
                        raw: false
                    });
                    setSoundFile({
                        preview: root + response.result[0].SoundStoragePath,
                        raw: false
                    })
                    setImageFileName('No file choosen');
                    setVideoFileName('No file choosen');
                    setSoundFileName('No file choosen');
                    setFileuploadresponse(true);
                    setTimeout(() => {

                        setFileuploadresponse(false);
                        // console.log(word);

                    }, 3000);
                }
                else {
                    setErrorresponse(true);
                    setTimeout(() => {
                        setErrorresponse(false)
                    }, 3000);
                }
            }).catch((error) => {
                if (isCancel(error)) {
                    alert(error.message);
                }
            })
        } else {
            setErrorresponse(true);
            setResponse('data not modified!')
            setTimeout(() => {
                setErrorresponse(false)
            }, 3000);
        }
    }

    // File update/Edit function
    const EditTeacherBabyUnit = () => {
        console.log(word);
        const formData = new FormData();
        formData.append("Word", wordName);
        formData.append('id', word.id);
        if (imageFile.preview !== root + word.ThumbnailStoragePath) {
            formData.append('Thumbnail', imageFile.raw);
        }
        if (VideoFile.preview !== root + word.VideoStoragePath) {
            formData.append('Video', VideoFile.raw);
        }
        if (SoundFile.preview !== root + word.SoundStoragePath) {
            formData.append('Sound', SoundFile.raw);
        }
        return axios({
            method: "POST",
            url: `${config.DP_ROOT_URL}/BabyUnitQuestions/Update.php`,
            data: formData,
            cancelToken: new CancelToken(cancel => {
                cancelFileupload.current = cancel
            }),
            onUploadProgress: (progressEvent) => {
                //   setLoading(true);
                if (progressEvent.lengthComputable) {
                    setProgress(progressEvent.loaded / progressEvent.total * 100);
                }
                if (progressEvent.loaded === progressEvent.total) {
                    setProgress(0);
                    //   setLoading(false);
                }
            }
        }).then(handleResponse);
    }


    const handleUpdate = () => {
        // check anything changed
        if (wordName !== word.Word ||
            imageFile.preview !== word.ThumbnailStoragePath ||
            VideoFile.preview !== word.VideoStoragePath ||
            SoundFile.preview !== word.SoundStoragePath) {
            return true;
        }
        return false;
    }

    const InputImageFile = (e) => {
        setImageFile({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
        setImageFileName(e.target.files[0].name)
    }
    const InputVideoFile = (e) => {
        setVideoFile({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
        setVideoFileName(e.target.files[0].name);
    }

    const InputAudioFile = (e) => {
        setSoundFile({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
        setSoundFileName(e.target.files[0].name);
    }



    return (

        <Stack spacing={2}>
            <Stack direction={'row'} justifyContent={'space-between'} pl={4.5}>
                <p className='Instraction'>Words List{" > "} Word {" > "} Modify</p>
                <button onClick={() => {
                    action('IsImage');
                }}>
                    <p>Back</p>
                </button>
            </Stack>
            <Stack spacing={2} className={'Unitcontainer'} p={2} >

                <Box
                    className='Box'
                    style={{ maxHeight: '70vh', overflow: 'auto' }}
                >
                    <Stack spacing={0.5} px={2} pb={2}>
                        <Stack spacing={2} width={'80%'} mb={2}>
                            <p className="Instraction">Change Words <i className="Instraction" style={{ fontSize: '18px' }}>{"(Must fill Two words, Not more or less)"}</i></p>
                            <div>
                                <input placeholder={`${wordName}`} value={wordName} type="text" onChange={(e) => {
                                    setWordName(e.target.value);
                                }} />
                            </div>
                        </Stack>
                        <hr />
                        <Stack spacing={2} py={2} direction={'row'}>
                            <Box className='imageContanier'>
                                <img src={imageFile.preview} alt='thumbnail' style={{ borderRadius: '15px' }} width={100} height={80} />
                            </Box>
                            <Box alignSelf={'center'}>
                                <Stack spacing={1} >
                                    <p className="Instraction">Change Thumbnail <i className="Instraction" style={{ fontSize: '18px' }}>{"(.png, .jpg,..)"}</i></p>
                                    <Stack direction={'row'} spacing={2} >
                                        <label htmlFor="ThumnailInput" className="FileInput" >
                                            <input type="file" id='ThumnailInput' style={{ display: 'none', width: '10.3em' }} accept="image/*" onChange={InputImageFile} />
                                            <p>Choose file</p>
                                        </label>
                                        <p className="Instraction2">{imagefileName.length > 20 && `${imagefileName.slice(0,20)}.....` || imagefileName}</p>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                        <hr />
                        <Stack spacing={2} direction={'row'} width={'100%'}>
                            <Box
                                width={'50%'}
                                py={2}
                            >
                                <Stack direction={'column'} spacing={2}>
                                    <p className="Instraction">Add or Modify Audio</p>
                                    <Stack direction={'row'} spacing={2}>
                                        <label htmlFor="SoundInput" className="FileInput" style={{ width: '10.3em' }}>
                                            <input type="file" id='SoundInput' style={{ display: 'none', width: '10.3em' }} accept="audio/*" onChange={InputAudioFile} />
                                            <p>Choose file</p>
                                        </label>
                                        <p className="Instraction2">{soundfileName.length > 20 && `${soundfileName.slice(0,20)}.....` || soundfileName} </p>
                                    </Stack>

                                    <Audio src={SoundFile.preview} />
                                    {/* <audio src={SoundFile.preview} controls /> */}

                                </Stack>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box
                                width={'50%'}
                                py={2}
                            >
                                <Stack direction={'column'} spacing={2}>
                                    <p className="Instraction">Add or Modify Video</p>
                                    <Stack direction={'row'} spacing={1} width={160} height={100}>
                                        <Stack direction={'column'} spacing={1}>
                                            <label htmlFor="VideoInput" className="FileInput">
                                                <input type="file" id='VideoInput' style={{ display: 'none', width: '10.3em' }} accept="video/*" onChange={InputVideoFile} />
                                                <p>Choose file</p>
                                            </label>
                                            <p className="Instraction2">{videofileName.length > 20 && `${videofileName.slice(0,20)}.....` || videofileName} </p>
                                        </Stack>
                                        <video width={'100%'} src={VideoFile.preview} controls />
                                    </Stack>

                                </Stack>
                            </Box>
                        </Stack>
                        <hr />
                    </Stack>

                </Box>
                <Stack px={2} pb={2} width={'100%'}>
                    <button onClick={Update}><p>Update</p></button>
                </Stack>
            </Stack>
            {
                progress > 0 &&
                <Box sx={{ '& > button': { m: 1 } }}>
                    <LinearProgressWithLabel value={progress} />
                </Box>
            }
            {fileuploadresponse &&
                <Alert variant="outlined" severity="success">{response}</Alert>
            }
            {errorresponse &&
                <Alert variant="outlined" severity="error">{response}</Alert>
            }
        </Stack>
    )
}

export default WordModification