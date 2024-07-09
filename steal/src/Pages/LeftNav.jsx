import React from "react";


    function LeftNav({handleFilterChange, handleSortChange}) {
      return (<div className="left-nav">
        <div className="filter-sort">
        <p>Categories</p>
          <div className="categories-select" onChange={handleFilterChange}>
            <input type="radio" id="filterAll" name="filter" value="" />
            <label htmlFor="filterAll">All</label><br />
          
            <input type="radio" id="filterNavigation" name="filter" value="1" />
            <label htmlFor="filterNavigation">Navigation</label><br />
          
            <input type="radio" id="filterCards" name="filter" value="2" />
            <label htmlFor="filterCards">Cards</label><br />
          
            <input type="radio" id="filterMainPages" name="filter" value="3" />
            <label htmlFor="filterMainPages">Main Pages</label><br />
          
            <input type="radio" id="filterOther" name="filter" value="other" />
            <label htmlFor="filterOther">Other</label>
          </div>
          <select onChange={handleSortChange}>
            <option value="idDesc">↑ Newest</option>
            <option value="idAsc">↓ Oldest</option>
            {
        /* <option value="">↑ Most Popular</option> */
      }
          </select>
        </div>
      </div>);
    }
  
  export default LeftNav;