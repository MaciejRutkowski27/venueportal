import React, { useEffect, useState } from "react";
import Navigation from "./SideNavigation";
import CustomizationPopup from "./Popup";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  const [batchIndex, setBatchIndex] = useState(0); // State to track current batch index
  const [loading, setLoading] = useState(true); // State to track loading status
  const batchSize = 10; // Define the batch size

  function search(products) {
    return products.filter((product) => {
      return product["name"].toString().toLowerCase().includes(q.toLowerCase());
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        // Fetch all products
        const productsResponse = await fetch("/api/Product/AllProducts");
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch the first batch of images
        fetchImagesInBatches(productsData, 0);
        setLoading(false); // Set loading to false when fetching completes
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchImagesInBatches = async (productsData, batchIndex) => {
    const start = batchIndex * batchSize;
    const end = start + batchSize;
    const currentBatch = productsData.slice(start, end);

    const imagePromises = currentBatch.map(async (product) => {
      try {
        const imagesResponse = await fetch(
          `/api/Product/ImagesOnProduct/${product.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!imagesResponse.ok) {
          throw new Error(`HTTP error! Status: ${imagesResponse.status}`);
        }

        const imagesData = await imagesResponse.json();
        // Take only the first image for each product
        const firstImage = imagesData[0];
        return firstImage ? { ...firstImage, productId: product.id } : null;
      } catch (error) {
        console.error(
          `Error fetching images for product ${product.id}:`,
          error.message
        );
        return null; // Return null for error cases
      }
    });

    const imagesData = await Promise.all(imagePromises);
    setProductImages((prevImages) => [
      ...prevImages,
      ...imagesData.filter(Boolean),
    ]);
  };

  const loadMoreImages = () => {
    const newBatchIndex = batchIndex + 1;
    setBatchIndex(newBatchIndex);
    fetchImagesInBatches(products, newBatchIndex);
  };

  return (
    <>
      <div className="contentPage">
        <Navigation />
        <div className="AddProducts">
          <p className="heading2">
            Choose from existing products to add a new one to your venue
          </p>
          <div className="pagecontent">
            <div className="top">
              <CustomizationPopup />
              <div className="search-wrapper">
                <label htmlFor="search-form">
                  <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search for..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <p className="description">Products</p>
              {loading ? (
                <p className="description">Loading products...</p> // Display this paragraph while loading
              ) : (
                <div className="images">
                  {search(products).map((product) => {
                    const productImage = productImages.find(
                      (image) => image.productId === product.id
                    );

                  // Check if the product has a valid image
                  if (productImage && productImage.link) {
                    return (
                      <div key={product.id} className="item">
                        <img
                          className="itemImage"
                          src={productImage.link}
                          alt={productImage.name}
                        />
                        <p className="item_name">{product.name}</p>
                      </div>
                    );
                  }

                  return null; // Skip rendering if image is missing or invalid
                })}
              </div>
              )}
              <button className="homeButton" onClick={loadMoreImages}>
                Load More
              </button>{" "}
              {/* Load more button */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProducts;
