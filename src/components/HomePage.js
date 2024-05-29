import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./SideNavigation";

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [venueid] = useState(21); 

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `/api/Venue/ImagesOnVenue/${venueid}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const venuesData = await response.json();
        setVenues(venuesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [venueid]); 

  return (
    <>
      <div className="contentPage">
        <Navigation />
        <div className="venueImage">
          {venues.map((venue) => (
            <div key={venue.id} className="homeItem">
              <div className="venueInfo">
                <img
                  className="homeItemImage"
                  src={venue.link}
                  alt={venue.name}
                />

                <div className="heading">
                  <p className="description">Hello, {venue.name}!</p>
                  <a href="https://reevela.com/pages/scandic-aarhus-city">
                    <button className="homeButton">Preview your page</button>
                  </a>
                </div>
              </div>
              <div className="heading-ish">
                <div id="wordcontainer">
                  <p className="heading1">Dashboard</p>
                </div>
                <div className="buttonRow">
                  <Link to="/all-products">
                    <button className="homeButton">Add products</button>
                  </Link>
                  <button className="homeButton">Remove products</button>
                  <Link to="/move">
                    <button className="homeButton">Move products</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
