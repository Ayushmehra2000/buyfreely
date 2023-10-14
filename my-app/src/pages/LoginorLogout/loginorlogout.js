import "./loginorlogout.css";
import {createSessionThunk } from "../../features/reducers/LoginOrLogoutReducer";
import { createRef } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import { useDispatch} from "react-redux";
export function Login(){
    const Navigate = useNavigate();
    const email= createRef();
    const password =createRef();
    const dispatch = useDispatch();
    const loginorlogout=()=>{
        const data={
            email:email.current.value,
            password:password.current.value
        }
        // sign in user
        const status=dispatch(createSessionThunk(data));
        // if user signed in redirect to corresponding page
        {status?Navigate("/"):Navigate("/login")};
        cleardata();
    }
    const cleardata = ()=>{
        email.current.value="";
        password.current.value="";
    }
    return(<>
    <div className="container">
        <div className="loginbox">
            <h1>Login</h1>
            <div className="email"><input type="email" placeholder="E-mail" ref={email} required/></div>
            <div className="password"><input type="password" placeholder="Password" ref={password} required/></div>
            <div className="login"><button onClick={loginorlogout}>Login</button></div>
            <p>Or ,<NavLink to="/signup" ><span >  Create New Account</span></NavLink></p>
        </div>
    </div>
    </>)
}