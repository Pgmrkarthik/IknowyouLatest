import React, { useEffect, useState } from 'react'
import { Stack, Container, Typography, Link, Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import { BabyUnitServices } from '../../services/BabyUnitServices';

const NewUnit = {
    UnitName:'New Unit',
    Round:1,
    SoundStoragePath:'',
}


function ShuffALittle() {
    const [Units, setUnits] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        BabyUnitServices.GetAllBabyUnit().then((response)=>{
            console.log(response)
            setUnits(response.BabyUnits);  
        });
    },[]);

    const handleAddNew =()=>{
        BabyUnitServices.AddNewBabyUnit().then((response)=>{
            console.log(response)
            if(response.success){
                setUnits(response.result)
            }
        })
    }
    const handleUnitClick = (SelectedUnit)=>{
       navigate('/home/shuffalittle/unit',{state:{Unit :SelectedUnit}});
    }

    const DeleteUnit =(unit)=>{
        BabyUnitServices.DeleteBabyUnit(unit.id).then((response)=>{
            if(response.success){
                setUnits(response.result)
            }
        })
    }
    const handleBack = () =>{
        navigate('/home/toddlers')
    }

    return (
        <Container maxWidth='md'>
            <Box>
                <Stack mt={2} spacing={3} textAlign={'center'} >
                    <p className='Heading1'><a href='/home/toddlers' className='Heading1'>Toddlers </a>{' >  Shuff A Little'}</p>
                    <Stack spacing={3} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <button>
                            <p>import units</p>
                        </button>
                        <p className='Instraction' style={{ paddingLeft: '20px', paddingRight: '20px' }}>Add or Modify Units for Shuff-A-Little Game</p>
                        <button onClick={handleBack}>
                            <p>Back</p>
                        </button>
                    </Stack>
                    <Stack spacing={2} p={4} className={'Unitcontainer'}>
                        <Box
                        style={{ maxHeight: '390px', overflow: 'auto' }}
                        >
                        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} pb={2}>
                            {
                            Units.map((value, index) => (
                                <Grid xs={2} sm={4} md={4} key={index} spacing={1}>
                                        <div  className='gridbutton' style={{padding:'2rem'}}>
                                        <Stack direction={'row'}alignItems={'center'} justifyContent={'space-between'}>
                                        <div style={{cursor:'pointer'}} onClick={()=>{
                                            handleUnitClick(value);
                                        }}>
                                        <Stack
                                        textAlign={'left'}
                                        >
                                        <p className='UnitName'>{value.UnitName}</p>
                                        <h3 className='DateTimeText'>Date Modified : {new Date(value.UpdatedAt).getDate()}/{new Date(value.UpdatedAt).getMonth()}/{new Date(value.UpdatedAt).getFullYear()} {new Date(value.UpdatedAt).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}</h3>
                                        </Stack>
                                        </div>
                                        <button className='garyClose' onClick={()=>{
                                            DeleteUnit(value);
                                        }}>
                                            x
                                        </button>
                                        </Stack>
                                        </div>
                                </Grid>
                            ))}
                        </Grid>
                        </Box>
                        <button onClick={handleAddNew}>
                        <p>Add Unit</p>
                        </button>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default ShuffALittle