import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [budget, setBudget] = useState("All");

  const [sort, setSort] = useState("");

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

    const budgetMatch = budget === "All" || product.budget === budget;

    return searchMatch && categoryMatch && budgetMatch;
  });

  let finalProducts = [...filteredProducts];

  if (sort === "high") {
    finalProducts.sort((a, b) => b.rating - a.rating);
  }

  if (sort === "low") {
    finalProducts.sort((a, b) => a.rating - b.rating);
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
        </select>

        <select value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Select</option>

          <option value="high">High To Low</option>

          <option value="low">Low To High</option>
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