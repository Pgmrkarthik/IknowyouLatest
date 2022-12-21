import React,{useState} from 'react';
import {
    Card,
    Typography,
    Stack,
    Container
} from '@mui/material';

import Page from '../../components/Page';
import RegisterWorker from './Customer/RegisterCustomer';
import WorkerListComponent from './Customer/CustomerList';

function Customer() {
  const [reload, setReload] = useState(false);
  return (
    <Page title="Customer">
      <Container>
        <Typography variant="h5" paragraph>
        Customer
        </Typography>
        <Stack spacing={3} m={3}>
          <Card>
              <Container>
                  <RegisterWorker  data={[setReload,reload]} />
              </Container>
              </Card>
              <Card>
              <Container>
                  <WorkerListComponent  data={reload}/>
              </Container>
          </Card>
        </Stack>
      </Container>

    </Page>
  )
}

export default Customer