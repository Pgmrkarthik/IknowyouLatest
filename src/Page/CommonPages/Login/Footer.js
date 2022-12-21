import React from "react";
import './footer.css'
import { Box, Grid, Container, Stack, Typography, Button } from "@mui/material";

import Iconify from "../../../components/Iconify";

function Footer() {
  return (
    <footer>
      <Stack direction="row" alignItems="center" justifyContent="space-between" p={'2rem'} >
        <Box
          width={'45%'}
          textAlign={'left'}
          p={'2rem'}
        >
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid position={'relative'} xs={2} sm={4} md={4}>
              <div style={{ position: 'absolute', bottom: 0 }}>
                <a href="#">&#169;copy rights by 2022</a>
              </div>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <Stack spacing={1}>

                <a href="#"><p>About Us</p></a>
                <a href="#"><p>Contact</p></a>
                <a href="#"><p>Terms & conditions</p></a>
              </Stack>
            </Grid>
            {/* <Grid xs={2} sm={4} md={4}>
              <div>
                <Stack direction={"row"} spacing={2}>
                  <p>H</p>
                  <p>Hello</p>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <p>D</p>
                  <p>Fello</p>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <p>Super</p>
                </Stack>
              </div>
            </Grid> */}
          </Grid>
        </Box>
        <Box className="right">
          <Stack spacing={0.1} textAlign={'left'}>
            <h7>123,Evergreen Road Dist</h7>
            <h7>+123 4567890234</h7>
            <h7>India</h7>
          </Stack>
        </Box>
      </Stack>
    </footer>
  );
}

export default Footer;
