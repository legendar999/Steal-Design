import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './Images/logo.png';

// Modified fetchAndLogDesigns to just fetch and return the designs
const fetchDesigns = async () => {
    try {
        const response = await fetch('/designs.json');
        const data = await response.json();
        return data.designs.design; // Return the designs
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return empty array in case of error
    }
};

function DesignItem({ design }) {
  const { name, id, category } = design["@attributes"];
  const author = design.author["#text"];
  const date = design.date["#text"];
  const htmlCode = design.htmlCode["#text"];
  const cssCode = design.cssCode["#text"];
  const jsCode = design.jsCode["#text"];
  const uniqueClassName = `design-${id}`;
  const demoRef = React.useRef(null);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.text = `(function() { try { ${jsCode} } catch(error) { console.error('Error executing JS code:', error); } })();`;
    demoRef.current.appendChild(script);
  }, [jsCode]);

  const scopedCss = `.${uniqueClassName} { ${cssCode} }`;

  // Function to copy HTML code
  const copyHtmlCode = () => {
    navigator.clipboard.writeText(htmlCode).then(() => {
      alert('HTML code copied!');
    }, (err) => {
      console.error('Could not copy HTML code:', err);
    });
  };

  // Function to copy CSS code
  const copyCssCode = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      alert('CSS code copied!');
    }, (err) => {
      console.error('Could not copy CSS code:', err);
    });
  };

  // Function to copy JS code
  const copyJsCode = () => {
    navigator.clipboard.writeText(jsCode).then(() => {
      alert('JS code copied!');
    }, (err) => {
      console.error('Could not copy JS code:', err);
    });
  };

  return (
    <div key={id} className='design'>
      <div className='info'>
        <span>
          <h2>{name}</h2>
          <p>{category}</p>
        </span>
        <p>{author}</p>
        <p>{date}</p>
      </div>
      <div ref={demoRef} className={`demo ${uniqueClassName}`} dangerouslySetInnerHTML={{ __html: `<style>${scopedCss}</style>${htmlCode}` }} />
      <div className='code'>
        <span>
          <button onClick={copyHtmlCode}>Copy Html</button>
          <button onClick={copyCssCode}>Copy CSS</button>
          <button onClick={copyJsCode}>Copy JS</button>
        </span>
        <button>Show Code</button>
      </div>
    </div>
  );
}

// Modify DesignList to use DesignItem
function DesignList({ designs }) {
  return (
    <>
      {designs.map((design) => (
        <DesignItem key={design["@attributes"].id} design={design} />
      ))}
    </>
  );
}

function App() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    fetchDesigns().then(setDesigns);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Steal my designs</h1>
          <h3 className='version' id='version'>beta 1.0.0.</h3>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </nav>
      </header>
      <DesignList designs={designs} />
    </div>
  );
}

export default App;