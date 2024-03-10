import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        // Add other user-related actions here
    },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
