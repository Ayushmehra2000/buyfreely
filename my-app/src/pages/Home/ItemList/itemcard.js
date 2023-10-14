import { useDispatch } from "react-redux";
import { addToCartThunk  } from "../../../features/reducers/ProductReducer";
import "./itemcard.css";
export function ItemCard({ detail }) {
    const { ProductName, ProductPrice, productImage } = detail;
    const dispatch = useDispatch();
    const additems=(data)=>{
        dispatch(addToCartThunk(data));
    }
    return (
        <div id="Card-container">
            <div id="item-image">
                <img src={productImage} alt={ProductName} />
            </div>
            <div id="item-detail">
                <div className="details-item">{ProductName}</div>
                <div className="item-price">&#8377;{ProductPrice}</div>
                <button onClick={()=>additems(detail)}>Add to cart</button>
            </div>
        </div>
    )
}