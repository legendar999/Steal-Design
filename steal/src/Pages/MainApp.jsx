import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../Images/logo.png";
import AddDesign from "./AddDesign";
import { motion } from "framer-motion";
import LeftNav from "./LeftNav";

// Modified fetchAndLogDesigns to just fetch and return the designs
const fetchDesigns = async () => {
  try {
    const response = await fetch("/designs.json");
    const data = await response.json();
    return data.designs.design; // Return the designs
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return empty array in case of error
  }
};

function DesignItem({ design }) {
  const { name, id, categoryId } = design["@attributes"];
  const author = design.author["#text"];
  const date = design.date["#text"];
  const htmlCode = design.htmlCode["#text"];
  const htmlCodeWithNewLines = htmlCode.replace(/>/g, ">\n");
  const cssCode = design.cssCode["#text"];
  const jsCode = design.jsCode["#text"];
  const uniqueClassName = `design-${id}`;
  const demoRef = React.useRef(null);
  const [isCodeVisible, setIsCodeVisible] = useState(false); // Added state to track code visibility

  React.useEffect(() => {
    const script = document.createElement("script");
    script.text = `(function() { try { ${jsCode} } catch(error) { console.error('Error executing JS code:', error); } })();`;
    demoRef.current.appendChild(script);
  }, [jsCode]);

  const scopedCss = `.${uniqueClassName} { ${cssCode} }`;

  const toggleCodeVisibility = () => setIsCodeVisible(!isCodeVisible); // Function to toggle code visibility

  // Function to copy HTML code
  const copyHtmlCode = () => {
    navigator.clipboard.writeText(htmlCode).then(
      () => {
        alert("HTML code copied!");
      },
      (err) => {
        console.error("Could not copy HTML code:", err);
      }
    );
  };

  // Function to copy CSS code
  const copyCssCode = () => {
    navigator.clipboard.writeText(cssCode).then(
      () => {
        alert("CSS code copied!");
      },
      (err) => {
        console.error("Could not copy CSS code:", err);
      }
    );
  };

  // Function to copy JS code
  const copyJsCode = () => {
    navigator.clipboard.writeText(jsCode).then(
      () => {
        alert("JS code copied!");
      },
      (err) => {
        console.error("Could not copy JS code:", err);
      }
    );
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant", // This property might not be supported in all browsers.
    });
  }, []);

  const category = () => {
    if (categoryId === "1") {
      return "Navigation";
    } else if (categoryId === "2") {
      return "Cards";
    } else if (categoryId === "3") {
      return "Main Pages";
    } else {
      return "other";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.87, opacity: 0, y: 50 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      viewport={{ offset: -100 }}
      key={id}
      className="design"
    >
      <div className="info">
        <h2>{name}</h2>
        <span>
          <p>{category()}</p>
          <p>by {author}</p>
          <p>{date}</p>
        </span>
      </div>
      <div
        ref={demoRef}
        className={`demo ${uniqueClassName}`}
        dangerouslySetInnerHTML={{
          __html: `<style>${scopedCss}; all: revert;</style>${htmlCodeWithNewLines}`,
        }}
      />
      <div className="code">
        <span>
          <button onClick={copyHtmlCode}>Copy Html</button>
          <button onClick={copyCssCode}>Copy CSS</button>
          {jsCode === "" ? "" : <button onClick={copyJsCode}>Copy JS</button>}
        </span>
        <button className="show" onClick={toggleCodeVisibility}>
          {isCodeVisible ? "Hide Code" : "Show Code"}
        </button>
        {isCodeVisible && (
          <div className="code-content">
            <h4>HTML Code:</h4>
            <pre>{htmlCode}</pre>
            <h4>CSS Code:</h4>
            <pre>{cssCode}</pre>
            {jsCode === "" ? (
              ""
            ) : (
              <>
                <h4>JS Code:</h4>
                <pre>{jsCode}</pre>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MainApp() {
  const [sortCriteria, setSortCriteria] = useState("idDesc");
  const [sortedDesigns, setSortedDesigns] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState(""); // Step 1: Add state for filter criteria
  const [isDesignPageVisible, setIsDesignPageVisible] = useState(false);

  // Step 2: Toggle function
  const toggleDesignPage = () => {
    setIsDesignPageVisible(!isDesignPageVisible);
  };

  useEffect(() => {
    const fetchAndSortDesigns = async () => {
      const fetchedDesigns = await fetchDesigns();
      sortAndSetDesigns(fetchedDesigns);
    };

    fetchAndSortDesigns();
  }, [sortCriteria]);

  const handleSortChange = (newSortCriteria) => {
    console.log("Changing sort criteria to:", newSortCriteria);
    setSortCriteria(newSortCriteria);
  };

  const handleFilterChange = (event) => {
    // Step 4: Update the filter criteria
    setFilterCriteria(event.target.value);
  };

  const sortFunctions = {
    idAsc: (a, b) =>
      parseInt(a["@attributes"].id) - parseInt(b["@attributes"].id),
    idDesc: (a, b) =>
      parseInt(b["@attributes"].id) - parseInt(a["@attributes"].id),
    // Add more sorting functions as needed
  };

  const sortAndSetDesigns = (designsToSort) => {
    console.log("Sorting with criteria:", sortCriteria);
    const sorted = [...designsToSort].sort(sortFunctions[sortCriteria]);
    console.log("Sorted designs:", sorted);
    setSortedDesigns(sorted);
  };

  useEffect(() => {
    const fetchAndSortDesigns = async () => {
      const fetchedDesigns = await fetchDesigns();
      // Directly sort the fetched designs without setting state
      const sortedDesigns = sortDesigns(fetchedDesigns, sortCriteria);
      setSortedDesigns(sortedDesigns); // Update sortedDesigns state
    };

    fetchAndSortDesigns();
  }, [sortCriteria]);

  // Adjusted sort function to return sorted designs instead of setting state
  const sortDesigns = (designsToSort, criteria) => {
    console.log("Sorting with criteria:", criteria);
    return [...designsToSort].sort(sortFunctions[criteria]);
  };

  // Implement filtering logic
  const filteredAndSortedDesigns = sortedDesigns.filter((design) => {
    if (filterCriteria === "") return true; // If no filter is selected, show all designs
    return design["@attributes"].categoryId === filterCriteria; // Filter by categoryId
  });

  // Use filteredAndSortedDesigns in the JSX to render the list of designs

  return (
    <div className="app">
      <LeftNav
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <div className="main-body">
        {filteredAndSortedDesigns.length > 0 ? (
          filteredAndSortedDesigns.map((design) => (
            <DesignItem key={design["@attributes"].id} design={design} />
          ))
        ) : (
          <motion.div
            initial={{ scale: 0.87, opacity: 0, y: 50 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            viewport={{ offset: -100 }}
          >
            <div className="info error">
              <h2>Oops! Nothing here</h2>
              <p>There are no designs that match the selected criteria.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MainApp;
