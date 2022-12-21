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
import { PreSchoolerServices } from '../../../services/PreSchoolerUnitServices';

function PreschoolerUnit() {
  
  const [rows, setRow] = useState([]);
  const navigate = useNavigate();
  const getTableValue = ()=>{
    PreSchoolerServices.GetAllUnits().then((response)=>{
         if(response === null){
            setRow([]);
         }
         else{
            setRow(response.PreSchooler);
         }  
    })
    }
  const handleDetailOnClick=(selectedUnit)=>{
    
    navigate(`/Teacher/Preschooler/${selectedUnit.id}`,{state:selectedUnit.row}); // to send exact row
}
const handleEditOnClick=(selectedUnit)=>{
    console.log(selectedUnit) // to send exact values
    PreSchoolerServices.RemovePreSchoolerUnit({id:selectedUnit.id}).then((response)=>{
      if(response && response.success === 1 && response.message ==='ok'){
        console.log('Message: Removed');
        getTableValue();
      }
    });
}
 useEffect(()=>{
        getTableValue();
 },[]);

  const columns =[
    { field: 'UnitNumber', headerName: 'UNIT',width:120, renderCell:(params)=>{
      return (
        <Typography fontSize={14}>Unit {params.value}</Typography>
      )
    }},
    { field: 'UnitName', headerName: 'NAME',width:200, renderCell:(params)=>{
      if(!params.value){
        return (
          <Typography fontSize={14}><b>...</b></Typography>
        )
      }

     
    }},
    { field: 'action',headerName:'ACTION',width:400,sortable: false,renderCell:(params)=>{
        return (
            <Stack direction="row" spacing={2}>
                <Button size="small" onClick={()=>{
                    handleDetailOnClick(params);
                }}>Detail</Button>
                <Button size="small" onClick={()=>{
                    handleEditOnClick(params);
                }}>Remove</Button>
            </Stack>
            
        );
    }}
]



  return (

    <Page title="Preschooler">
        <Container>
        <Typography variant="h5" gutterBottom>
                            Preschooler / unit
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
                                navigate(`/Teacher/Preschooler/Add`);
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

export default PreschoolerUnit