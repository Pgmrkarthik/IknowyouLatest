import {useState} from 'react';

import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Avatar,Grid,Container } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import { authenticationService } from '../../services/authservices';
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

DashboardFooter.propTypes = {
  onOpenSidebar: PropTypes.func,
};
const RootStyle = styled('div')({
        background:'#000000',
        color:'#ffffff',
        position:'fixed',
        bottom:0,
        width:'100%',
        height:'5rem',
        fontFamily:'Arial',
  });

export default function DashboardFooter() {

   const data = authenticationService.currentUserValue;

  return (
    <RootStyle>
       <Container maxWidth={'false'}>
      <Stack direction="row" alignItems="center" justifyContent="space-between"  p={'2rem'}>
        <Box>
                    <h5>&#169;IKnowU 2022
                    </h5>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center" >
                    <a href='#'>UsefulLink 1</a>
                    <a href='#'>UsefulLink 1</a>
      
            </Stack>
    </Stack>
    </Container>
    </RootStyle>

  );
}
