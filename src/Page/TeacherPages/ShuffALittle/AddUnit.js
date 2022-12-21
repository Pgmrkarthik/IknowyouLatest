import { Stack, Container, Typography, Link, Box, Grid,Card, Button, LinearProgress,Alert } from "@mui/material";
import React, { useEffect,useState, useRef } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axios, {CancelToken, isCancel} from 'axios';

import { BabyUnitServices } from '../../../services/BabyUnitServices';
import { root,config } from "../../../config";
import WordComponent from "./WordComponent";
import Audio from "../../../Audio/SimpleAudio";
import WordModification from "../../CommonPages/Components/WordModificationComponent";
import SetMarker from "../../CommonPages/Components/SetMarker";
import { handleResponse } from "../../../helpers/handle_response";
import SetVideoMarker from "../../CommonPages/PatAlong/SetVideoMarker";

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


function AddUnit() {

    const navigate = useNavigate();
    const location = useLocation();
    const AudioRef = useRef();
    const Unit = location.state ? location.state.Unit : false;
    const [unitwords, setUnitwords] = useState(false);
    const [UnitName, setUnitName] = useState(Unit?Unit.UnitName:'');
    const [audiofileName, setAudioFileName] = useState('No file choosen');
    const [response, setResponse] = useState();
    const [progress, setProgress] = useState(0);
    const [isWordList, setWordList] = useState(true);
    const [isOpenValue, setOpenValue] = useState(false);
    const [selectedWord, setSelectedWord] = useState([]);
    const cancelFileupload = useRef(null);
    const [AudioFileUrl, setAudioFileUrl] = useState(root+Unit.SoundStoragePath);
    const [fileuploadresponse, setFileuploadresponse] =useState(false);
    const [errorresponse, setErrorresponse] = useState(false);


    const [AudioFile, setAudioFile]= useState({
        preview: root+Unit.SoundStoragePath,
        raw: false
    });

    const AddShuffALittle =  () =>{
        console.log('Karthik')
    }

    useEffect(()=>{
        console.log(Unit)
        if(Unit){
            BabyUnitServices.GetBabyUnitQuestions(Unit.id).then(response => setUnitwords(response.BabyUnitQuestions)).catch((err)=>console.log(err))
        }
    },[Unit]);

//  ----------- Unit CRUD __________________________________________

const InputAudioFile =(e)=>{
    setAudioFile({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
    })
  //  setAudioFileUrl(URL.createObjectURL(e.target.files[0]));
    setAudioFileName(e.target.files[0].name);
}

const handleUpdate = ()=>{
    // check anything changed
    if(UnitName !== Unit.UnitName ||
      AudioFile.preview !== Unit.SoundStoragePath){
        return true;
    }
    return false; 
}


const UpdateUnit = () =>{
    if(handleUpdate){
    EditUnit().then((response)=>{
            console.log(response);
          setResponse(response.message);
          if(response.success){
            setUnitName(response.result[0].UnitName);
            setAudioFile({
                preview: root+response.result[0].SoundStoragePath,
                raw: false
            })
            setAudioFileName('No file choosen');      
          setFileuploadresponse(true);
          setTimeout(()=>{
            setFileuploadresponse(false);
          },3000);
        }
        else{
          setErrorresponse(true);
          setTimeout(()=>{
            setErrorresponse(false)
          },3000);
        }
      }).catch((error)=>{
        if(isCancel(error)){
          alert(error.message);
        } 
      })
    }else{
        setErrorresponse(true);
        setResponse('data not modified!')
            setTimeout(()=>{
              setErrorresponse(false)
            },3000);
    }   
}    


    const EditUnit = () => {
        const formData = new FormData();
        formData.append("UnitName",UnitName);
        formData.append('id',Unit.id);
        if(AudioFile.preview !== root + Unit.SoundStoragePath){
          formData.append('SoundFile',AudioFile.raw); 
        }
         return axios({
              method: "POST",
              url: `${config.DP_ROOT_URL}/BabyUnit/UpdateBabyUnit.php`,
              data: formData,
              cancelToken : new CancelToken(cancel =>{
                  cancelFileupload.current = cancel
                }),
                onUploadProgress: (progressEvent) =>{
                //   setLoading(true);
                  if (progressEvent.lengthComputable) {
                    setProgress(progressEvent.loaded/progressEvent.total*100);
                  }
                  if(progressEvent.loaded === progressEvent.total){
                      setProgress(0);
                    //   setLoading(false);
                  }
              }
          }).then(handleResponse);

    }

    return (
        <Container maxWidth="lg">
            <Box  mt={2}>
                <Stack spacing={5} textAlign={"center"}>
                    <p className="Heading1">
                        <a href="/home/toddlers" className="Heading1">
                            Toddlers{" "}
                        </a>{" "}
                        {" > "}
                        <a href="/home/shuffalittle" className="Heading1">
                            Shuff A Little
                        </a>
                        { Unit && 
                             ` > ${Unit.UnitName}`
                        }
                    </p>
                    <Stack direction={"row"} textAlign={"left"} spacing={4}>
                        <Box width={"35%"} pl={2} pr={2}>
                            <Stack spacing={2}> 
                                <Stack spacing={2} pb={2}>
                                    <p className="Instraction">Change Unit Name</p>
                                    <div>
                                        <input placeholder={`${Unit.UnitName}`}  value={UnitName} type="text" onChange={(e)=>{
                                           setUnitName(e.target.value);
                                        }}/>
                                    </div>
                                    {/* <button style={{ width: "120px" }} onClick={UnitNameUpdate}>
                                        <p>Update</p>
                                    </button> */}
                                </Stack>
                                <hr />
                                <Stack spacing={2} pb={2} direction="column">
                                    <p className="Instraction">Add or Modify Outro Audio</p>
                                    <label htmlFor="audioInput" className="FileInput" style={{width:'10.3em'}}>
                                        <input placeholder="Unit 1" type="file" id='audioInput' style={{display:'none',width:'10.3em'}} accept="audio/*" onChange={InputAudioFile} />
                                        <p>Choose file</p>
                                    </label>
                                    <p  className="Instraction2">{audiofileName.length > 20 && `${audiofileName.slice(0,20)}.....` || audiofileName}</p>
                                    {
                                        AudioFile &&
                                        <Audio src ={AudioFile.preview}/>
                                  
                                    }
 
                                </Stack>
                                <button style={{width:'100px'}} onClick={UpdateUnit}>
                                        <p>Update</p>
                                </button>
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
                        </Box>
                        <Box pl={2} width={'62%'}>
                            {
                                isWordList &&
                                <WordComponent Unit={Unit} action={(word,actionValue)=>{
                                    setSelectedWord(word);
                                    if(actionValue ==='SetMarker' || actionValue === 'Modify'){
                                        setOpenValue(actionValue);
                                        setWordList(false);
                                    }  
                                }}/>
                            }
                            {
                                isOpenValue ==='SetMarker' &&
                                <SetMarker word={selectedWord} action={(actionValue)=>{
                                    if(actionValue === 'IsImage'){
                                        setOpenValue(false);
                                        setWordList(true);

                                    }
                                }}/>
                            }
                             {
                                isOpenValue === 'Modify' &&
                                <WordModification word={selectedWord} action={(actionValue)=>{
                                    if(actionValue === 'IsImage'){
                                        setOpenValue(false);
                                        setWordList(true);

                                    }
                                }} />
                            }
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    );
}

export default AddUnit;
