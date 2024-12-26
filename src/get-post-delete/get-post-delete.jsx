import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setproducts] = useState([]);
  const [product, setproduct] = useState({
    _id: "",
    productname: "",
    productcode: "",
    category: "",
    manufacturer: "",
    manufacturingdate: "",
  });
  const [loading, setLoading] = useState(false); 
  const [loadingProductId, setLoadingProductId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getproduct") 
      .then((response) => {
        setproducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handlechange = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/postproduct", product) 
      .then((response) => {
        console.log(response.data);
        setproducts([...products, product]); 
        setproduct({
          _id: "",
          productname: "",
          productcode: "",
          category: "",
          manufacturer: "",
          manufacturingdate: "",
        });
      })
      .catch((error) => {
        if (error.response) {
        //   setMessage(error.response.data.message);
        console.log(error.response.data.message);
        } else {
          console.error("Error adding product:", error);
        }
      });

  
  };
        const deleteproduct = (id) => {
            setLoading(true); 
            setLoadingProductId(id);
            axios
              .delete(`http://localhost:3001/api/deleteproduct/${id}`) 
              .then((response) => {
                console.log(response.data.message);
                setproducts(products.filter((prod) => prod._id !== id));
              })
              .catch((error) => {
                console.error("Error deleting product:", error);
              })
              .finally(() => {
                setLoading(false);
                setLoadingProductId(null); 
              });
          };

  return (
    <div>
      <h1>Product Management</h1>

      {/* Form to add a product */}
      <form onSubmit={handlesubmit}>
        <h2>Add a Product</h2>
        {["_id", "productname", "productcode", "category", "manufacturer", "manufacturingdate"].map((field) => (
          <div key={field}>
            <label>
              {field}:
              <input
                type="text"
                name={field}
                value={product[field]}
                onChange={handlechange}
                required
              />
            </label>
          </div>
        ))}
        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            {prod.productname} ({prod.productcode}) - {prod.category}, by{" "}
            {prod.manufacturer}, manufactured on {prod.manufacturingdate}
            <button
              onClick={() => deleteproduct(prod._id)}
              disabled={loading && loadingProductId === prod._id} 
            >
              {loading && loadingProductId === prod._id ? "Deleting..." : "Delete"}
            </button>          
                </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
