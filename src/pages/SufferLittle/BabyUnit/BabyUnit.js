import React,{useState,useEffect} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container,
  Box,
  Card,
  Button,
  Avatar,
  Stack,
  Typography
 } from '@mui/material';
 import { DataGrid } from '@mui/x-data-grid';
 import { Label } from '@material-ui/icons';

//
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import {root} from '../../../config';
import { BabyUnitServices } from '../../../services/BabyUnitServices';

function BabyUnit() {
  
  const [rows, setRow] = useState([]);
  const navigate = useNavigate();
  const getTableValue = ()=>{
    BabyUnitServices.GetAllBabyUnit().then((response)=>{
        console.log(response);
         if(response === null){
            setRow([]);
         }
         else{
            setRow(response.BabyUnits);
         }  
    })
    }


  const handleDetailOnClick=(selectedBabyUnit)=>{
    navigate(`/Admin/BabyUnit/${selectedBabyUnit.id}`,{state:selectedBabyUnit.row}); // to send exact row
}
const handleEditOnClick=(selectedBabyUnit)=>{
    navigate(`/Admin/BabyUnit/Edit/${selectedBabyUnit.id}`,{state:selectedBabyUnit.row}); // to send exact values
}

      useEffect(()=>{
        getTableValue();
      },[]);

  const columns =[
    { field: 'Round', headerName: 'ROUND',width:400, renderCell:(params)=>{
      return (
        <Typography>Unit {params.value}</Typography>

      )
    }},
    { field: 'action',headerName:'ACTION',width:400,sortable: false,renderCell:(params)=>{
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
        <Typography variant="h5" gutterBottom>
                            BabyUnit
                        </Typography>
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
                                navigate(`/Admin/AddBabyUnit`);
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

export default BabyUnit