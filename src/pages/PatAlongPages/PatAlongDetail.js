import React, { useEffect,useState } from 'react';
import {  Link as RouterLink, useParams, useLocation } from "react-router-dom";
import { Button,
    Stack,
    Container,
    Card,
    Typography,
    Avatar,
Box  } from "@mui/material";
import Iconify from "../../components/Iconify";
// custom components
import Page from '../../components/Page';
import { authenticationService } from '../../services/authservices';
import { PatAlongServices } from '../../services/PatAlongService';
import { root } from '../../config';



function PatAlongDetail() {
    const [patAlong, setPatAlong] = useState([]);
    const {id} = useParams();
    console.log(id);
    useEffect(()=>{
        PatAlongServices.getPatAlongbyId(id).then((response)=>{
            setPatAlong(response.result[0]);
            console.log(response)
        })
    },[id])
  return (
    <Page title="PatAlong">
        <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h5" gutterBottom>
                            PatAlong Detail
                        </Typography>
                            <Button variant="contained"  to="/Admin/PatAlong"  component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
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
                            <video src={root+patAlong.VideoStoragePath} autoPlay controls>
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

export default PatAlongDetail