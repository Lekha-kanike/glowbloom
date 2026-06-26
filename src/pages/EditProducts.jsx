import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EditProduct() {

 const { id } = useParams();

 const navigate = useNavigate();

 const [formData, setFormData] =
   useState({
     name: "",
     category: "",
     image: "",
     description: ""
   });

 useEffect(() => {
   getProduct();
 }, []);

 async function getProduct() {

   const response =
     await api.get(
       `/products/${id}`
     );

   setFormData(response.data);
 }

 function handleChange(e) {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 }

 async function handleSubmit(e) {

   e.preventDefault();

   await api.put(
     `/products/${id}`,
     formData
   );

   navigate("/products");
 }

 return (
<div className='form-container'>
   <form onSubmit={handleSubmit}>

     <input
       type="text"
       name="name"
       value={formData.name}
       onChange={handleChange}
     />

     <input
       type="text"
       name="category"
       value={formData.category}
       onChange={handleChange}
     />

     <input
       type="text"
       name="image"
       value={formData.image}
       onChange={handleChange}
     />

     <textarea
       name="description"
       value={formData.description}
       onChange={handleChange}
     />

     <button  className='submit-btn'>
       Update Product
     </button>

   </form>
</div>
 );
}

export default EditProduct;