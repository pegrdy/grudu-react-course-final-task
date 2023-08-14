import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, MenuItem, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { removeUser } from '../userSlice';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const user = useSelector(state => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getInitials = () => {
        const { fullName } = user;
        const lastNameIndex = fullName.search(' ');
        const lastName = lastNameIndex !== -1 ? fullName.charAt(lastNameIndex + 1) : '';

        return `${fullName.charAt(0)}${lastName}`;
    };

    const logOut = () => {
        dispatch(removeUser());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Another Twitter clone
                </Typography>
                <Stack direction="row" sx={{ alignItems: 'center' }}>
                    {user.userName ?
                        <>
                            <Typography variant="p" component="div" sx={{ paddingRight: 2 }}>
                                {user.fullName}
                            </Typography>
                            <IconButton sx={{ backgroundColor: 'white' }} onClick={handleMenu}>
                                {getInitials()}
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={logOut}>Logout</MenuItem>
                            </Menu>
                        </> : null}

                    {!user.userName ?
                        <NavLink to={`/login`}>
                            Log in
                        </NavLink>
                        : null}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
