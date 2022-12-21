import { useState,useEffect } from "react";
import { useNavigate,Navigate, redirect } from "react-router-dom";
import { Button,
    Stack,
    Container,
    Card,
    Typography,
    Avatar,
Box  } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Iconify from "../../components/Iconify";
// 
import Page from '../../components/Page';
import { PatAlongServices } from "../../services/PatAlongService";
import { root } from "../../config";

export default function TeacherPatAlong(props){
    const [rows, setRow] = useState([]);
    const navigate = useNavigate();
    const getTableValue = ()=>{
        PatAlongServices.GetPatAlong().then((response)=>{
        
             if(response === null){
                setRow([]);
             }
             else{
                setRow(response.result);
             }  
        })
        }
        const handleDetailOnClick=(selectedPatAlong)=>{
            navigate(`/Teacher/PatAlongDetail/${selectedPatAlong.id}`,{state:selectedPatAlong.row}); // to send exact row
        }
        const handleEditOnClick=(selectedPatAlong)=>{
            navigate(`/Teacher/EditPatAong/${selectedPatAlong.id}`,{state:selectedPatAlong.row}); // to send exact values
        }
    
  
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
  
    useEffect(()=>{
        getTableValue();
    },[]);
    return (
        <Page title="patALong">
        <Container>
        <Typography variant="h5" paragraph>
            PatAlong
          </Typography>
          <Card>
              <Container>
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
            navigate(`/Teacher/AddPatAlong`);
          }} variant="contained" startIcon={<Iconify icon="mdi:plus" />}> 
            Add New
          </Button>
        </Box>
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
    );
}
