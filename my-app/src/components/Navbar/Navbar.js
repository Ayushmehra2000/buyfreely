import { FiHome , FiShoppingCart, FiLogIn } from "react-icons/fi";
import { BsFillBasket3Fill } from "react-icons/bs";
import { Outlet ,NavLink } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { loginorlogoutSelector,userlogout,removeSessionThunk } from "../../features/reducers/LoginOrLogoutReducer";
import "./Navbar.css"
export function Navbar(){
    const {isLoggedIn} = useSelector(loginorlogoutSelector);
    const dispatch = useDispatch();
    const Logout =()=>{
      dispatch(removeSessionThunk());
      // dispatch(userlogout());
    }
    return(<>
        <div id="Header">
            <div id="logo"><span>BuyFreely</span></div>
            <div id="Menu">
                <NavLink style={({ isActive }) =>
                  isActive
                    ? {
                        color: "black",
                      }
                    : null
                } to="/">
                    <div className="home-menu menu-items"><FiHome /><span> Home</span></div>
                </NavLink>
                {isLoggedIn?<><NavLink style={({ isActive }) =>
                  isActive
                    ? {
                        color: "black",
                      }
                    : null
                } to="/myorder"><div className="Order-menu menu-items"><BsFillBasket3Fill /><span> My Orders</span></div></NavLink>
                <NavLink style={({ isActive }) =>
                  isActive
                    ? {
                        color: "black",
                      }
                    : null
                } to="/cart"><div className="Cart-menu menu-items"><FiShoppingCart /><span> Cart</span></div></NavLink></>:null}
    
                {isLoggedIn? <NavLink style={({ isActive }) =>
                  isActive
                    ? {
                        color: "black",
                      }
                    : null
                } to="/login"><div className="Cart-menu menu-items" onClick={Logout} ><FiLogIn /><span >Logout</span></div></NavLink>:
                <NavLink style={({ isActive }) =>
                  isActive
                    ? {
                        color: "black",
                      }
                    : null
                } to="/login"><div className="Cart-menu menu-items"><FiLogIn /><span>Login</span></div></NavLink>}
                
            </div>
        </div>
        <Outlet />
        </>);
}