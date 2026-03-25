import { useEffect, useState } from "react";

function MandiPrices(){

 const [prices,setPrices] = useState([]);

 useEffect(()=>{

  fetch("http://localhost:5000/api/mandi")

   .then(res=>res.json())

   .then(data=>setPrices(data));

 },[]);

 return(

  <div>

   <h2>Tamil Nadu Mandi Prices</h2>

   <table border="1" cellPadding="10">

    <thead>

     <tr>
      <th>Crop</th>
      <th>Market</th>
      <th>Price (₹/kg)</th>
      <th>Date</th>
     </tr>

    </thead>

    <tbody>

     {prices.map((item,index)=>(

      <tr key={index}>
       <td>{item.commodity}</td>
       <td>{item.market}</td>
       <td>₹ {item.price_per_kg}</td>
       <td>{item.date}</td>
      </tr>

     ))}

    </tbody>

   </table>

  </div>

 );

}

export default MandiPrices;