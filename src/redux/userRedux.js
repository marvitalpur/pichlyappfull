import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null,
    isFetching: false,
    error: false,
    isLoading: false,
    deviceToken:'',
  },
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    loginStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.loggedInUser = action.payload;
    },
    loginFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
    updateUser: (state, action) => {
      const user = action.payload;
      // console.log(user);

      state.isFetching = false;
      state.error = true;
      state.loggedInUser = user;
    },
    logOut: state => {
      state.loggedInUser = null;
      state.loggedInUserFavProducts = [];
      state.isFetching = false;
      state.error = false;
      state.deviceToken='';
    },
    saveDeviceToken:(state,action)=>{
      state.deviceToken=action.payload;
    }
  },
});
export const {
  isLoading,
  loginStart,
  loginFailure,
  loginSuccess,
  updateUser,
  logOut,
  saveDeviceToken
} = userSlice.actions;
export default userSlice.reducer;
