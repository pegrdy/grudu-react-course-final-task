const loginUserService = async (userName) => {
    const requestOptions = {
        method: 'GET',
    };
    const response = await fetch(`http://localhost:3001/users/${userName}`, requestOptions);
    return await response.json();
}

export default loginUserService;
