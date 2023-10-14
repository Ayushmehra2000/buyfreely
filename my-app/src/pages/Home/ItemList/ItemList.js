import { ItemCard } from "./itemcard";
import { productSelector } from "../../../features/reducers/ProductReducer";
import { useSelector } from "react-redux";
import "./itemlist.css";
export function ItemList({filteredList,selectedprice}){
    const { productItem,category } = useSelector(productSelector);
    return(<>
    <div className="item-container">
        {(filteredList.length>0 ? filteredList:productItem).map((itemdetail,i)=>{
           return(<>
           {category === "none" && selectedprice>itemdetail.ProductPrice ? (<ItemCard detail={itemdetail} key={i}/>):(<>{category === itemdetail.productcategory && selectedprice>itemdetail.ProductPrice?(<ItemCard detail={itemdetail} key={i}/>):(null)}</>)} 
        </>)}
        )}
    </div>
    </>);
}