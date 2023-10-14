import "./Home.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { loginorlogoutSelector,getInitialUserList, setLoggedIn, setUserLoggedIn } from "../../features/reducers/LoginOrLogoutReducer";
import { ItemList } from "./ItemList/ItemList";
import { getProductItems,getInitialCartOrdersThunk ,productSelector,setCategory} from "../../features/reducers/ProductReducer";
export function Home() {
    const { isLoggedIn,userLoggedIn} = useSelector(loginorlogoutSelector);
    const { productItem,category } = useSelector(productSelector);
    const [filteredList, setFilteredList] = new useState("");
    const [pricefilter, setPricefilter] = useState(10000);
    const [selectedprice,setSelectedPrice] = useState(10000);
    const dispatch = useDispatch();

    //search filter
    const filterBySearch = (event) => {
        const query = event.target.value;
        var updatedList = [...productItem];
        updatedList = updatedList.filter((item) => {
          return item.ProductName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        setFilteredList(updatedList);
    };
    // handle Price filter 
    const priceFilterHandler=(e)=>{
        setPricefilter(e.target.value);
        setSelectedPrice(pricefilter*20*pricefilter);
    }
    // handlecategory 
    const handleCategory=(e)=>{
        const {value,checked} = e.target ;
        console.log(value , checked);
        // user checked the category
        if(checked){
            dispatch(setCategory(value));
        }else{
            //user unchecked the category
            dispatch(setCategory("none"));
        }
    }

    useEffect(() => {
        dispatch(getProductItems());
    },[]);
    // get the initial data of cart and previous orders history
    useEffect(() => {
        dispatch(getInitialCartOrdersThunk());
    },[userLoggedIn]);

    useEffect(()=>{
        // getting user's token from local Storage on first render
        const token=window.localStorage.getItem("token");
        if(token){
            // if user is logged in
            // getting loggedIn user's data 
            const index=window.localStorage.getItem("index");
            const user=JSON.parse(index);
            // set token and loggedIn user
            dispatch(setLoggedIn(token));
            dispatch(setUserLoggedIn(user));
        }
    },[]);

    // get list of all the user's in database
    useEffect(()=>{
        dispatch(getInitialUserList());
    },[isLoggedIn]);
    return (<>
        <div id="home-container">
            <div id="search-Box" >
                <input type='text' placeholder="Search By Name" onChange={filterBySearch}/>
            </div>
            <div id="aside">
                <div id="range" >
                    <h2>Filter</h2>
                    <h3>Price: {selectedprice} </h3>
                    <input type="range" onChange={priceFilterHandler}/>
                </div>
                <div id="category">
                    <h2>Categories</h2>
                    <ul>
                        <li><input type="checkbox" name="category" value="man" onChange={(e)=>handleCategory(e)}  /><span>Men's</span></li>
                        <li><input type="checkbox" name="category" value="women" onChange={(e)=>handleCategory(e)}  /><span>Women's</span></li>
                        <li><input type="checkbox" name="category" value="electronic" onChange={(e)=>handleCategory(e)}  /><span>Electronic</span></li>
                        <li><input type="checkbox" name="category" value="jewellery" onChange={(e)=>handleCategory(e)}  /><span>Jewellery</span></li>
                    </ul>
                </div>
            </div>
            <div id="data-display">
                <ItemList filteredList={filteredList} selectedprice={selectedprice} category={category} />
            </div>
        </div>
    </>)
}