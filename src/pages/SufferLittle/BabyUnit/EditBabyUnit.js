import { Card, Container,Stack,Typography,Button } from '@mui/material';
import React from 'react';
import {Link as RouterLink,useNavigate,useParams} from 'react-router-dom';


import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';



function EditBabyUnit() {

  return (
    <Page title="EditBabyUnit">
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h5" gutterBottom>
                            Edit BabyUnit
                        </Typography>

                            <Button variant="contained"  to="/Admin/BabyUnit"  component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
                            Back
                           </Button>
                       
                    </Stack>
            <Card>
                <>Edit BabyUnit</>
            </Card>
        </Container>
        </Page>
  )
}

export default EditBabyUnit