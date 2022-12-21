import React, { useState, useEffect, createContext, useRef } from 'react';
import {
  Container,
  Card,
  Stack,
  TextField,
  Grid,
  Select,
  MenuItem,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
  LinearProgress,
  InputLabel
} from '@mui/material';
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, Field } from "formik";
import axios, { CancelToken, isCancel } from "axios";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { LoadingButton } from "@mui/lab";

import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

import { useNavigate, useParams, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { authHeader } from "../../../../helpers/authHeader";
import Iconify from "../../../../components/Iconify";
import Page from "../../../../components/Page";
import { config, root } from "../../../../config";
import { authenticationService } from "../../../../services/authservices";
import { handleResponse } from "../../../../helpers/handle_response";
import { PreSchoolerServices } from '../../../../services/PreSchoolerUnitServices';





const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: "100%",
    justifyContent: 'space-around',
    height: 190,
    background: 'rgba(0,0,0,0)'
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: '#2065D1',
  },
  titleBar: {
    background:
      'rgba(0,0,0,0)',
  },
}));



function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}


function AddQuestion() {

  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, scriptid,} = useParams();

  const [response, setResponse] = useState();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videofile, setVideoFile] = useState();
  const [fileuploadresponse, setFileuploadresponse] = useState(false);
  const [errorresponse, setErrorresponse] = useState(false);
  const [answerUpdated, setanswerUpdated] = useState(false);
  const [AnswerError, setAnswerError] = useState(false);
  const [uploadbtn, setUploadbtn] = useState(false);
  const [nextbtn, setNextbtn] = useState(true);
  const [correctanswer, setCorrectAnswer] = useState();
  const [questionText, setQuestionText] = useState();
  const [imageGallery, setImageGallery] = useState(false);
  const [image, setImage] = useState(false);
  const [ForegroundImage, setForegroundImage] = useState([]);
  const [ForegroundImageList, setForegroundImageList] = useState([]);
  const [backgroundimage, setBackgroundImage] = useState();
  const [imagefor, setImageFor] = useState(location.state ? location.state.imageis : null);
  const [showImage, setShowImage] = useState(false);
  const [QID, setQID] = useState(location.state ? location.state.QID : null);
  const [qstring, setQString] = useState(false);

  const cancelFileupload = useRef(null);
  const hiddenFileInput = useRef(null);


  // File uploading function
  const AddQuestion = (values) => {
    console.log(id);
    const formData = new FormData();
    formData.append("Name", values.Name);
    formData.append("Video", values.Video);
    formData.append("scriptid", scriptid);
    return axios({
      method: "POST",
      url: `${config.DP_ROOT_URL}/AddQuestion.php`,
      data: formData,
      headers: authHeader(),
      cancelToken: new CancelToken((cancel) => {
        cancelFileupload.current = cancel;
      }),
      onUploadProgress: (progressEvent) => {
        setLoading(true);
        if (progressEvent.lengthComputable) {
          setProgress((progressEvent.loaded / progressEvent.total) * 100);
        }
        if (progressEvent.loaded === progressEvent.total) {
          setProgress(0);
          setLoading(false);
        }
      },
    }).then(handleResponse);
  };

  const RegisterSchema = Yup.object().shape({
    Name: Yup.string().max(100, "Too Long!"),
    Video: Yup.mixed().required("Video required"),
  });
  const formik = useFormik({
    initialValues: {
      Name: "",
      Video: "",
      ApplicationUserId:
        authenticationService.currentUserValue.ApplicationUserId,
    },
    validationSchema: RegisterSchema,
    onSubmit: (Values) => {
      setLoading(true);
      console.log(Values);
      AddQuestion(Values)
        .then((response) => {
          console.log(response);
          setLoading(false);
          setResponse(response.message);
          if (response.success) {
            setUploadbtn(true);
            setQID(response.result);
            setFileuploadresponse(true);
            setTimeout(() => {
              setFileuploadresponse(false);
            }, 3000);
          } else {
            setErrorresponse(true);
            setTimeout(() => {
              setErrorresponse(false);
            }, 3000);
          }
        })
        .catch((error) => {
          if (isCancel(error)) {
            alert(error.message);
          }
        });
    },
  });


  useEffect(() => {
    console.log(QID)
    if(QID !== null){
      PreSchoolerServices.GetQuestions(QID).then((result)=>{
        console.log(result)
       if(result.success){
           const question = result.Question[0];
           if(question.backgroundimages){
             const image = JSON.parse(question.backgroundimages);
             const imageUrl = root+image[0].file;
             setBackgroundImage(imageUrl);
           }
           if(question.forgroundimages){
            const list = JSON.parse(question.forgroundimages);
            setForegroundImageList(list);
           }
           if(question.qvideostorage){
            const list = question.qvideostorage;
            setVideoFile(root+list);
           }
           
           if(question.correctanswer){
            setCorrectAnswer(question.correctanswer);
            setShowImage(true);
           }
           if(question.backgroundimages && question.forgroundimages && question.qvideostorage && question.correctanswer){
            console.log('hello')
            setNextbtn(false);
           }
           if(question.qstring){
            setQString(question.qstring)
           }
       }
      })
     }
  },[correctanswer]);

  const handleClick = event => {
    console.log('hello world', hiddenFileInput);
    hiddenFileInput.current.click();
  };

  const updateAnswer = () =>{
    PreSchoolerServices.UpdateAnswer(QID,correctanswer).then(res=>{
      if(res.success){
        setResponse(res.message)
        setanswerUpdated(true);
        setTimeout(() => {
          setResponse('');
          setanswerUpdated(false);
        }, 3000);
      }
      else{
        setResponse(res.message)
        setAnswerError(true);
        setTimeout(() => {
          setResponse('');
          setAnswerError(false);
        }, 3000);
      }
    })
  }
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <Page>
      <Container>

   
      <Card pb={3}>
        <Container>
          <Stack spacing={2} m={2}>
            <h3>Selected game - Where is the _____ ?</h3>
            <Stack spacing={2}>
              {/* Video upload section */}
              <Box>
                <Stack spacing={2}>
                  <h4>Question</h4>
                  <FormikProvider value={formik}>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                      <Stack spacing={2}>
                        <Stack spacing={2}>
                          {
                            qstring &&
                            <Typography>
                              {qstring}
                            </Typography>
                          }
                          <div>
                            <p>Question:</p>
                            <TextField
                              multiline
                              rows={2}
                              fullWidth
                              placeholder="Question?"
                              onChange={(e) => {
                                setQuestionText(e.target.value);
                              }}
                              {...getFieldProps("Name")}
                            />
                          </div>
                          <Stack>
                            <div>
                              <InputLabel variant="standard">Video:</InputLabel>
                              <Field
                                accept="video/*"
                                type="file"
                                name="video"
                                id="video"
                                onChange={(event) => {
                                  const file = event.target.files[0];
                                  formik.setFieldValue("Video", file);
                                  setVideoFile(URL.createObjectURL(file));
                                }}
                                error={Boolean(touched.Video && errors.Video)}
                                helperText={touched.Video && errors.Video}
                              />
                            </div>
                          </Stack>
                          <div>
                            {videofile && (
                              <video
                                src={videofile}
                                autoPlay
                                width={300}
                                height={250}
                                controls
                              >
                                <track kind="captions" />
                                your browser is not supporting video.
                              </video>
                            )}
                          </div>
                        </Stack>
                        <LoadingButton
                          startIcon={<CloudUploadIcon />}
                          variant="contained"
                          type="submit"
                          loadingPosition="start"
                          loading={loading}
                          disabled={uploadbtn}
                          sx={{
                            width: "150px",
                          }}
                        >
                          Upload
                        </LoadingButton>

                        {progress > 0 && (
                          <Box sx={{ "& > button": { m: 1 } }}>
                            <LinearProgressWithLabel value={progress} />
                          </Box>
                        )}
                        {fileuploadresponse && (
                          <Alert variant="outlined" severity="success">
                            {response}
                          </Alert>
                        )}
                        {errorresponse && (
                          <Alert variant="outlined" severity="error">
                            {response}
                          </Alert>
                        )}
                      </Stack>
                    </Form>
                  </FormikProvider>
                </Stack>
              </Box>
            </Stack>
            <h4>Images</h4>
            <Grid container>
              <Grid item xs={3}>
                <Stack spacing={2} sx={{ borderRight: 1, borderColor: 'gray.500' }} pr={2}>
                  <p>Background Image</p>
                  {
                    backgroundimage &&
                    <img src={backgroundimage} alt="backgroundimage" width={280} height={190} />
                    ||
                    <img src="/static/Images/BackgroundEmpty.jpg" alt="backgroundimage" width={280} height={190} />
                  }
                  <Button variant="contained" fullWidth onClick={() => {
                    const imageis = 'bg'
                    navigate(`/Teacher/Preschooler/Images/`, { state: { id, imageis,QID,scriptid} })
                  }}>
                    Add Image
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={9}>
                <Stack spacing={2} pl={2}>
                  <p>Foreground Images</p>
                  {
                    ForegroundImageList && ForegroundImageList.length > 0 &&
                    <div className={classes.root}>
                      <ImageList className={classes.imageList} cols={3}>
                        {ForegroundImageList.map((result, index) => (
                          <ImageListItem key={index}>
                            <img src={root+result.file} alt={`newImage${index}`} height={190}/>
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </div>
                    ||
                    <img src="/static/Images/BackgroundEmpty.jpg" alt="fg" width={200} height={190} />
                  }
                  <Button variant="contained" sx={{ width: 200 }} onClick={() => {
                    const imageis = 'fg'
                    navigate(`/Teacher/Preschooler/Images/`, { state: { id, imageis,QID,scriptid} })
                  }}>
                    Add Image
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            <h4>Answer</h4>
            <Stack spacing={2}>
              <p>Select correct answer: </p>
              <Select
                value={correctanswer}
                defaultValue={correctanswer}
                onChange={(e) => {
                  setCorrectAnswer(e.target.value)
                  setShowImage(true);
                }}
                sx={{ maxWidth: 350 }}
              >
                {
                  ForegroundImageList && ForegroundImageList.map((result, index) => (
                    <MenuItem value={index + 1} key={index}>
                      Image {index + 1} <img src={root+result.file} alt={`newImage`} width={50} height={40} />
                    </MenuItem>
                  ))
                }
              </Select>
              {
                correctanswer &&
                <>
                  <img src={root+ForegroundImageList[correctanswer-1].file} alt={`newImage`} width={300} height={250} />
                </>
              }
              <Button sx={{width:150}} variant="contained" onClick={updateAnswer}>
                Update Answer
              </Button>
              {answerUpdated && (
                          <Alert variant="outlined" severity="success">
                            {response}
                          </Alert>
                        )}
                        {AnswerError && (
                          <Alert variant="outlined" severity="error">
                            {response}
                          </Alert>
                        )}
            </Stack>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                p: 1,
                m: 1,
                borderRadius: 1,
              }}
            >
              <Button  variant="contained" endIcon={<Iconify icon="carbon:next-outline" />} sx={{ width: 180 }} disabled={nextbtn} onClick={()=>{
                navigate(`/Teacher/Preschooler/${id}/${scriptid}/Questions`)
              }}>
                Next
              </Button>
            </Box>
          </Stack>
        </Container>
      </Card>
      </Container>
    </Page>
  )
}

export default AddQuestion