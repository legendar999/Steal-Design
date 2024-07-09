// Import statements should be at the top of the file
import React, { useState } from "react";
import axios from "axios"; // for making API requests
import { motion } from "framer-motion";

const AddDesignForm = ({ isDesignPageVisible, toggleDesignPage }) => {
  console.log("AddDesignForm -> isDesignPageVisible", isDesignPageVisible);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    category: "",
    html: "",
    css: "",
    js: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/designs", formData);
      if (response.status === 200) {
        alert("Design added successfully");
      } else {
        alert("Failed to add design");
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      alert("Failed to add design. Error: " + error.message);
    }
  };

  return (
    <div className={`add-design-page`}>
      <h2>Add Design</h2>
      <div className="add-design-form-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name of design"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Author"
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="1">Navigation</option>
            <option value="2">Cards</option>
            <option value="3">Main Pages</option>
            <option value="4">Other</option>
          </select>
          <textarea
            placeholder="HTML Code"
            id="html"
            name="html"
            value={formData.html}
            onChange={handleChange}
            required
          ></textarea>
          <textarea
            placeholder="CSS Code"
            id="css"
            name="css"
            value={formData.css}
            onChange={handleChange}
            required
          ></textarea>
          <textarea
            placeholder="JavaScript Code"
            id="js"
            name="js"
            value={formData.js}
            onChange={handleChange}
            required
          ></textarea>
          <motion.button whileTap={{ scale: 0.9 }} type="submit">
            Add Design
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default AddDesignForm;
