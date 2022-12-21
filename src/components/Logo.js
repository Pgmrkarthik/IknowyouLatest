import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

import {authenticationService} from '../services/authservices';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};
export default function Logo({ disabledLink = false, sx }) {
  // const theme = useTheme();

  // const PRIMARY_LIGHT = theme.palette.primary.light;

  // const PRIMARY_MAIN = theme.palette.primary.main;

  // const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const rootUrl ="https://meindoc.app/";



    const logo = <Box component="img" src="/images/IKU.png" sx={{ width:400, height: 80, ...sx}} />
  
  return logo;

}
