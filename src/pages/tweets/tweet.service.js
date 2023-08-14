const saveTweet = async (tweet) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tweet)
    };
    const response = await fetch(`http://localhost:3001/tweets`, requestOptions);
    return await response.json();
};

const getTweets = async () => {
    const requestOptions = {
        method: 'GET',
    };
    const response = await fetch(`http://localhost:3001/tweets`, requestOptions);
    return await response.json();
}

export {
    saveTweet,
    getTweets
};
