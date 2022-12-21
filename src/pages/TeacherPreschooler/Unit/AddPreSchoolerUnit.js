import {useState,useRef  } from 'react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import axios, {CancelToken, isCancel} from 'axios';
import { Button,
    Stack,
    Container,
    Card,
    Typography,
    Avatar,
    TextField,
    LinearProgress,
    Alert,
    InputLabel,
    Select,
    MenuItem,
Box  } from "@mui/material";
import { useFormik, Form, FormikProvider, Field } from 'formik';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import Iconify from "../../../components/Iconify";
import Page from '../../../components/Page';
import { config } from '../../../config';
import { authenticationService } from '../../../services/authservices';
import { handleResponse } from '../../../helpers/handle_response';
import {PreSchoolerServices} from '../../../services/PreSchoolerUnitServices';



  // _______________________________________________
  // Main Function

function AddPreschoolerUnit() {

    const [response, setResponse] = useState();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sound, setSound]= useState();
    const [fileuploadresponse, setFileuploadresponse] =useState(false);
    const [errorresponse, setErrorresponse] = useState(false);
    const cancelFileupload = useRef(null);
    const navigate = useNavigate();
    
    const RegisterSchema = Yup.object().shape({
        UnitNumber: Yup.number().max(100, 'Too Long!').required('Please select unit')
      });
       const formik = useFormik({
        initialValues: {
          UnitNumber: '',
          UnitName:'',
          ApplicationUserId:authenticationService.currentUserValue.ApplicationUserId
        },
        validationSchema: RegisterSchema,
        onSubmit: (Values) => {
          setLoading(true);
          console.log(Values);
          PreSchoolerServices.AddPreSchoolerUnits(Values).then((response)=>{
                setLoading(false);
                console.log(response)
                setResponse(response.message);
                if(response.success){
                setFileuploadresponse(true);
                setTimeout(()=>{
                  setFileuploadresponse(false);
                  navigate('/Teacher/PreSchooler');
                },3000);
              }
              else{
                setErrorresponse(true);
                setTimeout(()=>{
                  setErrorresponse(false)
                },3000);
              }
            }).catch((error)=>{
              if(isCancel(error)){
                alert(error.message);
              } 
            })
         
        },
      });
   const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <Page title="PatAlong">
        <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h5" gutterBottom>
                           PreSchooler
                        </Typography>

                            <Button variant="contained"  to="/Teacher/Preschooler"  component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
                            Back
                           </Button>
                       
                    </Stack>
             <Card>
                <Container>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off"  onSubmit={handleSubmit}>
                            <Stack spacing={3} m={3}>
                            <Typography variant="h7" paragraph>
                                Add PreSchooler Unit
                            </Typography>
                            <Stack>  
                            <InputLabel  variant="standard" >Select Unit</InputLabel>
                            <Select
                              {...getFieldProps('UnitNumber')}
                              error={Boolean(touched.UnitNumber && errors.UnitNumber)}
                              helpertext={touched.UnitNumber && errors.UnitNumber}
                            >
                              <MenuItem value={1}>Unit 1</MenuItem>
                              <MenuItem value={2}>Unit 2</MenuItem>
                              <MenuItem value={3}>Unit 3</MenuItem>
                              <MenuItem value={4}>Unit 4</MenuItem>
                              <MenuItem value={5}>Unit 5</MenuItem>
                              <MenuItem value={6}>Unit 6</MenuItem>
                              <MenuItem value={7}>Unit 7</MenuItem>
                              <MenuItem value={8}>Unit 8</MenuItem>
                              <MenuItem value={9}>Unit 9</MenuItem>
                              <MenuItem value={10}>Unit 10</MenuItem>
                              <MenuItem value={11}>Unit 11</MenuItem>
                              <MenuItem value={12}>Unit 12</MenuItem>
                            </Select>
                            </Stack> 

                            
                            <Stack>
                            <InputLabel  variant="standard" >Unit Name (Optional)</InputLabel>
                              <TextField
                                fullWidth
                                {...getFieldProps('UnitName')}
                              />
                            </Stack>   
                        
                                    <LoadingButton startIcon={<Iconify icon="entypo:new-message" />} variant="contained" type="submit" loadingPosition="start" loading={loading}
                                    sx={{
                                        width:"150px"
                                    }}>
                                    Create
                                    </LoadingButton>
                            {fileuploadresponse && 
                                <Alert variant="outlined" severity="success">{response}</Alert>
                            } 
                            {errorresponse && 
                                <Alert variant="outlined" severity="error">{response}</Alert>
                            } 
                        </Stack>
                    </Form>
                 </FormikProvider>
              </Container>
            </Card>
        </Container>
    </Page>
  )
}

export default AddPreschoolerUnit