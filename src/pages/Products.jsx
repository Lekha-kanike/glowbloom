import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [priceRange, setPriceRange] = useState("All");
const [skinType, setSkinType] = useState("All");
const [sort, setSort] = useState("Popular");

  async function getProducts() {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function deleteProduct(id) {
    await api.delete(`/products/${id}`);

    setProducts(
      products.filter((product) => product.id !== id),
    );
  }

 const filteredProducts = products.filter((product) => {
  const searchMatch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const categoryMatch =
    category === "All" || product.category === category;

  // Price Range filter
  let priceMatch = true;
  if (priceRange === "under299") {
    priceMatch = product.rate < 299;
  } else if (priceRange === "299to599") {
    priceMatch = product.rate >= 299 && product.rate <= 599;
  } else if (priceRange === "above600") {
    priceMatch = product.rate > 600;
  }

  // SkinType filter
  const skinTypeMatch = 
    skinType === "All" || 
    product.skinType === skinType || 
    product.skinType === "All";

  return searchMatch && categoryMatch && priceMatch && skinTypeMatch;
});

  let finalProducts = [...filteredProducts];

 if (sort === "rating") {
  finalProducts.sort((a, b) => b.rating - a.rating);
} else if (sort === "lowToHigh") {
  finalProducts.sort((a, b) => a.rate - b.rate);
} else if (sort === "highToLow") {
  finalProducts.sort((a, b) => b.rate - a.rate);
}
  return (
    <>
      <h1>Popular Products</h1>
      <Link to="/add-product" className="add-btn">
        Add Product
      </Link>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option>All</option>
  <option>Face Wash</option>
  <option>Toner</option>
  <option>Serum</option>
  <option>Moisturizer</option>
  <option>Sunscreen</option>
  <option>Face Mask</option>
  <option>Eye Care</option>
  <option>Lip Care</option>
  <option>Body Care</option>
  <option>Hair Care</option>
  <option>Men's Care</option>
</select>

        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
  <option value="All">All Prices</option>
  <option value="under299">Under ₹299</option>
  <option value="299to599">₹299 - ₹599</option>
  <option value="above600">Above ₹600</option>
</select>

<select value={skinType} onChange={(e) => setSkinType(e.target.value)}>
  <option value="All">All Skin Types</option>
  <option value="Oily">Oily</option>
  <option value="Dry">Dry</option>
  <option value="Sensitive">Sensitive</option>
  <option value="Combination">Combination</option>
</select>

<select value={sort} onChange={(e) => setSort(e.target.value)}>
  <option value="Popular">Popular</option>
  <option value="rating">Top Rated</option>
  <option value="lowToHigh">Price: Low to High</option>
  <option value="highToLow">Price: High to Low</option>
</select>
      </div>

      <div className="products">
        {finalProducts.length > 0 ? (
          finalProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={deleteProduct}
            />
          ))
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </>
  );
}

export default Products;