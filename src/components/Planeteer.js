import React, { useState } from "react";

function Planeteer({planeteer}) {
  const [cardTextStatus, setCardTextStatus] = useState(true); //true -> bio shown; false -> quote shown
  //THIS STATE WILL CHANGE ON BUTTON PRESS, TRIGGER RENDER OF INDIVIDUAL CARD

  const isOverSeas = (planeteer['fromUSA'] === true);

  const handleText = () => {
    setCardTextStatus(!cardTextStatus);
  }

  return (
    <li className="cards__item">
      <div className="card">
        <img
          src={planeteer['pictureUrl']}
          alt={planeteer['name']}
          className="card__image"
        />
        <div className="card__content">
          <div className="card__title">{planeteer['name']}</div>
          <p className="card__text" onClick={handleText}>{cardTextStatus ? planeteer['bio'] : planeteer['quote']}</p>
          <div className="card__detail">
            <p>{planeteer['twitter']}</p>
            <p>
              {
                isOverSeas ? ('USA-BASED') : ("WORKING OVERSEAS")
              }
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Planeteer;
