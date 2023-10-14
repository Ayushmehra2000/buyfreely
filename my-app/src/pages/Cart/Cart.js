import "./Cart.css";
import { productSelector, purchaseAllThunk } from "../../features/reducers/ProductReducer";
import { useDispatch, useSelector } from "react-redux"
import { CartItem } from "./cartcard";
import { NavLink } from "react-router-dom";
export function Cart(){
    const {cart,total,itemInCart} = useSelector(productSelector);
    const dispatch = useDispatch();
    return(<>
    <div id="cart-aside">
            <div id="total">
                <h2>Total Price</h2>
                <strong><span>&#8377;{total}</span></strong>
                <h2>Total Item: {itemInCart} </h2>

            </div>
            <div id="purchase">
                <NavLink to="/myorder" ><button className="purchasebutton" type="submit" onClick={()=>dispatch(purchaseAllThunk())}>Purchase</button></NavLink>
            </div>
        </div>
    <div className="cart-container">
        {cart.length > 0?(<div id="data-display">
        <div id="card-item-container">
            {cart.map((d,i)=><CartItem d={d} key={i}/>)}
        </div>
        </div>):(<div id="data-display">
            <h1 style={{textAlign:"center"}}>No Item in cart</h1>
        </div>)}
    </div>
    </>)
}