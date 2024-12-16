import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import Register from './Register';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values) => {
    dispatch(login(values.username));
    navigate('/home');
  };
  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Field
                name="username"
                as={TextField}
                label="Username"
                variant="outlined"
                error={touched.username && Boolean(errors.username)}
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                name="password"
                type="password"
                as={TextField}
                label="Password"
                variant="outlined"
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
               <Button
                variant="contained"
                color="secondary"
                onClick={handleRegisterRedirect}
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
