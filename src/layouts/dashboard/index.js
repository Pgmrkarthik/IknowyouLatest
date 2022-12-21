import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import { authenticationService } from '../../services/authservices';
import Login from '../../Page/CommonPages/Login/Login';
import DashboardNavbar from './DashboardNavbar';
import DashboardFooter from './DashboardFooter';
import Logo from '../../components/Logo';


// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  flexDirection:'column'
});

const MainStyle = styled('div')(({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop:140,
  marginBottom:'6rem',
  textAlign:'center',
  fontFamily:'Arial',
  color:'#000000'
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = authenticationService.currentUserValue;
  if(!currentUser) {
    return (
    <Login />
    )
  }
  return (
    <RootStyle>
      <DashboardNavbar/>
      <MainStyle>
        <Outlet />
      </MainStyle>
      <DashboardFooter/>
    </RootStyle>
  );
}
