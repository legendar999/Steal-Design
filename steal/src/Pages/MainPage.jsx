import React, { useEffect, useState } from "react"; // Import React and useEffect
import { Link, Route } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../Images/logo-black.png";
import miniApp from "../Images/design.gribanica.eu_stealer.png";
import thumbsup from "../Images/like.png";
import smiley from "../Images/smiley.png";
import upload from "../Images/upload.png";
import mouse from "../Images/mouse.png";
import { motion } from "framer-motion";
import FAQAccordion from "./Faq";

function MainPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <section className="main">
        <HashLink className="scroll-down" to="#benefits">
          <img src={mouse} alt="Scroll down" />
        </HashLink>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{ duration: 0.1, bounce: 0.8, delay: 0.15 }} // Increased bounce value
          className="glass"
        >
          <div className="glass-text">
            <h1>Take your designs to the next level!</h1>
            <h2>
              With <span>Design Stealer by Gribanica</span>, you are guaranteed
              to be on the top level of UI or UX design.
            </h2>
            <Link to="/stealer">Get Started</Link>
          </div>
        </motion.div>
      </section>
      <motion.section className="benefits" id="benefits">
        <motion.div className="text">
          <motion.h2
            initial={{ x: "-300px", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Simplicity is our key.
          </motion.h2>
          <motion.h3
            initial={{ x: "-300px", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Select. Copy. Paste.
          </motion.h3>
        </motion.div>
        <motion.div
          initial={{ x: "300px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="mini-app"
        >
          <img src={miniApp} alt="Mini app demonstration" />
        </motion.div>
      </motion.section>
      <section className="benefits-designers" id="benefits-d">
        <div className="text">
          <motion.h2
            initial={{ x: "-300px", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Are you already a designer?
          </motion.h2>
          <motion.h3
            initial={{ x: "-300px", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Upload your code and let others{" "}
            <span>copy, share, rate & more!</span>
          </motion.h3>
        </div>
        <motion.div
          initial={{ y: "-100px", opacity: 0, scale: 0.5 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, offset: 0.8 }}
          className="card-list"
        >
          <motion.div
            className="card"
            whileHover={{ scale: 1.1 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0, bounce: 0.5 }}
            whileTap={{ scale: 0.7 }}
          >
            <h3>Add your designs</h3>
            <motion.img src={upload} alt="Upload designs" />
          </motion.div>
          <motion.div
            className="card"
            whileHover={{ scale: 1.1 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0, bounce: 0.5 }}
            whileTap={{ scale: 0.7 }}
          >
            <h3>Collect likes</h3>
            <img src={thumbsup} alt="Collect likes" />
          </motion.div>
          <motion.div
            className="card"
            whileHover={{ scale: 1.1 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0, bounce: 0.5 }}
            whileTap={{ scale: 0.7 }}
          >
            <h3>Help other people</h3>
            <img src={smiley} alt="Help others" />
          </motion.div>
        </motion.div>
        <div className="btn-wrapper">
          <Link to="/stealer">Get Started</Link>
        </div>
      </section>
      <FAQAccordion/>
    </>
  );
}

export default MainPage;
