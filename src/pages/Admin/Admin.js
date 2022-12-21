import React,{useState} from 'react';
import {
    Card,
    Typography,Container,Stack
} from '@mui/material';

import Page from '../../components/Page';
import AddAdminUser from './Add/AddAdminUser';
import AdminUserList from './Add/AdminUserList';

function Admin() {
  const [reload, setReload] = useState(false);
  return (
    <Page title="Admin">
         <Container>
            <Typography variant="h5" paragraph>
              Admin
            </Typography>
            <Stack spacing={3} m={3}>
              <Card>
                  <Container>
                      <AddAdminUser  data={[setReload,reload]} />
                  </Container>
                  </Card>
                  <Card>
                  <Container>
                      <AdminUserList  data={reload}/>
                  </Container>
              </Card>
            </Stack>
      </Container>
    </Page>
  )
}

export default Admin