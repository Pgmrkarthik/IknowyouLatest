import React from 'react';
import {
    Card,
    Typography,
    Container
} from '@mui/material';

import Page from '../../components/Page';

function Dashboard() {
  return (
    <Page title="Dashboard">
      <Container>
        <Typography variant="h5" paragraph>
          Dashboard
        </Typography>
      </Container>
    </Page>
  )
}

export default Dashboard;