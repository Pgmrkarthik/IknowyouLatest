import React from 'react';
import { Box, Stack, Grid, Typography, Container } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import './TeacherHome.css';


const CardStyle = styled('div')({
    minHeight: '300px',
    wordWrap: 'break-word',
    flexDirection:'column',
    boxShadow: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22), inset 0 0 10px rgba(0,0,0,0.25)`,
    borderRadius: '20px',
    background:'beige',
     
  });




function TeacherHome() {

    return (
        <Container>
            <Stack direction={"column"} spacing={4} mt={4}>
               <p className='Instraction'> Welcome to Teacher's Workspace</p>
                <Box >
                <Container maxWidth={'md'}>
                <Grid container spacing={5} columns={16}>
               
                    <Grid item xs={8} pt={2}>
                        <a href='/home/toddlers'>
                        <img src={'/images/Group1.png'} alt='Toddlers' width={'100%'} height={'100%'} style={{paddingTop:'4rem'}} />
                        </a>
                    </Grid>
                    <Grid item xs={8} textAlign={'left'}>
                    <img src={'/images/Group2.png'} alt='Toddlers' width={'100%'} height={'100%'}/>
                    </Grid>
                    
                </Grid>
                </Container>
          
                </Box>
            
                
            </Stack>

        </Container>
    )
}

export default TeacherHome