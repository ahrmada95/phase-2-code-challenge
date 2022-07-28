import React from "react";

function SearchBar({onSearch}) {
  return (
    <div className="search">
      <input type="text" className="searchTerm" onChange={(event) => onSearch(event.target.value)}/> {/*on keypress, send change up to parent}
      {/* For the advanced deliverables: add a checkbox to allow sorting the planeteer */}
    </div>
  );
}

export default SearchBar;
