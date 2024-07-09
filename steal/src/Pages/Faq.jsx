import React, { useState } from "react";
import { motion, onViewportLeave } from "framer-motion";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="FAQ" className="faq">
      <div className="faq-wrapper">
        <motion.h2
          initial={{ x: "-300px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          FAQ
        </motion.h2>
        <motion.div
          initial={{ x: "-300px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="faq-item"
          onClick={() => toggleItem(0)}
        >
          <h3>How can I use this website?</h3>
          {activeIndex === 0 && (
            <motion.p
              initial={{ y: "-50px", opacity: 0, height: 0 }}
              whileInView={{ y: 0, opacity: 1, height: "auto" }}
              
            >
              Website is simple to use. Just click on the "Get Started" button
              and choose a design to copy.
            </motion.p>
          )}
        </motion.div>
        <motion.div
          initial={{ x: "300px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="faq-item"
          onClick={() => toggleItem(1)}
        >
          <h3>How can I share my designs?</h3>
          {activeIndex === 1 && (
            <motion.p
              initial={{ y: "-50px", opacity: 0, height: 0 }}
              whileInView={{ y: 0, opacity: 1, height: "auto" }}
              
            >
              You can share your designs by clicking on the "Add design" button
              and filling out the form. You can also add other designs by mentioning the author's name, category, source and the code.
            </motion.p>
          )}
        </motion.div>
        <motion.div
          initial={{ x: "-300px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="faq-item"
          onClick={() => toggleItem(2)}
        >
          <h3>How can I rate other designs?</h3>
          {activeIndex === 2 && (
            <motion.p
              initial={{ y: "-50px", opacity: 0, height: 0 }}
              whileInView={{ y: 0, opacity: 1, height: "auto" }}
              
            >
              You can rate other designs by clicking on the "Like" button on the
              design you like.
            </motion.p>
          )}
        </motion.div>
        <motion.div
          initial={{ x: "300px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3}}
          viewport={{ once: true }}
          className="faq-item"
          onClick={() => toggleItem(3)}
        >
          <h3>How can I report a problem? | Is it beta version?</h3>
          {activeIndex === 3 && (
            <motion.p
              initial={{ y: "-50px", opacity: 0, height: 0 }}
              whileInView={{ y: 0, opacity: 1, height: "auto" }}
              
            >
              Yes it is beta version of the app and keep in mind, that 1/2 of functions are not working. You can report a problem by clicking on the "Report a problem"
              link in the navigation bar and filling out the form.
            </motion.p>
          )}
        </motion.div>
        <motion.div
          initial={{ x: "-300px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="faq-item"
          onClick={() => toggleItem(4)}
        >
          <h3>Is regestration required?</h3>
          {activeIndex === 4 && (
            <motion.p
              initial={{ y: "-50px", opacity: 0, height: 0 }}
              whileInView={{ y: 0, opacity: 1, height: "auto" }}
              
            >
              No, registration is not required. You can use the app without registration. Unless you want to add your own designs.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQAccordion;
