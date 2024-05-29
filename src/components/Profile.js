import React, { useEffect, useState } from "react";
import Navigation from "./SideNavigation";

export default function Profile() {
  const [venues, setVenues] = useState([]);
  const [venueid] = useState(21);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDescriptionEdited, setIsDescriptionEdited] = useState(false); // State to track if description has been edited
  const [editableVenue, setEditableVenue] = useState({
    name: "",
    email: "example@example.com",
    password: "Password123",
    description: "",
    link: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `/api/Venue/ImagesOnVenue/${venueid}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const venuesData = await response.json();
        if (venuesData.length > 0) {
          const venue = venuesData[0];
          setVenues(venuesData);
          setEditableVenue({
            ...editableVenue,
            name: venue.name || "",
            description: venue.description || "",
            link: venue.link || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [venueid]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };

  const handleEditClick = () => {
    if (isEditing && editableVenue.description !== venues[0]?.description) {
      setIsDescriptionEdited(true);
    }
    setIsEditing((prevEditing) => !prevEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableVenue((prevVenue) => ({
      ...prevVenue,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="contentPage">
        <Navigation />
        <div className="venueImage">
          {venues.map((venue) => (
            <div key={venue.id} className="profilePage">
              <div
                id="wordcontainer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}
              >
                <p className="heading1">Profile</p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px", width: "50%" }}
                >
                  <div
                    style={{
                      color: "#000",
                      backgroundColor: "rgba(16, 4, 4, 0.18)",
                      border: "1px solid",
                      width: "100%",
                      height: "30px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#F4EFE2",
                        backgroundColor: "#637554",
                        width: isDescriptionEdited ? "100%" : "80%", // Conditionally render progress bar
                        height: "30px",
                        fontSize: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isDescriptionEdited ? "100%" : "80%"} complete
                    </div>
                  </div>
                  {!isDescriptionEdited && (
                    <div className="tooltip">
                      <span
                        style={{
                          cursor: "pointer",
                          fontWeight: "bold",
                          color: "#622F26",
                        }}
                      >
                        !
                      </span>
                      <span className="tooltiptext">
                        Venue description should be set to make it 100%.
                      </span>
                    </div>
                  )}
                </div>
                <br></br>
              </div>
              <div className="profileInfo">
                <div className="profilePart1">
                  {isEditing ? (
                    <input
                      type="text"
                      name="link"
                      value={editableVenue.link}
                      onChange={handleChange}
                      className="homeItemImage"
                    />
                  ) : (
                    <img
                      className="homeItemImage"
                      src={editableVenue.link}
                      alt={editableVenue.name}
                    />
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editableVenue.name}
                      onChange={handleChange}
                      className="description1"
                    />
                  ) : (
                    <p className="description">{editableVenue.name} Aarhus</p>
                  )}
                </div>
                <div className="profilePart2">
                  <h4 style={{ textAlign: "left", width: "100%" }}>
                    Account details
                  </h4>
                  {isEditing ? (
                    <input
                      type="text"
                      name="email"
                      value={editableVenue.email}
                      onChange={handleChange}
                      className="profileEmail"
                    />
                  ) : (
                    <h4 style={{ textAlign: "left", width: "100%" }}>
                      Email: {editableVenue.email}
                    </h4>
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      name="password"
                      value={editableVenue.password}
                      onChange={handleChange}
                      className="profileEmail"
                    />
                  ) : (
                    <h4 style={{ textAlign: "left", width: "100%" }}>
                      Password:{" "}
                      {isPasswordVisible
                        ? editableVenue.password
                        : "***********"}
                    </h4>
                  )}
                  <h4
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "10px",
                      marginTop: "0",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? "Hide password" : "Show password"}
                  </h4>
                </div>
                <div style={{display: "flex", flexDirection: "column", width: "75%", gap: "3vh" }}>
                <div className="profilePart3" style={{ width: "70%" }}>
                    <p className="description">Venue description</p>
                  {isEditing ? (
                    <input
                      name="description"
                      value={editableVenue.description}
                      onChange={handleChange}
                      className="profileDescription"
                    />
                  ) : (
                    <h4 style={{ width: "70%", textAlign: "left" }}>
                      {editableVenue.description}
                    </h4>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    
                  }}
                >
                  {isEditing ? (
                    <button onClick={handleEditClick} className="homeButton">
                      Save
                    </button>
                  ) : (
                    <button onClick={handleEditClick} className="homeButton">
                      Edit
                    </button>
                  )}
                  <button className="homeButton">
                    <a
                      href="https://reevela.com/pages/scandic-aarhus-city"
                      style={{ color: "#F4EFE2", textDecoration: "none" }}
                    >
                      Preview your page
                    </a>
                  </button>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
