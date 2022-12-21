import React,{useState,useEffect} from 'react';
import {Link as RouterLink, useNavigate,useParams} from 'react-router-dom';
import {Card,
Container,
Box,
Button,
Stack,
Grid,
FormControl,
Select,
InputLabel,
Typography,
MenuItem} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// custom component
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import {root} from '../../../config';
import { BabyUnitServices } from '../../../services/BabyUnitServices';
import BabyUnitQuestions from '../BabyUnitQuestions/BabyUnitQuestions';


function BabyUnitDetail(){

  const [rows, setRow] = useState();

  const [BabyUnit, setBabyUnit] = useState();

  const {id} = useParams();
  useEffect(()=>{
    BabyUnitServices.GetBabyUnit(id).then((response)=>{
      setBabyUnit(response.result[0]);
      console.log(response)
  })
  },[id])
 
  return (
    <Container>
      <Stack mb={3}>
      { BabyUnit && <>
      <FormControl sx={{p:2, minWidth: 120 }} disabled>
        <h4>Unit :</h4>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabled"
          value={BabyUnit.Round}
          label="Unit"
        >
          <MenuItem value={BabyUnit.Round}>Unit {BabyUnit.Round}</MenuItem>
        </Select>
        </FormControl>
        <h4>Sound :</h4><audio src={root+BabyUnit.SoundStoragePath}  controls/>
        </>
      }
      </Stack>
    </Container>
  )
}

function DetailBabyUnit() {
    const navigate = useNavigate();
    const {id} =useParams();
  return (
    <Page title="BabyUnitDetails">
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h5" gutterBottom>
                            Baby Unit
                        </Typography>

                            <Button variant="contained"  to="/Admin/BabyUnit"  component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
                            Back
                           </Button>
                       
                    </Stack>
        <Stack m={2} spacing={2}>
        <Card id="UnitDetail"> 
                          <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            paddingTop={3}
                            paddingBottom={3}
                          >
                            <Grid item xs={3}>
                                <BabyUnitDetail/>
                            </Grid>   
                            
                          </Grid> 
                    
                    </Card>
                        <BabyUnitQuestions />
        </Stack>
        

        </Container>
        </Page>
  )
}

export default DetailBabyUnit