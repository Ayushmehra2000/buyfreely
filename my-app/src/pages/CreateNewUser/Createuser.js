import { createUserThunk} from "../../features/reducers/LoginOrLogoutReducer";
import { createRef } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
export function SignUp(){
    const Navigate = useNavigate();
    const email= createRef();
    const password =createRef();
    const dispatch = useDispatch();
    const createuser=()=>{
        if(email.current.value==="" || password.current.value===""){
            return;
        }
        const data={
            email:email.current.value,
            password:password.current.value
        }
        // creating user
        dispatch(createUserThunk(data));

        // redirect to signIn page
        Navigate("/login");
        cleardata();
    }
    const cleardata = ()=>{
        email.current.value="";
        password.current.value="";
    }
    return(<>
    <div className="container">
        <div className="loginbox">
            <h1>Create New Account</h1>
            <div className="email"><input type="email" placeholder="E-mail" ref={email} required/></div>
            <div className="password"><input type="password" placeholder="Password" ref={password} required/></div>
            <div className="login"><button onClick={createuser}>Create New Account</button></div>
            <p>Or Already Have Account? ,<NavLink to="/login" ><span >  Login</span></NavLink></p>
        </div>
    </div>
    </>)
}