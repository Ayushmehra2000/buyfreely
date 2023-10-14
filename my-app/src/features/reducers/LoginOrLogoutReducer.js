import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

//import for firebase
import {db} from "./../../firebaseinit/firebaseinit";
import { collection, onSnapshot,addDoc } from "firebase/firestore";

// import for toastify
import { toast } from "react-toastify";


const INITIAL_STATE={ userList: [], isLoggedIn: false, userLoggedIn: null };

export const getInitialUserList = createAsyncThunk("auth/userList",(args,thunkAPI) => {
        // getting data from firebase
        const unsub = onSnapshot(collection(db, "userData"), (Snapshot) => {
            const users = Snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            // storing the userlist inside initialState variable
            thunkAPI.dispatch(setUserList(users));
        })}
);
// AsyncThunk for creating new user in database
export const createUserThunk = createAsyncThunk(
    "auth/createUser",
    async (data,thunkAPI) => {

        // getting userList from initialState
        const {loginorlogoutReducer} = thunkAPI.getState();
        const {userList} = loginorlogoutReducer;

        // checking whether user's email already exist or not
        const index =userList.findIndex((user) => user.email === data.email);
        
        // if email address already exits inside database
        if(index !== -1){
            toast.error('Email address already in use !!');
            return;
        }

        // if email not found create new user 
        const docRef =await addDoc(collection(db, "userData"), {
            email:data.email,
            password:data.password,
            cart:[],
            orders:[]
        });
        // notification 
        toast.success("New user Created, Please LogIn to Continue !!");
    }
)


// AsyncThunk for signIn user
export const createSessionThunk = createAsyncThunk(
    "auth/createSession",
    async (data,thunkAPI) => {

        // getting userList from initialState
        const {loginorlogoutReducer} = thunkAPI.getState();
        const {userList} = loginorlogoutReducer;
        // finding user inside the userList
        const index = userList.findIndex((user) => user.email === data.email);

        // if user not found show notification
        if(index === -1){
            toast.error("Email does not exist, Try again or SignUp Instead!!!");
            console.log("Email does not exist, Try again or SignUp Instead!!!");
            return false;
        }
        
        // if email found in database then match password
        if(userList[index].password === data.password){
            console.log("Sign In Successfully!!!");
            toast.success("Sign In Successfully!!!");
            
            // logging in user and storing its data in local variable
            thunkAPI.dispatch(setLoggedIn(true));
            thunkAPI.dispatch(setUserLoggedIn(userList[index]));
            
            // generating user's login token and store user's data 
            window.localStorage.setItem("token",true);
            window.localStorage.setItem("index",JSON.stringify(userList[index]));
            return true;
        }
        else{
            // if password doesn't match in database
            toast.error("Wrong UserName/Password, Try Again");
            return false;
        }
    }
);


// AsyncThunk for SignOut
export const removeSessionThunk = createAsyncThunk(
    "auth/removeSession",
    () => {

        // removing user' data and token from local storage
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");
    }
)

const loginorlogoutSlice = createSlice({
  name: "loginorlogout",
  initialState: INITIAL_STATE,
  reducers: {
    setUserList: (state,action) => {
        state.userList=action.payload;
    },
    // whether user isLoggedIn or not
    setLoggedIn: (state,action) => {
        state.isLoggedIn = action.payload;
    },
    // data of loggedIn user
    setUserLoggedIn: (state,action) => {
        state.userLoggedIn = action.payload;
    }
},
extraReducers: (builder) => {
    builder.addCase(removeSessionThunk.fulfilled, (state,action) => {
        // removing user's token and data from initialState
        state.isLoggedIn=false;
        state.userLoggedIn=null;
        toast.success("Sign Out successfully!!!!");
    })
}
});

export const loginorlogoutReducer = loginorlogoutSlice.reducer;
export const {
    login,setLoggedIn,setUserLoggedIn,setUserList,
    logout,setCurrentlogincustomer,setError,setUser,adduseraftercreatingit
} = loginorlogoutSlice.actions;

// define and export loginorlogoutSelector function here
export const loginorlogoutSelector = (state)=> state.loginorlogoutReducer;
