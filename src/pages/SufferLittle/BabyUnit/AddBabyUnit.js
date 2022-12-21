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
import { authHeader } from '../../../helpers/authHeader';
import { PatAlongServices } from "../../../services/PatAlongService";
import { config } from '../../../config';
import { authenticationService } from '../../../services/authservices';
import { handleResponse } from '../../../helpers/handle_response';


LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };  
  
  // Progress bar
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }


  // _______________________________________________
  // Main Function

function AddBabyUnit() {

    const [response, setResponse] = useState();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sound, setSound]= useState();
    const [fileuploadresponse, setFileuploadresponse] =useState(false);
    const [errorresponse, setErrorresponse] = useState(false);
    const cancelFileupload = useRef(null);
    const navigate = useNavigate();
    



    // File uploading function
      const AddBabyUnit =(values)=>{
        const formData = new FormData();
        formData.append("Round",values.Round);
        formData.append('Sound',values.Sound); 
        if(authenticationService.currentUserValue.ApplicationUserRole === 'TEACHER'){
          formData.append('TeacherId');
        }
        formData.append('ApplicationUserId',values.ApplicationUserId);
        return axios({
            method: "POST",
            url: `${config.DP_ROOT_URL}/BabyUnit/Add.php`,
            data: formData,
            cancelToken : new CancelToken(cancel =>{
                cancelFileupload.current = cancel
              }),
              onUploadProgress: (progressEvent) =>{
                setLoading(true);
                if (progressEvent.lengthComputable) {
                  setProgress(progressEvent.loaded/progressEvent.total*100);
                }
                if(progressEvent.loaded === progressEvent.total){
                    setProgress(0);
                    setLoading(false);
                }
            }
        }).then(handleResponse);
    }

    const RegisterSchema = Yup.object().shape({
        Round: Yup.number().max(100, 'Too Long!').required('Please select unit'),
        Sound: Yup.mixed().required('Please select unit sound'),
      });
       const formik = useFormik({
        initialValues: {
          Round: '',
          Sound: '',
          ApplicationUserId:authenticationService.currentUserValue.ApplicationUserId
        },
        validationSchema: RegisterSchema,
        onSubmit: (Values) => {
          setLoading(true);
          console.log(Values);
          AddBabyUnit(Values).then((response)=>{
                setLoading(false);
                console.log(response)
                setResponse(response.message);
                if(response.success){
                setFileuploadresponse(true);
                setTimeout(()=>{
                  setFileuploadresponse(false);
                  navigate('/Admin/BabyUnit');
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
                            Baby Unit
                        </Typography>

                            <Button variant="contained"  to="/Admin/BabyUnit"  component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
                            Back
                           </Button>
                       
                    </Stack>
             <Card>
                <Container>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off"  onSubmit={handleSubmit}>
                            <Stack spacing={3} m={3}>
                            <Typography variant="h5" paragraph>
                                Add BabyUnit
                            </Typography>
                            <Stack spacing={3}>  
                            <InputLabel id="demo-simple-select-standard-label" variant="standard" >Select Unit</InputLabel>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              label="Unit"
                              {...getFieldProps('Round')}
                              error={Boolean(touched.Word && errors.Word)}
                              helperText={touched.Word && errors.Word}
                            >
                              <MenuItem value="None">
                                <em>None</em>
                              </MenuItem>
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
                            <Stack spacing={1}>
                                <p>Unit Sound:</p>  
                                <Field accept="audio/*"  type="file" name='audio' required
                                onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("Sound", file);
                                        setSound(URL.createObjectURL(file));
                                }}
                                error={Boolean(touched.Sound && errors.Sound)}
                                helperText={touched.Sound && errors.Sound}
                                />
                                {
                                    sound && <audio src={sound}  width={100} height={100}/>
                                }
                            </Stack>
                  
                                    <LoadingButton startIcon={<CloudUploadIcon />} variant="contained" type="submit" loadingPosition="start" loading={loading}
                                    sx={{
                                        width:"150px"
                                    }}>
                                    Upload
                                    </LoadingButton>
                                    {
                                                progress > 0 &&
                                                <Box sx={{ '& > button': { m: 1 } }}>
                                                <LinearProgressWithLabel value={progress} />
                                                </Box> 
                                    }
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

export default AddBabyUnit