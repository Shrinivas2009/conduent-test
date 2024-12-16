import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    alert(`User ${values.username} registered successfully!`);
  };

  // Redirect to Login on button click
  const handleBackToLogin = () => {
    navigate('/login'); 
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
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
                name="email"
                as={TextField}
                label="Email"
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
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
                Register
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBackToLogin}
              >
                Back to Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
