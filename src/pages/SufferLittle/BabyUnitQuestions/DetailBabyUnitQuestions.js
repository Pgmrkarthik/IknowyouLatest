
import React, { useEffect,useState,useRef } from 'react';
import {  Link as RouterLink, useParams, useLocation } from "react-router-dom";
import { Button,
    Stack,
    Container,
    Card,
    Typography,
    Avatar,
Box  } from "@mui/material";
import Iconify from "../../../components/Iconify";
// custom components
import Page from '../../../components/Page';
import { authenticationService } from '../../../services/authservices';
import { BabyUnitServices } from '../../../services/BabyUnitServices';
import { root } from '../../../config';



function DetailBabyUnitQuestions() {
    const [BabyUnit, setBabyUnit] = useState([]);
    const {id} = useParams();
    const audioPlayer = useRef();
    const handlePlayerReady=()=>{
      console.log(audioPlayer);
    }
    console.log(id);
    useEffect(()=>{
      BabyUnitServices.GetBabyUnitQuestion(id).then((response)=>{
          setBabyUnit(response.BabyUnitQuestion[0]);
          console.log(audioPlayer);
          handlePlayerReady();
        })
    },[id])
  return (
    <Page title="BabyUnit">
        <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h5" gutterBottom>
                        BabyUnit Detail
                        </Typography>
                            <Button variant="contained"  to="/Admin/BabyUnit"  component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
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
                            <img src={root+BabyUnit.ThumbnailStoragePath} width={250} height={220} alt="thumbnail" />
                            </Stack>
                            <Stack spacing={2}>
                            <h4>Sound :</h4>
                            <audio ref={audioPlayer} src={root+BabyUnit.SoundStoragePath} controls/>
                            </Stack>
                            <Stack spacing={2}>
                            <h4>Video :</h4>
                            <video src={root+BabyUnit.VideoStoragePath} autoPlay controls>
                                    <track kind='captions'  />
                                    yoour browser is not supporting video.
                            </video>
                            </Stack>
                            </Stack>
                           }
                           
                           </Container>
                        </Card>
                       
                  
        </Container>
    </Page>
  )
}

export default DetailBabyUnitQuestions