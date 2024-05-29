import React, { useState } from "react";
import Navigation from "./SideNavigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import venueprofile from "../assets/venueprofile.mp4";

export default function Guides() {
    
  const [activeIndex, setActiveIndex] = useState(null);
  const accordionItems = [
    {
      title: "Profile dashboard area",
      
    },
    {
      title: "Adding products and product details",
      
    },
    {
      title: "Removing products",
      
    },
  ];

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <div className="contentPage">
        <Navigation />
        <div className="helpcontainer">
          <p className="heading2">Guides</p>
          <p className="description" style={{ textAlign: "center" }}>
            Here you can find some useful videos and tutorials on how to
            navigate the portal.
          </p>
          <div className="helpaccordion">
            {accordionItems.map((item, index) => (
              <div
                key={index}
                className={`helpaccordion-item ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => handleAccordionClick(index)}
              >
                <h3 className="title">
                  <span>{item.title}</span>
                  <i
                    className={`fas fa-chevron-down ${
                      activeIndex === index ? "rotate" : ""
                    }`}
                  ></i>
                </h3>
                {activeIndex === index && (
                  <div className="video-container">
                    <video style={{width: "80%", height: "30%"}}controls>
                      <source
                        src={venueprofile}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
