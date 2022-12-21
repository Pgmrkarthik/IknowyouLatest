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
  InputLabel,
  ImageList,
  ImageListItem
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import * as Yup from "yup";
import axios, { CancelToken, isCancel } from "axios";
import Alert from "@mui/material/Alert";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { LoadingButton } from "@mui/lab";
import { useFormik, Form, FormikProvider, Field } from "formik";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

import { authHeader } from "../../../helpers/authHeader";
import Iconify from "../../../components/Iconify";
import Page from "../../../components/Page";
import { config, root } from "../../../config";
import { authenticationService } from "../../../services/authservices";
import { handleResponse } from "../../../helpers/handle_response";
import { BlogPostsSearch } from '../../../sections/@dashboard/blog';
import { PreSchoolerServices } from '../../../services/PreSchoolerUnitServices';



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

function ImageGallery(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState([]);
  const [savedImageArray, setSavedImageArray] = useState([]);
  const [image, setImages] = useState([])
  const hiddenFileInput = useRef(null);
  const cancelFileupload = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileuploadresponse, setFileuploadresponse] = useState(false);
  const [errorresponse, setErrorresponse] = useState(false);
  const [response, setResponse] = useState();
  const { id, imageis, QID, scriptid } = location.state;


  const UplaodSelectedImage = () => {
    console.log(image, imageis);
    const formData = new FormData();
    formData.append("imagefor", imageis);
    image.forEach((file) => {
      console.log(file)
      formData.append("file[]", file);
    });
    formData.append('QID', QID);
    console.log(formData);
    // image.forEach(image=>{
    //   formData.append("file", image);
    // });

    //  if(formData){
    //   console.log("hello")
    //  }
    return axios({
      method: "POST",
      url: `${config.DP_ROOT_URL}/AddQuestionImages.php`,
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
  }


  const upload = () => {
    UplaodSelectedImage().then((response) => {
      console.log(response);
      setLoading(false);
      setResponse(response.message);
      if (response.success) {
        setFileuploadresponse(true);
        setTimeout(() => {
          setFileuploadresponse(false);
          navigate(`/Teacher/Preschooler/${id}/${scriptid}/AddQuestion`, { state: { selectedImage, imageis, QID } })
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
  }
  
  const handleClick = () => {
    console.log('hello world', hiddenFileInput);
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    if(imageis === 'bg'){
      selectedImage.pop();
      image.pop();
    }
    console.log(e.target.files)
    setSelectedImage([...selectedImage, {
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    }]);
    image.push(e.target.files[0])
    // setImages(selectedImage.map((values)=>values.raw))
    // setImages([...images,e.target.files])
  }


  useEffect(() => {
    return showGallery();
  }, [])

  if (savedImageArray.length !== 0) {
    console.log(savedImageArray);
  }


  const showGallery = () => {
    PreSchoolerServices.GetImageGallery().then(response => {
      if (response.success === 1)
        setSavedImageArray(response.result)
    });
  }

  const handleImage = (e) =>{
    if(imageis === 'bg'){
      selectedImage.pop();
      image.pop();
    }
    setSelectedImage([...selectedImage, {
      preview:e.target.currentSrc,
      raw: e.target
    }]);
    image.push(e.target);
  }

  const selectedImageRemove = (key)=>{
    console.log(key);
  }

  return (
  <Container>
       <Card >
        <Box sx={{padding:5}}>
            <Stack spacing={3}>
              <Stack spacing={3} direction={"row"}>
                  <Button onClick={showGallery}>
                    Gallery
                  </Button>
                  <Button onClick={handleClick} variant="contained"  startIcon={<Iconify icon={"material-symbols:folder"} />} >
                    From Device
                  </Button>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  /> 
              </Stack>

              {/* Selected Images Section */}
              <Grid container spacing={2} direction={"row"} style={{ maxHeight: '100%'}}>
                {selectedImage.length > 0 &&
                  selectedImage.map((value, key) => (
                    <Stack key={key} m={1}>
                      <IconButton
                        aria-label="delete"
                        style={{ position: "absolute"}}
                        color={"error"}
                        size="Medium"
                        onClick={()=>{
                          selectedImageRemove(key);
                          selectedImage.splice(key,1);
                          setSelectedImage([...selectedImage])
                          console.log(selectedImage);
                        }
                        }
                      >
                        <Iconify icon="mdi:close-circle" />
                      </IconButton>
                      <img key={key} src={value.preview} alt="selected" width={150} height={120} />
                    </Stack>
                  ))
                  ||
                  <img src="/static/Images/BackgroundEmpty.jpg" alt="fg" width={150} height={120} />
                }
              </Grid>
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
              {
                selectedImage.length > 0 &&
                <Stack container sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  p: 1,
                  m: 1,
                  borderRadius: 1,

                }}>
                  {/* <Button onClick={() => {
                    navigate(`/Teacher/Preschooler/${id}/${scriptid}/AddQuestion`, { state: { selectedImage, imageis, QID } })
                  }} variant="contained" endIcon={<Iconify icon="carbon:next-outline" />} sx={{ width: 180 }} >
                    Go Back
                  </Button> */}
                  <LoadingButton
                    startIcon={<CloudUploadIcon />}
                    variant="contained"
                    type="submit"
                    loadingPosition="start"
                    loading={loading}
                    onClick={upload}
                    sx={{ width: 180, paddingRight: 2 }}
                  >
                    Upload
                  </LoadingButton>
                </Stack>
              }

              <Stack>
                <BlogPostsSearch posts={[]} />
              </Stack>
              <Stack>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 14, md:20 }}>
                  {savedImageArray.map((item) => (
                    <Grid item xs={2} sm={4} md={4} key={item.id} height={200}>
                      <Box onClick={handleImage} >
                          <img
                            src={`${root}${item.location}`}
                            srcSet={`${root}${item.location}`}
                            alt={item.name}
                            loading="lazy"
                            height={"100%"}
                            width={"100%"}
                            
                          />
                        </Box>
                          
                    </Grid>
                  ))}
                </Grid>
              </Stack>

              {/* <Stack>
          Search and Filter
        </Stack>
        <Stack>
          image Gallery
        </Stack>
        <Stack>
          Next Page
        </Stack> */}
            </Stack>
            </Box>
        </Card>
        </Container>
  );

}

export default ImageGallery