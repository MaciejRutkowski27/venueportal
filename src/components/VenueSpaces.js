
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./SideNavigation";

export default function VenueSpaces() {
  const [spaces, setSpaces] = useState([]);
  const [caption, setCaption] = useState("");
  const [openAccordions, setOpenAccordions] = useState({});
  const [venueid, setVenueId] = useState(21);
  const [venuespaceid, setVenuespaceid] = useState(77);
  const [selectedParentSpace, setSelectedParentSpace] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [imagelink, setImagelink] = useState(
    "https://reevelastorage.blob.core.windows.net/spaceimages/testroom.jpg"
  );
  const [deleteSpaceId, setDeleteSpaceId] = useState(null);
  const [parentSpaces, setParentSpaces] = useState([]);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [svgFillColor, setSvgFillColor] = useState("transparent");
  const [spaceColors, setSpaceColors] = useState({});
  const [imageFile, setImageFile] = useState(null); // New state for storing the selected image file
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // New state for storing the uploaded image URL

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    // Add image uploading functionality
    if (!imageFile) {
      console.log("Please select an image.");
      return;
    }

    const containerName = "spaceimages";
    const fileName = imageFile.name;

    const uploadUrl = `/api/Image/upload/${containerName}/${fileName}`;

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
        const imageUrl = await response.json(); // Assuming the server responds with the uploaded image URL
        setUploadedImageUrl(imageUrl); // Store the uploaded image URL

        // Display the uploaded image
        document.getElementById("uploadedImage").src = imageUrl;

        // Update the space with the uploaded image link
        const updateUrl = `/api/VenueSpace/UpdateVenueSpace/${venuespaceid}/${encodeURIComponent(
          caption
        )}/${encodeURIComponent(imagelink)}/${sortOrder}`;

        const updateResponse = await fetch(updateUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (updateResponse.ok) {
          console.log("Space updated successfully with image link.");
          // Handle success if needed
        } else {
          console.log("Failed to update space with image link.");
          // Handle failure if needed
        }

        // Set the imagelink state with the uploaded image URL
        setImagelink(imageUrl);
      } else {
        console.log("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Construct the payload object
    const newPost = {
      name: caption,
      venueid: venueid,
      sortorder: sortOrder,
      imagelink: uploadedImageUrl,
    };

    // Construct the URL for the POST request
    let url;
    if (selectedParentSpace) {
      newPost.parentspaceid = selectedParentSpace;
      url = `/api/VenueSpace/AddSpaceToVenue/${encodeURIComponent(
        caption
      )}/${venueid}/${encodeURIComponent(
        selectedParentSpace
      )}/${encodeURIComponent(uploadedImageUrl)}/${sortOrder}`;
    } else {
      url = `/api/VenueSpace/AddSpaceToVenue/${encodeURIComponent(
        caption
      )}/${venueid}/${encodeURIComponent(
        selectedParentSpace
      )}/${encodeURIComponent(uploadedImageUrl)}/${sortOrder}`;
    }

    // Send the POST request
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle the response
    if (response.ok) {
      navigate("/venue-spaces");
      window.location.reload(); // Reload the page
    } else {
      console.log("Something went wrong again");
    }
  }
  const handleUpdateSpace = async () => {
    try {
      const updateUrl = `/api/VenueSpace/UpdateVenueSpace/${venuespaceid}/${encodeURIComponent(
        caption
      )}/${encodeURIComponent(imagelink)}/${sortOrder}`;
      const updateResponse = await fetch(updateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (updateResponse.ok) {
        console.log("Space updated successfully with image link.");
        // Handle success if needed
      } else {
        console.log("Failed to update space with image link.");
        // Handle failure if needed
      }
    } catch (error) {
      console.error("Error updating space:", error);
    }
  };
  async function handleDelete(spaceId) {
    const wantToDelete = window.confirm("Are you sure you want to delete?");
    if (wantToDelete) {
      const url = `/api/VenueSpace/Delete/${spaceId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteSpaceId(null); // Close the delete popup
        navigate("/venue-spaces");
        window.location.reload(); // Reload the page
      } else {
        alert("Something went wrong");
      }
    }
  }
 
  useEffect(() => {
    async function fetchParentSpaces() {
      try {
        const url = `/api/VenueSpace/AllSpacesForVenue/${venueid}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const spacesData = await response.json();

        setParentSpaces(spacesData);
      } catch (error) {
        console.error("Error fetching parent spaces:", error.message);
      }
    }

    fetchParentSpaces();
  }, [venueid]);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `/api/VenueSpace/AllSpacesforVenue/${venueid}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const spacesData = await response.json();

        const initialColors = {};
        spacesData.forEach((subspace) => {
          initialColors[subspace.id] = "transparent";
        });
        setSpaceColors(initialColors);
        setSpaces(spacesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [venueid]);
  const toggleAddPopup = () => {
    setAddPopupOpen(!isAddPopupOpen);
  };
  const changeColor = (spaceId) => {
    setSpaceColors((prevColors) => {
      const newColors = { ...prevColors };
      newColors[spaceId] =
        newColors[spaceId] === "transparent" ? "red" : "transparent";
      return newColors;
    });
  };

  const handleAccordionClick = (spaceId, level, event) => {
    event.stopPropagation();

    setOpenAccordions((prevOpenAccordions) => {
      const newOpenAccordions = { ...prevOpenAccordions };

      if (newOpenAccordions[level] === spaceId) {
        delete newOpenAccordions[level];
        setSelectedParentSpace(null); // Reset selected parent space
      } else {
        newOpenAccordions[level] = spaceId;
        setSelectedParentSpace(spaceId); // Use spaceId instead of parentSpaceId
      }

      return newOpenAccordions;
    });
  };

  const renderSubspaces = (parentSpaceId, level) => {
    const subspaces = spaces.filter((s) => s.parentSpaceId === parentSpaceId);

    if (subspaces.length === 0) {
      return null;
    }

    return (
      <div
        className={`subspacesAccordion level-${level} ${
          openAccordions[level] === parentSpaceId ? "open" : ""
        }`}
      >
        {subspaces.map((subspace) => (
          <div
            key={subspace.id}
            className="subspaceItem"
            onClick={(event) => handleAccordionClick(subspace.id, level, event)}
          >
            <div className="subspaceInfo">
              <img
                className="spaceItemImage"
                src={subspace.imageLink}
                alt={subspace.name}
              />
              <p className="item_description">{subspace.name}</p>
            </div>
            {subspaces.some((s) =>
              spaces.find((inner) => inner.parentSpaceId === subspace.id)
            ) && (
              <div
                className="scroll-prompt"
                scroll-prompt=""
                ng-show="showPrompt"
              >
                <div className="scroll-prompt-arrow-container">
                  <div className="scroll-prompt-arrow">
                    <div></div>
                  </div>
                  <div className="scroll-prompt-arrow">
                    <div></div>
                  </div>
                </div>
              </div>
            )}
            <button
              className="deleteButton"
              onClick={() => setDeleteSpaceId(subspace.id)}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill={spaceColors[subspace.id] || "transparent"}
                onClick={() => changeColor(subspace.id)}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_849_6278)">
                  <path
                    d="M19.8171 5.18336C19.6999 5.06619 19.541 5.00037 19.3752 5.00037C19.2095 5.00037 19.0506 5.06619 18.9334 5.18336L12.5002 11.6165L6.06711 5.18336C5.9499 5.06619 5.79096 5.00037 5.62523 5.00037C5.45951 5.00037 5.30056 5.06619 5.18336 5.18336V5.18336C5.06619 5.30056 5.00037 5.45951 5.00037 5.62523C5.00037 5.79096 5.06619 5.9499 5.18336 6.06711L11.6165 12.5002L5.18336 18.9334C5.06619 19.0506 5.00037 19.2095 5.00037 19.3752C5.00037 19.541 5.06619 19.6999 5.18336 19.8171V19.8171C5.30056 19.9343 5.45951 20.0001 5.62523 20.0001C5.79096 20.0001 5.9499 19.9343 6.06711 19.8171L12.5002 13.384L18.9334 19.8171C19.0506 19.9343 19.2095 20.0001 19.3752 20.0001C19.541 20.0001 19.6999 19.9343 19.8171 19.8171C19.9343 19.6999 20.0001 19.541 20.0001 19.3752C20.0001 19.2095 19.9343 19.0506 19.8171 18.9334L13.384 12.5002L19.8171 6.06711C19.9343 5.9499 20.0001 5.79096 20.0001 5.62523C20.0001 5.45951 19.9343 5.30056 19.8171 5.18336V5.18336Z"
                    fill={spaceColors[subspace.id] || "red"}
                  />
                </g>
                <path
                  d="M19.7917 0H5.20833C3.827 0 2.50224 0.548734 1.52549 1.52549C0.548734 2.50224 0 3.827 0 5.20833L0 19.7917C0 20.4756 0.134718 21.1529 0.396461 21.7848C0.658204 22.4167 1.04185 22.9909 1.52549 23.4745C2.50224 24.4513 3.827 25 5.20833 25H19.7917C20.4756 25 21.1529 24.8653 21.7848 24.6035C22.4167 24.3418 22.9909 23.9582 23.4745 23.4745C23.9582 22.9909 24.3418 22.4167 24.6035 21.7848C24.8653 21.1529 25 20.4756 25 19.7917V5.20833C25 4.52437 24.8653 3.84709 24.6035 3.21519C24.3418 2.58329 23.9582 2.00912 23.4745 1.52549C22.9909 1.04185 22.4167 0.658204 21.7848 0.396461C21.1529 0.134718 20.4756 0 19.7917 0V0ZM22.9167 19.7917C22.9167 20.6205 22.5874 21.4153 22.0014 22.0014C21.4153 22.5874 20.6205 22.9167 19.7917 22.9167H5.20833C4.37953 22.9167 3.58468 22.5874 2.99862 22.0014C2.41257 21.4153 2.08333 20.6205 2.08333 19.7917V5.20833C2.08333 4.37953 2.41257 3.58468 2.99862 2.99862C3.58468 2.41257 4.37953 2.08333 5.20833 2.08333H19.7917C20.6205 2.08333 21.4153 2.41257 22.0014 2.99862C22.5874 3.58468 22.9167 4.37953 22.9167 5.20833V19.7917Z"
                  fill="black"
                />
                <defs>
                  <clipPath id="clip0_849_6278">
                    <rect width="15" height="15" transform="translate(5 5)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            {openAccordions[level] === subspace.id &&
              renderSubspaces(subspace.id, level + 1)}
          </div>
        ))}
        <button className="addButton" onClick={toggleAddPopup}>
          <svg
            width="250"
            height="250"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"
              fill="#8FE566"
            />
          </svg>
        </button>
      </div>
    );
  };

  const renderSpaces = () => {
    const firstLevelSpaces = spaces.filter(
      (space) => space.parentSpaceId === null || space.parentSpaceId === "0"
    );

    return firstLevelSpaces.map((space) => (
      <div
        key={space.id}
        className="spaceItem"
        onClick={(event) => handleAccordionClick(space.id, 1, event)}
      >
        <div className="spaceInfo">
          <img
            className="spaceItemImage"
            src={space.imageLink}
            alt={space.name}
          />
          <p className="item_name">{space.name}</p>
        </div>
        {firstLevelSpaces.some((s) =>
          spaces.find((inner) => inner.parentSpaceId === space.id)
        ) && (
          <div className="scroll-prompt" scroll-prompt="" ng-show="showPrompt">
            <div className="scroll-prompt-arrow-container">
              <div className="scroll-prompt-arrow">
                <div></div>
              </div>
              <div className="scroll-prompt-arrow">
                <div></div>
              </div>
            </div>
          </div>
        )}
        <button
          className="deleteButton"
          onClick={() => setDeleteSpaceId(space.id)}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill={spaceColors[space.id] || svgFillColor}
            onClick={() => changeColor(space.id)}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_849_6278)">
              <path
                d="M19.8171 5.18336C19.6999 5.06619 19.541 5.00037 19.3752 5.00037C19.2095 5.00037 19.0506 5.06619 18.9334 5.18336L12.5002 11.6165L6.06711 5.18336C5.9499 5.06619 5.79096 5.00037 5.62523 5.00037C5.45951 5.00037 5.30056 5.06619 5.18336 5.18336V5.18336C5.06619 5.30056 5.00037 5.45951 5.00037 5.62523C5.00037 5.79096 5.06619 5.9499 5.18336 6.06711L11.6165 12.5002L5.18336 18.9334C5.06619 19.0506 5.00037 19.2095 5.00037 19.3752C5.00037 19.541 5.06619 19.6999 5.18336 19.8171V19.8171C5.30056 19.9343 5.45951 20.0001 5.62523 20.0001C5.79096 20.0001 5.9499 19.9343 6.06711 19.8171L12.5002 13.384L18.9334 19.8171C19.0506 19.9343 19.2095 20.0001 19.3752 20.0001C19.541 20.0001 19.6999 19.9343 19.8171 19.8171C19.9343 19.6999 20.0001 19.541 20.0001 19.3752C20.0001 19.2095 19.9343 19.0506 19.8171 18.9334L13.384 12.5002L19.8171 6.06711C19.9343 5.9499 20.0001 5.79096 20.0001 5.62523C20.0001 5.45951 19.9343 5.30056 19.8171 5.18336V5.18336Z"
                fill={spaceColors[space.id] || "red"}
              />
            </g>
            <path
              d="M19.7917 0H5.20833C3.827 0 2.50224 0.548734 1.52549 1.52549C0.548734 2.50224 0 3.827 0 5.20833L0 19.7917C0 20.4756 0.134718 21.1529 0.396461 21.7848C0.658204 22.4167 1.04185 22.9909 1.52549 23.4745C2.50224 24.4513 3.827 25 5.20833 25H19.7917C20.4756 25 21.1529 24.8653 21.7848 24.6035C22.4167 24.3418 22.9909 23.9582 23.4745 23.4745C23.9582 22.9909 24.3418 22.4167 24.6035 21.7848C24.8653 21.1529 25 20.4756 25 19.7917V5.20833C25 4.52437 24.8653 3.84709 24.6035 3.21519C24.3418 2.58329 23.9582 2.00912 23.4745 1.52549C22.9909 1.04185 22.4167 0.658204 21.7848 0.396461C21.1529 0.134718 20.4756 0 19.7917 0V0ZM22.9167 19.7917C22.9167 20.6205 22.5874 21.4153 22.0014 22.0014C21.4153 22.5874 20.6205 22.9167 19.7917 22.9167H5.20833C4.37953 22.9167 3.58468 22.5874 2.99862 22.0014C2.41257 21.4153 2.08333 20.6205 2.08333 19.7917V5.20833C2.08333 4.37953 2.41257 3.58468 2.99862 2.99862C3.58468 2.41257 4.37953 2.08333 5.20833 2.08333H19.7917C20.6205 2.08333 21.4153 2.41257 22.0014 2.99862C22.5874 3.58468 22.9167 4.37953 22.9167 5.20833V19.7917Z"
              fill="black"
            />
            <defs>
              <clipPath id="clip0_849_6278">
                <rect width="15" height="15" transform="translate(5 5)" />
              </clipPath>
            </defs>
          </svg>
        </button>
        {openAccordions[1] === space.id && renderSubspaces(space.id, 2)}
      </div>
    ));
  };

  return (
    <>
      <div className="contentPage">
        <Navigation />
        <div className="AddProducts">
          <p className="heading2">Spaces</p>
          <div className="spacesImage">{renderSpaces()}</div>
        </div>
      </div>
      {isAddPopupOpen && (
        <div className="addingSpace">
          <form className="formmy" onSubmit={handleSubmit}>
            <div className="headline">Add new space</div>
            <div className="formcaption">
              <label>Name</label>
              <input
                type="text"
                placeholder="Type a name"
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
              />
            </div>
            <div className="formcaption">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
            <div className="formcaption" style={{ display: "none" }}>
              <label>Venue</label>
              <input
                type="text"
                placeholder="Choose venue"
                value={venueid}
                onChange={(event) => setVenueId(event.target.value)}
              />
            </div>
            <div className="formcaption">
              <label>Parent space</label>
              <select
                value={selectedParentSpace || ""} // Use selected parent space or empty string
                onChange={(event) => setSelectedParentSpace(event.target.value)}
              >
                <option value="">Choose parent space</option>
                {parentSpaces.map((parentSpace) => (
                  <option key={parentSpace.id} value={parentSpace.id}>
                    {parentSpace.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="formcaption">
              <label>Sort order</label>
              <input
                type="text"
                placeholder="Set sort order"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              />
            </div>
            <button>Create</button>
            <button onClick={handleUpdateSpace}>Update Space</button>
          </form>
        </div>
      )}
      {deleteSpaceId && (
        <div className="deletePopup">
          <p className="description">
            Are you sure you want to delete this space?
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              className="homeButton"
              // onClick={() => handleDelete(deleteSpaceId)}
              onClick={() => setDeleteSpaceId(null)}
            >
              Yes
            </button>
            <button
              className="homeButton"
              onClick={() => setDeleteSpaceId(null)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}
