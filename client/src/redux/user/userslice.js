import { createSlice } from "@reduxjs/toolkit";
import { trusted } from "mongoose";
const initialState = {
    currUser: null,
    error: null,
    loading: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currUser = null;
            state.error = null;
            state.loading = false;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currUser = null;
            state.error = null;
            state.loading = false;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {
    signInFailure,
    signInStart,
    signInSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserFailure, 
    signOutUserStart, 
    signOutUserSuccess
} = userSlice.actions;

export default userSlice.reducer

