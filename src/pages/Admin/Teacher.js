import React,{useState} from 'react';
import {
    Card,
    Typography,
    Stack,
    Container
} from '@mui/material';
import Page from '../../components/Page';
import RegisterTeacher from './Teacher/RegisterTeacher';
import TeacherList from './Teacher/TeacherList';

function Teacher() {
  const [reload, setReload] = useState(false);
  return (
    <Page title="Teacher">
        <Container>
        <Typography variant="h5" paragraph>
          Teacher
        </Typography>
        <Stack spacing={3} m={3}>
          <Card>
              <Container>
                  <RegisterTeacher  data={[setReload,reload]} />
              </Container>
              </Card>
              <Card>
              <Container>
                  <TeacherList  data={reload}/>
              </Container>
          </Card>
        </Stack>
        </Container>
    </Page>
  )
}

export default Teacher;