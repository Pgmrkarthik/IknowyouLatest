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


RegisterTeacher.propTypes={
  data: PropTypes.array.isRequired
}

function RegisterTeacher(props) {
  const [errormsg, setErrorMsg] = useState(false);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    FirstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    LastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    Email: Yup.string().email('Email must be a valid email address').required('Email required!'),
    PhoneNumber: Yup.number().required('Phone number is required'),
    Password: Yup.string().required('Password is required'),
  });

   const formik = useFormik({
    initialValues: {
      FirstName: '',
      LastName:'',
      Email: '',
      PhoneNumber: '',
      Password:'',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    validationSchema: RegisterSchema,
    onSubmit: (Values) => {
      setLoading(true);
      AdminServices.AddTeacher(Values).then((response)=>{
        console.log(response);
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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('FirstName')}
              error={Boolean(touched.FirstName && errors.FirstName)}
              helperText={touched.FirstName && errors.FirstName}
            />
            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('LastName')}
              error={Boolean(touched.LastName && errors.LastName)}
              helperText={touched.LastName && errors.LastName}
            />
          </Stack>
          <TextField
            fullWidth
            type="email"
            label="Mail"
            {...getFieldProps('Email')}
            error={Boolean(touched.Email && errors.Email)}
            helperText={touched.Email && errors.Email}
          />

          <TextField
            fullWidth
            type="number"
            label="Phone"
            {...getFieldProps('PhoneNumber')}
            error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
            helperText={touched.PhoneNumber && errors.PhoneNumber}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('Password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.Password && errors.Password)}
            helperText={touched.Password && errors.Password}
          />

          <LoadingButton fullWidth size="small" sx={{ justifyContent: "center",width: "150px",height: "50px",}} type="submit" variant="contained" loading={loading}>
            ADD
          </LoadingButton>
          {errormsg && 
          <Alert variant="outlined" severity="success">{response}</Alert>
        }
        </Stack>
      </Form>
    </FormikProvider>
  )
}

export default RegisterTeacher