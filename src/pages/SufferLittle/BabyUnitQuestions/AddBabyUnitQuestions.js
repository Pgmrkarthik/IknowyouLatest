import {useState,useRef  } from 'react';
import { Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
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
Box  } from "@mui/material";
import { useFormik, Form, FormikProvider, Field } from 'formik';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Iconify from "../../../components/Iconify";



import Page from '../../../components/Page';
import { authHeader } from '../../../helpers/authHeader';
import { BabyUnitServices } from "../../../services/BabyUnitServices";
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

function AddBabyUnitQuestions() {

    const [response, setResponse] = useState();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [thumbnail, setThumbnail]= useState();
    const [videofile, setVideoFile]= useState();
    const [soundfile, setSoundFile]= useState();
    const [fileuploadresponse, setFileuploadresponse] =useState(false);
    const [errorresponse, setErrorresponse] = useState(false);
    const cancelFileupload = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state;
    // File uploading function
      const AddBabyUnitQuestion =(values)=>{
        
        const formData = new FormData();
        formData.append("BabyUnitId",id);
        formData.append("Word",values.Word);
        formData.append('Thumbnail',values.Thumbnail); 
        formData.append('Video',values.Video);
        formData.append('Sound',values.Sound);
        formData.append('ApplicationUserId',values.ApplicationUserId);
        return axios({
            method: "POST",
            url: `${config.DP_ROOT_URL}/BabyUnitQuestions/Add.php`,
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
        Word: Yup.string().max(100, 'Too Long!').required('Hospital name required'),
        Thumbnail: Yup.mixed().required('Thumbnail required'),
        Video:Yup.mixed().required('Video required'),
        Sound:Yup.mixed().required('Sound required')
      });
       const formik = useFormik({
        initialValues: {
          Word: '',
          Thumbnail: '',
          Video: '',
          Sound:'',
          Markers:'',
          SoundMarker:'',
          ApplicationUserId:authenticationService.currentUserValue.ApplicationUserId
        },
        validationSchema: RegisterSchema,
        onSubmit: (Values) => {
          setLoading(true);
          console.log(Values)
          AddBabyUnitQuestion(Values).then((response)=>{
                setLoading(false);
                console.log(response);
                setResponse(response.message);
                if(response.success){
                setFileuploadresponse(true);
                setTimeout(()=>{
                  setFileuploadresponse(false);
                  navigate(`/Admin/BabyUnit/${id}`);
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
    <Page title="BabyUnitQuestion">
        <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h5" gutterBottom>
                            BabyUnitQuestion
                        </Typography>

                            <Button variant="contained"  to={`/Admin/BabyUnit/${id}`} component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
                            Back
                           </Button>
                       
                    </Stack>
             <Card>
                <Container>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Stack spacing={3} m={3}>
                            <Typography variant="h5" paragraph>
                                Add BabyUnitQuestion
                            </Typography>
                            <Stack spacing={3}>  
                                <TextField
                                    required
                                    label="Word"
                                    defaultValue=""
                                    variant="standard"
                                    {...getFieldProps('Word')}
                                    error={Boolean(touched.Word && errors.Word)}
                                    helperText={touched.Word && errors.Word}
                                />
                            </Stack>
                            <Stack spacing={1}>
                                <p>Thumbnail :</p>  
                                <Field accept="image/*"  type="file" name='thumbnail' Required
                                onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("Thumbnail", file);
                                        setThumbnail(URL.createObjectURL(file));
                                }}
                                error={Boolean(touched.Thumbnail && errors.Thumbnail)}
                                helperText={touched.Thumbnail && errors.Thumbnail}
                                />
                                {
                                    thumbnail && <img src={thumbnail} alt="selected thumbnail" width={100} height={100}/>
                                }
                            </Stack>
                            <Stack spacing={1}>
                               <p>Video :</p>
                                <Field accept="video/*"  type="file" name='video' id='video' Required  onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("Video", file);
                                        setVideoFile(URL.createObjectURL(file));
                                }}
                                error={Boolean(touched.Video && errors.Video)}
                                helperText={touched.Video && errors.Video}
                                />
                                
                                { videofile &&
                                  <video src={videofile} autoPlay width={200} height={100} controls>
                                    <track kind='captions'  />
                                    yoour browser is not supporting video.
                                    </video>
                                }
                                
                            </Stack>
                            <Stack spacing={1}>
                               <p>Sound :</p>
                                <Field accept="audio/*"  type="file" name='audio' id='audio' Required onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("Sound", file);
                                        setSoundFile(URL.createObjectURL(file));
                                }}
                                error={Boolean(touched.Video && errors.Video)}
                                helperText={touched.Video && errors.Video}
                                />
                                
                                { soundfile &&
                                  <audio src={soundfile} width={200} height={100} controls />
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

export default AddBabyUnitQuestions