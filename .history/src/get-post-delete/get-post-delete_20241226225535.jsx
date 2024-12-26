import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setproducts] = useState([]);
  const [product, setproduct] = useState({
    id: "",
    productname: "",
    productcode: "",
    category: "",
    manufacturer: "",
    manufacturingdate: "",
  });
//   const [message, setMessage] = useState("");

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getproduct") // Adjust the URL as per your backend
      .then((response) => {
        setproducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Handle input changes for the form
  const handlechange = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission to add a product
  const handlesubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/postproduct", product) // Adjust the URL as per your backend
      .then((response) => {
        console.log(response.data);
        // setMessage(response.data.message);
        setproducts([...products, product]); // Update the product list locally
        setproduct({
          id: "",
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

  return (
    <div>
      <h1>Product Management</h1>

      {/* Form to add a product */}
      <form onSubmit={handlesubmit}>
        <h2>Add a Product</h2>
        {["id", "productname", "productcode", "category", "manufacturer", "manufacturingdate"].map((field) => (
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

      {/* Display message */}
      {/* {message && <p>{message}</p>} */}

      {/* List of products */}
      <h2>Product List</h2>
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            {prod.productname} ({prod.productcode}) - {prod.category}, by{" "}
            {prod.manufacturer}, manufactured on {prod.manufacturingdate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
