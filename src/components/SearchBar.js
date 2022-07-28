import React from "react";

function SearchBar({onSearch, onSort}) {
  return (
    <div className="search">
      <input type="text" className="searchTerm" onChange={(event) => onSearch(event.target.value)}/> {/*on keypress, send change up to parent}*/
        <label>
          <input type="checkbox" onChange={onSort}/>
          Sort by Age
        </label>
      }
    </div>
  );
}

export default SearchBar;
