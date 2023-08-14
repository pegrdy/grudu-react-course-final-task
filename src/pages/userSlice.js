import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fullName: JSON.parse(localStorage.getItem('user'))?.fullName || null,
    userName: JSON.parse(localStorage.getItem('user'))?.userName || null,
    email: JSON.parse(localStorage.getItem('user'))?.email || null,
    password: JSON.parse(localStorage.getItem('user'))?.password || null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      state.fullName = payload.fullName;
      state.userName = payload.userName;
      state.password = payload.password;
      state.email = payload.email;
      localStorage.setItem('user', JSON.stringify(payload));
    },
    removeUser: (state) => {
      state.fullName = null;
      state.userName = null;
      state.password = null;
      state.email = null;
      localStorage.removeItem('user');
    },
  },
})

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
