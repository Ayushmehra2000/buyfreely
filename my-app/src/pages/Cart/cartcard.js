import { GrSubtractCircle, GrAddCircle } from "react-icons/gr";
import { decreaseQuantThunk,increaseQuantThunk,removeFromCartThunk } from "../../features/reducers/ProductReducer";
import "./cartcard.css";
import { useDispatch } from "react-redux";
export function CartItem({d}){
    const dispatch = useDispatch();
    return(
        <>
        <div id="card-item-containers">
            <div id="item-images">
                <img src={d.productImage} alt={d.ProductName}  />
            </div>
            <div id="item-details">
                <div className="details-items">{d.ProductName}</div>
                <div className="item-prices"><div>&#8377; {d.ProductPrice}</div><div className="quantity"><span>Quantity</span> <span className="add-sub" onClick={() => dispatch(decreaseQuantThunk(d))}><GrSubtractCircle/></span> {d.quantity} <span className="add-sub" onClick={() => dispatch(increaseQuantThunk(d))}><GrAddCircle /></span></div></div> 
                <button onClick={() => dispatch(removeFromCartThunk(d))}>Remove From Cart</button>
            </div>
        </div>
        </>
    )
}