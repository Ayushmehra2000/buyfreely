import "./myorder.css";
import { Bill } from "./bills";
import { useSelector, useDispatch } from "react-redux";
import { productSelector } from "../../features/reducers/ProductReducer";

export function Orders(){
    const {myorders} = useSelector(productSelector);
    const dispatch = useDispatch();
    console.log(myorders);
    return(<>
    <div className="container"><h1 style={{textAlign:"center"}}>Orders</h1></div>
    {myorders.length>0? (
    <div className="cart-container">
        {myorders.map((orders,i)=><Bill data={orders} key={i}/>)}
    </div>
    ):(<div className="cart-container">
        <h1 style={{textAlign:"center"}} >No Orders Purchase</h1><br/>
    </div>)}
    
    </>);
}
