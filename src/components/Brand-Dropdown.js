import React, { useState, useEffect } from "react";
import "./index.css";
import arrowImage from "../assets/arrow-circle-down.png"

const DropdownFilter = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isElementsListVisible, setElementsListVisibility] = useState(false);

  const handleShowElementsClick = () => {
    setElementsListVisibility((prevVisibility) => !prevVisibility);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    // Update filteredProducts whenever the searchInput or products change
    const filtered = products.filter((product) =>
      product.brandName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchInput, products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products
        const productsResponse = await fetch("/api/Product/AllProducts");
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="list-container">
        <div className="dropdown-container">
          <p className="subdescription">Brand</p>
          <button className="custom-button" onClick={handleShowElementsClick}>
            <img src={arrowImage} alt=""/>
          </button>
        </div>
        <ul
          className={`element-list ${isElementsListVisible ? "visible" : ""}`}
        >
          <li className="search-bar">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </li>
          {filteredProducts.map((product, index) => (
            <p className="subdescription" key={index}>
              {product.brandName}
            </p>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropdownFilter;
