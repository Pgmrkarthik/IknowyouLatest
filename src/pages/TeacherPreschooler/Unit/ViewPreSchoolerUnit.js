import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Stack,
    Container,
    Card,
    Typography,
    Avatar,
    TextField,
    LinearProgress,
    Alert,
    InputLabel,
    Select,
    MenuItem,
    Box
} from "@mui/material";

import Iconify from "../../../components/Iconify";
import Page from '../../../components/Page';
import { root,config } from '../../../config';
import { authenticationService } from '../../../services/authservices';
import { handleResponse } from '../../../helpers/handle_response';
import { PreSchoolerServices } from '../../../services/PreSchoolerUnitServices';


function ViewPreSchoolerUnit() {

    const [rows, setRow] = useState([]);
    const location = useLocation();
    const Unit = location.state;

    console.log(Unit);
    const navigate = useNavigate();
    const getTableValue = () => {
        PreSchoolerServices.GetUnitScripts(Unit.id).then((response) => {
            if (response === null) {
                setRow([]);
            }
            else {
                setRow(response.Scripts);
            }
        })
    }
    useEffect(() => {
        getTableValue();
    }, []);

    const handleDetailOnClick = (selectedUnit) => {
        console.log(selectedUnit.id);

        navigate(`/Teacher/Preschooler/${Unit.id}/${selectedUnit.id}/Questions`, { state: selectedUnit.row }); // to send exact row
    }
    const handleEditOnClick = (selectedUnit) => {
        console.log(selectedUnit) // to send exact values
        PreSchoolerServices.RemovePreSchoolerUnit({ id: selectedUnit.id }).then((response) => {
            if (response && response.success === 1 && response.message === 'ok') {
                console.log('Message: Removed');
                getTableValue();
            }
        });
    }

    const columns = [
        {
            field: 'Name', headerName: 'NAME', width: 200, renderCell: (params) => {
                return (
                    <Typography fontSize={14}>Unit {params.value}</Typography>
                )
            }
        },
        { field: 'VideoStoragePath', headerName: 'VIDEO',sortable: false, width: 280,height: 100,renderCell:(params)=> 
        <video
        alt="video thumbnail"
        src={root+params.value}
        controls
        width="100%"
      />},
        {
            field: 'action', headerName: 'ACTION', width: 400, sortable: false, renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <Button size="small" onClick={() => {
                            handleDetailOnClick(params);
                        }}>View</Button>
                        <Button size="small" onClick={() => {
                            handleEditOnClick(params);
                        }}>Remove</Button>
                    </Stack>

                );
            }
        }
    ]


    return (
        <Page title="PreSchooler">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h5" gutterBottom>
                       unit {Unit.UnitNumber} / scripts
                    </Typography>
                    <Button variant="contained" to="/Teacher/Preschooler" component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
                        Back
                    </Button>

                </Stack>
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
                                navigate(`/Teacher/Preschooler/${Unit.id}/AddScript`);
                              }} variant="contained" startIcon={<Iconify icon="mdi:plus" />}> 
                                Add Script
                              </Button>
                          </Box>
                <Container>

                     <div style={{ height: 550, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[10]}
                            rowHeight={200}
                        />
                    </div>
            
                </Container>
                </Card>
            </Container>
        </Page>
    )
}

export default ViewPreSchoolerUnit