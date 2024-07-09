import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo-stealer.png";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

function Header({ children, to, navigation }) {
  const [currentSearchText, setCurrentSearchText] = useState("");

  useEffect(() => {
    const searchOptions = [
      "designs",
      "categories",
      "tags",
      "users",
    ];
    const changeSearchText = () => {
      const randomIndex = Math.floor(Math.random() * searchOptions.length);
      setCurrentSearchText(searchOptions[randomIndex]);
    };

    changeSearchText(); // Initial change on component mount
    const intervalId = setInterval(changeSearchText, 2500); // Change every 0.5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <header className="main-page-header">
      <Link to="/">
        <img src={logo} alt="" srcSet="" />
      </Link>
      <nav>
        <ul>
          {navigation ? (
            <ul className="header-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add">Add design</Link>
              </li>
              <li>
                <Link to="https://gribanica.eu/#Contacts">
                  Report a problem
                </Link>
              </li>
              <>
                <span>
                  <input
                    className="search"
                    placeholder={`Search ${currentSearchText}`}
                    type="text"
                  />
                </span>
              </>
            </ul>
          ) : (
            <>
              <li>
                <span id="version">3.3.0 beta</span>
              </li>
              <ul className="header-links">
                <li><a href="#FAQ">FAQ</a></li>
              </ul>
            </>
          )}

          <li>
            <MotionLink to={to}>{children}</MotionLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
