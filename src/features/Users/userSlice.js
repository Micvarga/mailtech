import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../app/backendUrl";

export const registerUser = createAsyncThunk(
    "user/register",
    async (
        { username, firstName, lastName, password },
        { rejectWithValue }
    ) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios.post(
                `${backendUrl}/users/signup`,
                { username, firstName, lastName, password },
                config
            );
        } catch (error) {
            if (error.response && error.response.date.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const initialState = {
    loading: false,
    userInfo: {},
    userToken: null,
    errorMsg: null,
    success: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.loading = true;
            state.errorMsg = null;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.errorMsg = payload;
        },
    },
});

export default userSlice.reducer;
