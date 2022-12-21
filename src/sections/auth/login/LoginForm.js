import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Alert from "@mui/material/Alert";
// component
import Iconify from "../../../components/Iconify";
import { authenticationService } from "../../../services/authservices";
import { Role } from "../../../helpers/Role";
import { styles } from "../../../Page/CommonPages/Login/styles";

// ----------------------------------------------------------------------

const useStyles = makeStyles(styles);

export default function LoginForm() {
  const classes = useStyles();

  const navigate = useNavigate();
  const [errormsg, setErrorMessage] = useState(false);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setLoading(true);
      authenticationService.login(values).then(
        (data) => {
          if (data.user) {
            if (data.user.ApplicationUserRole === Role.ADMIN) {
              navigate("/Admin/");
            } else if (data.user.ApplicationUserRole === Role.TEACHER) {
              navigate("/home/");
            } else {
              setLoading(false);
            }
          } else {
            setErrorMessage(true);
            setResponse(data.message);
            setTimeout(() => {
              setErrorMessage(false);
            }, 3000);
            setLoading(false);
          }
        },
        (error) => {
          setErrorMessage(true);
          setResponse(error);
          setTimeout(() => {
            setErrorMessage(false);
          }, 3000);
          setLoading(false);
        }
      );
    },
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    getFieldProps,
    handleChange,
    handleBlur,
  } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div style={{ width: "100%" }}>
          <Stack spacing={3}>
            <p className='Instraction'>Enter your credentials to login</p>
            <div className="inputBox">
              <input
                placeholder="Username"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                {...getFieldProps("email")}
              />

                <Iconify
                 className="icon"
                  icon={"icon-park-solid:people"}
                />
      
              <p className="error">
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            
            <div className="inputBox">
              <input
                placeholder="Password"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                {...getFieldProps("password")}
              />
              {/* <IconButton
               
               
                edge="end"
              > */}
                <Iconify
                  className="icon"
                  onClick={handleShowPassword}
                  icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                />
              {/* </IconButton> */}
              <p className="error">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              <Stack spacing={2}>
                {/* <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          /> */}
                <button type="submit" className="LoginButton">
                  Login
                </button>
                {/* <Link
                component={RouterLink}
                sx={{ color: "#000000", fontSize:'12px' }}
                to="/auth/reset-password/"
                underline="hover"
                >
            Reset password?
          </Link> */}
              </Stack>
            </Box>
          </Stack>

          <br />
          <br />
          
          <br />
          {errormsg && (
            <Alert variant="outlined" severity="error">
              {response}
            </Alert>
          )}
        </div>
      </Form>
    </FormikProvider>
  );
}
