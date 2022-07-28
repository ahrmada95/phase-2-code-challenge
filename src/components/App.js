import React, { useState, useEffect } from "react";

import Header from "./Header";
import RandomButton from "./RandomButton";
import PlaneteersContainer from "./PlaneteersContainer";
import SearchBar from "./SearchBar";

const url = "http://localhost:8003/"; //global variable that holds the url 

function App() {
  //state to hold array of planeteers
  const [planeteers, setPlaneteers] = useState([]); 

  //state to hold string of search target, since onChange will trigger on each keypress this will cause a render cascade
  const [searchTarget, setSearchTarget]= useState(''); 

  //setter function for state, param is string
  const handleSearch = (searchForMe) => {
    setSearchTarget(searchForMe);
  }

  useEffect( () => { //useEffect to run on render
      const fetchData = async() => { //get data
        const req = await fetch(url+'planeteers'); //request
        const res = await req.json(); //convert request to json 
        setPlaneteers(res); //set state to hold array of planeteers
      }

      fetchData(); //call fetchData 
  }, [] ); //run once on render!

  const currArray = planeteers.filter((planeteer) => { //not case-sensitive search
    return ( 
              (planeteer['name'].toLowerCase().includes(searchTarget.toLowerCase())) 
                  || 
              (planeteer['bio'].toLowerCase().includes(searchTarget.toLowerCase()))
            )                                                                  
  }); //placeholder in case we have to do filtering or searching EDIT: IM ACTUALLY A GENIUS

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch}/> {/*pass setter function*/}
      <RandomButton />
      <PlaneteersContainer planeteers={currArray}/>
    </div>
  );
}

export default App;
