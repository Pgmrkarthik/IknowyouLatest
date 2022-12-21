import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Avatar,Container, Button } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import { authenticationService } from '../../services/authservices';
import Logo from '../../components/Logo';

import {url} from '../../config';

// ----------------------------------------------------------------------


const RootStyle = styled('div')({
  background:'#000000',
  color:'#ffffff',
  position:'fixed',
  top:0,
  width:'100%',
  height:'8rem',
  textAlign:'center'
});

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar() {

  const navigate = useNavigate();

  const handleLogout =()=>{
    authenticationService.logout();
  }
  return (
    <RootStyle>
       <Container maxWidth={'false'}>
        <Logo sx={{top:'46px',position:'absolute',margin:0, transform: `translate(-201px, 10px)`}}/>
        <Box sx={{top:'9rem',position:'absolute',right:'3rem', zIndex:10}}>
       {
        window.location.href !== `${window.location.origin}/home/` &&
        <img src={'/images/BTN_Home.png'} alt='home' onClick={()=>{
          navigate('/home/')
        }}/>
       }
        

       </Box>        
        <Stack spacing={1.5} position={'absolute'}  right={0} pr={'2rem'} pt={'1.5rem'} direction={'row'}>
          <button style={{width:'100%',border: 0}}>
          <Stack spacing={1.5} direction={'row'}>
          <Iconify
           sx={{fontSize:'35px'}}
                 className="icon"
                  icon={"icon-park-solid:people"}
            />
            <a href='/login' onClick={handleLogout} style={{textAlign:'center'}}> <h3 style={{paddingTop:'10px'}}>Logout</h3></a>
            </Stack>
          </button>      
   </Stack>
    </Container>
    </RootStyle>

  );
}
