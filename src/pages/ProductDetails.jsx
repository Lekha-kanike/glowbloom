import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function ProductDetails() {
 const { id } = useParams();

 const [product, setProduct] =
   useState(null);

 useEffect(() => {
   getProduct();
 }, []);

 async function getProduct() {
   try {
     const response = await api.get(
       `/products/${id}`
     );

     setProduct(response.data);
   } catch (error) {
     console.log(error);
   }
 }

 if (!product) {
   return <h2>Loading...</h2>;
 }

 return (
   <div className="details">
     <img
       src={product.image}
       alt={product.name}
     />

     <h1>{product.name}</h1>

     <p>{product.description}</p>

     <h3>Usage</h3>
    <p>{product.usage}</p>

    <h3>How to use the product</h3>
    <p>{product.howToUse}</p>

    <h3>Ingredients</h3>
    <p>{product.ingredients}</p>

    <h3>Clinical Results</h3>
    <p>{product.clinicalResults}</p>

    <h3>What Makes It Special</h3>
    <p>{product.whatMakesItToBuy}</p>

    <h3>Rating</h3>
    <p>⭐ {product.rating}</p>

    <h3>Price</h3>
    <p>₹ {product.rate}</p>

    <h3>MRP RATE</h3>
    <p>₹ {product.mrp}</p>

    <h3>Discount</h3>
    <p>{product.discount}% off</p>

    <h3>Tax Details</h3>

    <p>GST : {product.taxDetails?.gst}
        {product.taxDetails?.inclusive ? " (inclusive)" : " +Extra"}
    </p>

    {/*<h3>Country</h3>
     <p>{product.country}</p>

     <h3>Category</h3>
     <p>{product.category}</p>

     <h3>Best Time To Visit</h3>
     <p>{product.bestTimeToVisit}</p>

     <h3>Duration</h3>
     <p>{product.duration}</p>

     <h3>Weather</h3>
     <p>{product.weather}</p>

     <h3>Language</h3>
     <p>{product.language}</p>

     <h3>Currency</h3>
     <p>{product.currency}</p>

     <h3>Budget</h3>
     <p>₹ {product.price}</p>

     <h3>Rating</h3>
     <p>{product.rating}</p>

     <h3>Famous For</h3>
     <p>{product.famousFor}</p>

     <h3>Top Attractions</h3>

     <ul>
       {product.attractions.map(
         (place, index) => (
           <li key={index}>{place}</li>
         )
       )}
     </ul>*/}
   </div>
 );
}

export default ProductDetails;