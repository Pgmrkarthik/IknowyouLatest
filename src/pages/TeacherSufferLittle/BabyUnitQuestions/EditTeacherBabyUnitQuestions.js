import React, { useEffect,useState,useRef } from 'react';
import {  Link as RouterLink, useParams, useLocation,useNavigate } from "react-router-dom";
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useFormik, Form, FormikProvider, Field } from 'formik';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';

import Iconify from "../../../components/Iconify";

// custom components
import Page from '../../../components/Page';
import { BabyUnitServices } from '../../../services/BabyUnitServices';

//
import { config, root } from '../../../config';
import { authenticationService } from '../../../services/authservices';
import { handleResponse } from '../../../helpers/handle_response';
import BabyUnit from '../BabyUnit/TeacherBabyUnit';



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

function EditTeacherBabyUnitQuestions() {

    const location = useLocation();
    const [response, setResponse] = useState();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [BabyUnitQuestion, setBabyUnitQuestion] = useState(location.state);
    const [Word, setWord]= useState(BabyUnitQuestion.Word);
    const [thumbnail, setThumbnail]=useState(root+BabyUnitQuestion.ThumbnailStoragePath);
    const [videofile, setVideoFile]=useState(root+BabyUnitQuestion.VideoStoragePath);
    const [soundfile, setSoundFile]=useState(root+BabyUnitQuestion.SoundStoragePath);
    const [fileuploadresponse, setFileuploadresponse] =useState(false);
    const [errorresponse, setErrorresponse] = useState(false);
    // const {id} = useParams();
    const cancelFileupload = useRef(null);
    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log(BabyUnitQuestion);
        BabyUnitServices.GetBabyUnitQuestion(BabyUnitQuestion.id).then((response)=>{
            setBabyUnitQuestion(response.BabyUnitQuestion[0]);
            setWord(BabyUnitQuestion.Word);
            console.log(response);
        })
    },[]);

    // File update/Edit function
    const EditBabyUnitQuestion =(Values)=>{
      const formData = new FormData();
      formData.append("Word",Values.Word);
      formData.append('id',BabyUnitQuestion.id);
      if(thumbnail !== root + BabyUnitQuestion.ThumbnailStoragePath){
        formData.append('Thumbnail',Values.Thumbnail); 
      }
      if(videofile !== root + BabyUnitQuestion.VideoStoragePath){
        formData.append('Video',Values.Video); 
      }
      if(soundfile !== root + BabyUnitQuestion.SoundStoragePath){
        formData.append('Sound',Values.Sound); 
      }
       return axios({
            method: "POST",
            url: `${config.DP_ROOT_URL}/BabyUnitQuestions/Update.php`,
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
      Word: Yup.string().max(100, 'Too Long!'),
      Thumbnail: Yup.mixed(),
      Video:Yup.mixed(),
      Sound:Yup.mixed()
    });
     const formik = useFormik({
      initialValues: {
        Word: BabyUnitQuestion.Word,
        Thumbnail: BabyUnitQuestion.ThumbnailStoragePath,
        Video: BabyUnitQuestion.VideoStoragePath,
        Sound: BabyUnitQuestion.SoundStoragePath,
        Markers:BabyUnitQuestion.Markers,
        SoundMarkers:BabyUnitQuestion.SoundMarkers,
        ApplicationUserId:authenticationService.currentUserValue.ApplicationUserId
      },
      validationSchema: RegisterSchema,
      onSubmit: (Values) => {
        if(handleUpdate(Values)){
        setLoading(true);
        EditBabyUnitQuestion(Values).then((response)=>{
              setLoading(false);
              console.log(response);
              setResponse(response.message);
              if(response.success){
              setFileuploadresponse(true);
              setTimeout(()=>{
                setFileuploadresponse(false);
              //  navigate('/Admin/BabyUnitQuestions/Detail/:id');
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
        }else{
            setErrorresponse(true);
            setResponse('data not modified!')
                setTimeout(()=>{
                  setErrorresponse(false)
                },3000);
        }
       
      },
    });

    const handleUpdate = (Values)=>{
        // check anything changed
        if(Values.Word !== BabyUnitQuestion.Word ||
          Values.thumbnail !== BabyUnitQuestion.ThumbnailStoragePath ||
          Values.videofile !== BabyUnitQuestion.VideoStoragePath ){
                return true;
        }
        return false; 
    }

    const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="BabyUnitQuestion">
        <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h5" gutterBottom>
                            BabyUnit Question
                        </Typography>
                            <Button variant="contained"  to="/Teacher/BabyUnit/"  component={RouterLink} startIcon={<Iconify icon="bx:arrow-back" />}>
                            Back
                           </Button>
                    </Stack>
                        <Card>

                           <Container>
                           <Typography variant="h6" gutterBottom m={3}>
                            Edit
                           </Typography>
                           {
                            BabyUnitQuestion &&
                            <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Stack spacing={3} m={3} mb={6}>
                                <Stack spacing={1}>
                                <h4>Word :</h4>
                                <TextField
                                    required
                                    variant="standard"
                                    {...getFieldProps('Word')}
                                    error={Boolean(touched.Word && errors.Word)}
                                    helperText={touched.Word && errors.Word}
                                />
                                 </Stack>
                                 <Stack spacing={1}>
                                <h4>Thumbnail:</h4>  
                                <Field accept="image/*"  type="file" name='thumbnail' required
                                onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("Thumbnail", file);
                                        setThumbnail(URL.createObjectURL(file));
                                }}
                                />
                                {
                                    thumbnail && <img src={thumbnail} alt="selected thumbnail" width={100} height={100}/>
                                }
                            </Stack>
                            <Stack spacing={1}>
                               <h4>Video:</h4>
                               <Field accept="video/*"  type="file" name='video' id='video' onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("Video", file);
                                        setVideoFile(URL.createObjectURL(file));
                                }}
                                />
                                
                                { videofile &&
                                  <video src={videofile} autoPlay width={200} height={100} controls>
                                    <track kind='captions'  />
                                    yoour browser is not supporting video.
                                    </video>
                                } 
                            </Stack>
                            <Stack spacing={1}>
                               <h4>Sound:</h4>
                               <Field accept="audio/*"  type="file" name='audio' id='audio' onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("Sound", file);
                                        setSoundFile(URL.createObjectURL(file));
                                }}
                                />
                                
                                { soundfile &&
                                  <audio src={soundfile} controls />
                                } 
                            </Stack>
                                <Stack spacing={2} mt={4}>
                                 <LoadingButton startIcon={<CloudUploadIcon />} variant="contained" type="submit" loadingPosition="start" loading={loading}
                                    sx={{
                                        width:"150px",
                                        right:"10px"
                                    }}>
                                    Update
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
                        </Stack>
                        </Form>
                        </FormikProvider>
                     }
                           </Container>
                  </Card>   
        </Container>
    </Page>
  )
}

export default EditTeacherBabyUnitQuestions