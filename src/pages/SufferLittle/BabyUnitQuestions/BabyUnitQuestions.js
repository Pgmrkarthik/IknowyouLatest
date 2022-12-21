import React,{ useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container,
  Box,
  Card,
  Button,
  Avatar,
  Stack
 } from '@mui/material';
 import { DataGrid } from '@mui/x-data-grid';
 import { Label } from '@material-ui/icons';

//
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import {root} from '../../../config';
import { BabyUnitServices } from '../../../services/BabyUnitServices';

function BabyUnitQuestions() {
  
  const [rows, setRow] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  const getTableValue = ()=>{
    BabyUnitServices.GetBabyUnitQuestions(id).then((response)=>{
        console.log(response);
         if(response === null){
            setRow([]);
         }
         else{
            setRow(response.BabyUnitQuestions);
         }  
    })
    }


    const handleDetailOnClick=(selectedBabyUnit)=>{
        navigate(`/Admin/BabyUnitQuestions/Detail/${selectedBabyUnit.id}`,{state:selectedBabyUnit.row}); // to send exact row
    }
    const handleEditOnClick=(selectedBabyUnit)=>{
        navigate(`/Admin/BabyUnitQuestions/Edit/${selectedBabyUnit.id}`,{state:selectedBabyUnit.row}); // to send exact values
    }

      useEffect(()=>{
        getTableValue();
      },[]);

  const columns =[
      { field: 'Word', headerName: 'WORD', width: 200 },
        { field: 'ThumbnailStoragePath', headerName: 'THUMBNAIL',sortable: false, width: 280,height: 100,renderCell:(params)=> 
        <Avatar
        alt="video thumbnail"
        src={root+params.value}
        sx={{ width: 50, height: 50 }}
      />},
        { field: 'action',headerName:'ACTION', width:200,sortable: false,renderCell:(params)=>{
            return (
                <Stack direction="row" spacing={2}>
                    <Button size="small" onClick={()=>{
                        handleDetailOnClick(params);
                    }}>Detail</Button>
                    <Button size="small" onClick={()=>{
                        handleEditOnClick(params);
                    }}>Edit</Button>
                </Stack>
                
            );
        }}
    ]



  return (

    <Page title="BabyUnit">
        <Container>
                    <Card>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row-reverse',
                              p: 1,
                              m: 1,
                              bgcolor: 'background.paper',
                              borderRadius: 1,
                            }}
                            >
                            <Button onClick={()=>{
                                navigate(`/Admin/BabyUnitQuestions/Add`,{state:id});
                              }} variant="contained" startIcon={<Iconify icon="mdi:plus" />}> 
                                Add New
                              </Button>
                          </Box>

                          <Container>
                          <div style={{ height: 400, width: '100%' }}>
                              <DataGrid
                              rows={rows}
                              columns={columns}
                              pageSize={5}
                              rowsPerPageOptions={[10]}
                              />
                            </div>
                          </Container>
                    </Card>
        </Container>

    </Page>

    
  )
}

export default BabyUnitQuestions