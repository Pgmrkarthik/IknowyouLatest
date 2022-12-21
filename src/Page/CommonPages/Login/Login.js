import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Stack,Box,Container,Grid,Card } from '@mui/material';

import Header from './Header';
import Footer from './Footer';
import Maincontent from './Maincontent';
import { styles } from './styles';
import LoginForm from '../../../sections/auth/login/LoginForm';
// import bg from "images"

// style={{ backgroundImage: `url(/images/bg.webp)`, backgroundRepeat: 'no-repeat',
// backgroundSize: '100%', height:"100%"}}

const useStyles = makeStyles(styles);

function Login() {
  const classes = useStyles();
  return (
      <div className={classes.root}>
      <div className={classes.main}>
        <div className={classes.kidsImageLeft}>
          <img src={'/images/c2.png' } alt="logo" width={'100%'} height={'100%'}/>
        </div>
        <div className={classes.kidsImageRight}>
          <img src={'/images/c1.png' } alt="logo" width={'100%'} height={'100%'}/>
        </div>
        <Container>
        <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         minHeight={'87vh'}
         >
            <Stack spacing={6}>
              <Box>
              <img src={'/images/IKU.png' } alt="logo" width={'90%'} height={'100%'}/>
              </Box>
              <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
                >    
                  <LoginForm />   
              </Grid>
            </Stack>
        </Box>
        </Container>
        {/* <img className={classes.bodyimg} src="/images/bg.webp" alt="background images"/>  */}
        
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
      </div>  
  )
}

export default Login