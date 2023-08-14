import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Stack } from '@mui/material';
import { NavLink, useRouteLoaderData } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import loginUserService from './login.service';
import { useState } from 'react';
import { setUser } from '../userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    userName: Yup.string()
        .required('User name is required'),
    password: Yup.string()
        .min(8, 'Password needs to be at least 8 characters')
        .max(256, 'Password needs to be max 256 characters')
        .required('Password is required'),
});

const Login = () => {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        userName: '',
        password: ''
    };

    const submitForm = async (values) => {
        const user = await loginUserService(values.userName);

        if (user.length === 0) {
            setError('Username or password is wrong, please try again.');
            return;
        }

        setError('');
        dispatch(setUser(user[0]));
        navigate('/');
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
                    Log in
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
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                error={Boolean(touched.userName && errors.userName)}
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="User name"
                                name="userName"
                                autoComplete="userName"
                                helperText={errors.userName}
                                autoFocus
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.userName}
                            />
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Log In
                            </Button>
                            <Stack direction="row" sx={{ alignItems: 'center' }}>
                                <Typography variant="p" component="p" sx={{ paddingRight: 1 }}>
                                    Dont have an account?
                                </Typography>
                                <NavLink to={`/signup`}>
                                    Sign up
                                </NavLink>
                            </Stack>
                        </Box>
                    )}
                </Formik>
            </Box>
            {error ?
                <Alert severity="error">{error}</Alert>
                : null
            }
        </Container>
    );
};

export default Login;
