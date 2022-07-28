import React from "react";
import { getRandomPlaneteer } from "../data/planeteers";

function RandomButton({addPlaneteer, url}) {
  function handleClick() {
    const randomPlaneteer = getRandomPlaneteer();
    console.log("For the advanced deliverables", randomPlaneteer);

    const tempPlaneteer = {
      "name": randomPlaneteer['name'],
      "fromUSA": randomPlaneteer['fromUSA'],
      "born": randomPlaneteer['born'],
      "bio": randomPlaneteer['bio'],
      "quote": randomPlaneteer['quote'],
      "pictureUrl": `${randomPlaneteer['pictureUrl']}`, //had to cast this as a string for some weird reason?
      "twitter": randomPlaneteer['twitter']
    }
    
    fetch( ('http://localhost:8003/planeteers'), {
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(tempPlaneteer)
      } )

    addPlaneteer(tempPlaneteer); 
    /*NOTE: It will yell about it needing a key, but it already has one, rendering is just slow so it tries to render before the key is set but the key is set after */
  }

  return (
    <div className="centered">
      <button onClick={handleClick} id="random-planeteer">
        Click to Show a Random Planeteer
      </button>
    </div>
  );
}

export default RandomButton;
