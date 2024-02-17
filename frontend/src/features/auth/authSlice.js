import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
// use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from "../../utils.js";

// Get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));

// * remove isSuccess from state as we can infer from presence or absence of user
// * There is no need for a reset function as we can do this in our pending cases
// * No need for isError or message as we can catch the AsyncThunkAction rejection in our component and we will have the error message there
const initialState = {
    user: user ? user : null,
    isLoading: false,
};

// Register new user
export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    console.log(user);
});

//  LogOut User - Here we don't need a thunk as we are not doing anything async so, use createAction instead
export const logout = createAction("auth/logout", async () => {
    authService.logout();
    // return an empty object as our payload as we don't need a payload but the prepare function requires a payload return
    return {};
});

// In cases of login or register pending and rejected then user will already be null so no need to set to null in these cases
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export default authSlice.reducer;
