import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios, { CancelToken, isCancel } from "axios";
import Dropzone, { useDropzone } from "react-dropzone";
import { useFormik, Form, FormikProvider, Field } from "formik";

import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { LoadingButton } from "@mui/lab";
import {
  LinearProgress,
  Box,
  Typography,
  Button,
  Stack,
  Container,
  InputLabel,
  TextField,
  Card,
  FormControl,
  MenuItem,
  Select
} from "@mui/material";
import * as Yup from "yup";

import { authHeader } from "../../../helpers/authHeader";
import Iconify from "../../../components/Iconify";
import Page from "../../../components/Page";
import { config } from "../../../config";
import { authenticationService } from "../../../services/authservices";
import { handleResponse } from "../../../helpers/handle_response";

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

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

function AddUnitScript() {
  const [response, setResponse] = useState();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState();
  const [videofile, setVideoFile] = useState();
  const [GameType, setGameType] = useState();
  const [fileuploadresponse, setFileuploadresponse] = useState(false);
  const [errorresponse, setErrorresponse] = useState(false);
  const cancelFileupload = useRef(null);
  const navigate = useNavigate();
  const [nextbtn, setNextbtn] = useState(true);
  const [uploadbtn, setUploadbtn] = useState(false);
  const { id } = useParams();
  const [ScriptId, setScriptId] = useState(null);
  const [CAS, setCAS] = useState(null);
  const [WAS, setWAS] = useState(null);


  // File uploading function
  const AddUnitScript = (values) => {
    console.log(id);
    const formData = new FormData();
    formData.append("Name", values.Name);
    formData.append("Video", values.Video);
    formData.append("RightSound", values.RightSound);
    formData.append("WrongSound", values.WrongSound);
    formData.append("GameType", values.GameType);
    formData.append("UnitId", id);
    return axios({
      method: "POST",
      url: `${config.DP_ROOT_URL}/AddPreSchoolerUnitScript.php`,
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
    GameType: Yup.number().required("please select game type")
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      Video: "",
      ApplicationUserId:
        authenticationService.currentUserValue.ApplicationUserId,
      RightSound:null,
      WrongSound:null,
      GameType:""
    },
    validationSchema: RegisterSchema,
    onSubmit: (Values) => {
      setLoading(true);
      console.log(Values);
      AddUnitScript(Values)
        .then((response) => {
          console.log(response);
         
          setLoading(false);
          setResponse(response.message);
          if (response.success) {
            setUploadbtn(true);
            setScriptId(response.result);
            setFileuploadresponse(true);
            setTimeout(() => {
              setNextbtn(false);
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

  // useEffect(() => {
  //   if (GameType) {
  //     setNextbtn(false);
  //   }
  //   else {
  //     setNextbtn(true);
  //   }
  // }, [GameType]);

  const handleBack = () => {
    console.log(id);
    navigate(`PreSchooler/${id}`);
  };

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <Page title="Script">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h5" gutterBottom>
            Add script
          </Typography>
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<Iconify icon="bx:arrow-back" />}
          >
            Back
          </Button>
        </Stack>
        <Card>
          <Container>
            <Stack spacing={10} m={2} mb={4}>
              {/* Video upload section */}
              <Box>
                <Stack spacing={4}>
                  <Typography variant="h5" gutterBottom>
                    Add
                  </Typography>
                  <h5>Video Upload Section</h5>
                  <FormikProvider value={formik}>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                      <Stack spacing={2}>
                        <Stack spacing={2}>
                          <div>
                            <InputLabel variant="standard">Name</InputLabel>
                            <TextField
                              sx={{ width: 250 }}
                              size="small"
                              {...getFieldProps("Name")}
                            />
                          </div>
                          <InputLabel variant="standard">Video</InputLabel>
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
                          <div>
                            {videofile && (
                              <video
                                src={videofile}
                                autoPlay
                                width={200}
                                height={100}
                                controls
                              >
                                <track kind="captions" />
                                your browser is not supporting video.
                              </video>
                            )}
                          </div>
                          <InputLabel variant="standard">Right sound</InputLabel>
                          <Field
                            accept="audio/*"
                            type="file"
                            name="audio"
                            id="audio"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              
                              formik.setFieldValue("RightSound", file);
                              setCAS(URL.createObjectURL(file));
                            }}
                          />
                          {
                            CAS &&
                            <audio controls src={CAS} />
                          }
                            
                        
                          <InputLabel variant="standard">Wrong sound</InputLabel>
                          <Field
                            accept="audio/*"
                            type="file"
                            name="sound"
                            id="wrongsound"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              formik.setFieldValue("WrongSound", file);
                              setWAS(URL.createObjectURL(file));
                            }}
                          />

                          {
                            WAS &&
                            <audio controls src={WAS} />
                          }
                        </Stack>

                        <Box>
                <Stack spacing={2} mt={2}>
                  <h5>Select the type of Game</h5>
                  <FormControl variant="standard" sx={{  maxWidth: 350 }}>
                    <InputLabel sx={{ fontSize: 16 }}>Game type</InputLabel>
                    <Select
                      value={GameType}
                      onChange={(e) => {
                        setGameType(e.target.value)
                      }}
                      {...getFieldProps('GameType2')}
                      autoWidth
                      error={Boolean(touched.GameType && errors.GameType)}
                      helperText={touched.GameType && errors.GameType}
                    >
                      <MenuItem value={1}>GameType1</MenuItem>
                      <MenuItem value={2}>GameType2</MenuItem>
                      <MenuItem value={3}>GameType3</MenuItem>
                      <MenuItem value={3}>GameType3</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Box>


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
              {/* Select Game Type */}
            
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  p: 1,
                  m: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <Button onClick={() => {
                  navigate(`/Teacher/Preschooler/${id}/${ScriptId}/Questions`);
                }} variant="contained" endIcon={<Iconify icon="carbon:next-outline" />} sx={{ width: 180 }} disabled={nextbtn}>
                  Next
                </Button>
              </Box>

            </Stack>
          </Container>
        </Card>
      </Container>
    </Page>
  );
}
export default AddUnitScript;
