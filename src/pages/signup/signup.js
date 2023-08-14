import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import signUpUserService from './signup.service';


const EMAIL_REGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .matches(EMAIL_REGX, "Invalid email")
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password needs to be at least 8 characters')
        .max(256, 'Password needs to be max 256 characters')
        .required('Password is required'),
    fullName: Yup.string()
        .min(1, 'Full name needs to be at least 1 characters')
        .max(512, 'Full name needs to be max 512 characters')
        .required('Full name is required'),
    userName: Yup.string()
        .required('User name is required'),
});

const Signup = () => {
    const navigate = useNavigate();

    const submitForm = async (values) => {
        await signUpUserService(values);
        navigate('/login');
    };

    const initialValues = {
        email: '',
        password: '',
        userName: '',
        fullName: ''
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={submitForm}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        margin="normal"
                                        autoComplete="given-name"
                                        name="fullName"
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="Full Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fullName}
                                        helperText={
                                            Boolean(touched.fullName && errors.fullName) ? errors.fullName : null
                                        }
                                        error={Boolean(touched.fullName && errors.fullName)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        helperText={
                                            Boolean(touched.password && errors.password) ? errors.password : null
                                        }
                                        error={Boolean(touched.password && errors.password)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        helperText={
                                            Boolean(touched.email && errors.email) ? errors.email : null
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="user name"
                                        name="userName"
                                        required
                                        fullWidth
                                        id="username"
                                        margin="normal"
                                        label="User Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.userName}
                                        helperText={
                                            Boolean(touched.userName && errors.userName) ? errors.userName : null
                                        }
                                        error={Boolean(touched.userName && errors.userName)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Stack direction="row" sx={{ alignItems: 'center' }}>
                                <Typography variant="p" component="p" sx={{ paddingRight: 1 }}>
                                    Already have an account?
                                </Typography>
                                <NavLink to={`/login`}>
                                    Log in
                                </NavLink>
                            </Stack>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default Signup;
