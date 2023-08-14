const signUpUserService = async (user) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    const response = await fetch('http://localhost:3001/users', requestOptions);
    return await response.json();
};

export default signUpUserService;
