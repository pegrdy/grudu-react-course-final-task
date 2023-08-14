import { Button, Card, CardContent, CardHeader, Container, List, ListItem, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import { Formik } from "formik";
import { getTweets, saveTweet } from "./tweet.service";
import { useEffect, useState } from "react";
import dompurify from 'dompurify';

const TweetSchema = Yup.object().shape({
    tweet: Yup.string()
        .min(1, 'Tweet needs to be at least 1 character')
        .max(140, 'Tweet needs to be max 140 characters')
        .required('Tweet is required'),
});

const Tweets = () => {
    const user = useSelector(state => state.user);
    const [tweets, setTweets] = useState([]);

    const initialValues = {
        tweet: ''
    };

    const submitForm = async (values, { resetForm }) => {
        const tweet = await saveTweet({
            userName: user.userName,
            fullName: user.fullName,
            id: Date.now(),
            ...values,
        });

        await fetchTweets();
        resetForm();
    };

    const fetchTweets = async () => {
        const newTweets = await getTweets();
        setTweets(newTweets);
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    const tweetMarkup = (tweet) => {
        return { __html: dompurify.sanitize(tweet, { FORCE_BODY: true }) };
    };

    const getInitials = (fullName) => {
        const lastNameIndex = fullName.search(' ');
        const lastName = lastNameIndex !== -1 ? fullName.charAt(lastNameIndex + 1) : '';
        
        return `${fullName.charAt(0)}${lastName}`;
    };

    return (
        <Container component="main" maxWidth="md">
            {user.userName ?
                <Formik
                    initialValues={initialValues}
                    validationSchema={TweetSchema}
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
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'end',
                            }}
                        >
                            <TextField
                                multiline
                                fullWidth
                                rows={4}
                                error={Boolean(touched.tweet && errors.tweet)}
                                margin="normal"
                                required
                                id="tweet"
                                name="tweet"
                                autoComplete="tweet"
                                label="Tweet"
                                helperText={
                                    Boolean(touched.tweet && errors.tweet) ? errors.tweet : null
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.tweet}
                            />
                            <Button
                                variant="contained"
                                sx={{ marginTop: 1 }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Box>
                    )}
                </Formik>
                : null}
            <List>
                {tweets.map((tweet) => (<ListItem key={tweet.id}>
                    <Card sx={{width: '100%'}}>
                        <CardHeader
                            avatar={
                                <Typography sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '50px',
                                    padding: '5px'
                                }}
                                    color="primary">
                                    {getInitials(tweet.fullName)}
                                </Typography>
                            }
                            title={tweet.fullName}
                            sx={{ backgroundColor: '#1976d2', color: 'white' }}
                        />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ wordBreak: 'break-all' }}
                                dangerouslySetInnerHTML={tweetMarkup(tweet.tweet)}
                            />
                        </CardContent>
                    </Card>
                </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Tweets;
