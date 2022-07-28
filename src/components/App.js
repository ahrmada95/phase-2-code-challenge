import React, { useState, useEffect } from "react";

import Header from "./Header";
import RandomButton from "./RandomButton";
import PlaneteersContainer from "./PlaneteersContainer";
import SearchBar from "./SearchBar";

const url = "http://localhost:8003/planeteers"; //global variable that holds the url 

function App() {
  //state to hold array of planeteers
  const [planeteers, setPlaneteers] = useState([]); 

  //state to hold string of search target, since onChange will trigger on each keypress this will cause a render cascade
  const [searchTarget, setSearchTarget]= useState(''); 

  //state to hold sort param - by default do not filter by sorting age
  const [sortAge, setSortAge] = useState(false);

  //setter function for state, param is string
  const handleSearch = (searchForMe) => {
    setSearchTarget(searchForMe);
  }

  //handle adding a new Planeteer 
  const addPlaneteer = (newPlaneteer) => {
    setPlaneteers([...planeteers, newPlaneteer]);
  } 

  //handle sorting toggle
  const handleSort = () => {
    setSortAge(!sortAge);
  }

  useEffect( () => { //useEffect to run on render
      const fetchData = async() => { //get data
        const req = await fetch(url); //request
        const res = await req.json(); //convert request to json 
        setPlaneteers(res); //set state to hold array of planeteers
      }

      fetchData(); //call fetchData 
  }, [] ); //run once on render!

  let currArray = planeteers.filter((planeteer) => { //not case-sensitive search
    return ( 
              (planeteer['name'].toLowerCase().includes(searchTarget.toLowerCase())) 
                  || 
              (planeteer['bio'].toLowerCase().includes(searchTarget.toLowerCase()))
            )                                                                  
  }); //placeholder in case we have to do filtering or searching EDIT: IM ACTUALLY A GENIUS

  if(sortAge === true) {
    currArray = currArray.sort( (a,b) => {
      if((new Date().getFullYear() - a['born']) > (new Date().getFullYear() - b['born'])) {
        return 1;
      } else if ((new Date().getFullYear() - a['born']) < (new Date().getFullYear() - b['born'])) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} onSort={handleSort}/> {/*pass setter function*/}
      <RandomButton addPlaneteer={addPlaneteer} dbUrl = {url} /> 
      <PlaneteersContainer planeteers={currArray} /> {/*pass array of planeteers*/}
    </div>
  );
}

export default App;
