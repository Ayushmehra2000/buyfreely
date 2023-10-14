import "./bill.css"

export function Bill({data}){
    return (<>
    <div className="bill">
        <div id="date"><h2>Order on :- {data.date}</h2></div>
        {console.log(data.list)}
        {data.list.map((orders,i)=>{
            return(
            <div id="order" key={i}>
                <div className="name">{orders.ProductName}</div>
                <div className="price">&#8377;{orders.ProductPrice}</div>
                <div className="qty">X {orders.quantity}</div>
                <div className="total">&#8377;{orders.ProductPrice*orders.quantity}</div>
        </div>)})}
        <div id="order">
            <div className="totalhead"><span><strong>Total:</strong></span></div>
            <div className="totalpricedisplay">&#8377;{data.amount}</div>
        </div>
    </div>
    </>);
}