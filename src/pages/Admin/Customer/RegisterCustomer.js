import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Stack, TextField, IconButton, InputAdornment} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';
// component
import Iconify from '../../../components/Iconify';
import { AdminServices } from '../../../services/Admin.services';

RegisterWorker.propTypes={
    data: PropTypes.array.isRequired
  }

function RegisterWorker(props) {

    const [errormsg, setErrorMsg] = useState(false);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
      username: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Name required!'),
      email: Yup.string().email('Email must be a valid email address').required('Email required!'),
      Phone: Yup.number(),
      password: Yup.string().required('Password is required'),
      });

      const formik = useFormik({
        initialValues: {
          appid:process.env.REACT_APP_ID,
          username: '',
          email: '',
          Phone: '',
          password:'',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        validationSchema: RegisterSchema,
        onSubmit: (Values) => {
          setLoading(true);
          AdminServices.AddWorker(Values).then((response)=>{
            setErrorMsg(true);
            setResponse(response.message);
            setLoading(false);
            props.data[0](!props.data[1]);
            setTimeout(()=>{
              setErrorMsg(false);
              //  
            },3000);
          })
         
        },
      });
    
      const { errors, touched, handleSubmit, getFieldProps } = formik;
    
      return (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={2} m={3}>
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Contact Mail"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete=""
            type="number"
            label="Phone"
            {...getFieldProps('Phone')}
            error={Boolean(touched.Phone && errors.Phone)}
            helperText={touched.Phone && errors.Phone}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="small" sx={{ justifyContent: "center",width: "150px",height: "50px",}} type="submit" variant="contained" loading={loading}>
            Register
          </LoadingButton>
          {errormsg && 
          <Alert variant="outlined" severity="success">{response}</Alert>
        }
        </Stack>
          </Form>
        </FormikProvider>
  )
}

export default RegisterWorker