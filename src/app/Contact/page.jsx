"use client";

import React, { useState } from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { TbLocation } from "react-icons/tb";
import { faqData } from "./faqData";
import { IoIosArrowRoundUp } from "react-icons/io";
import ContactForm from "../Components/ContactForm";

export default function page() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="contact-container">
      <div className="contact-heading">
        <h1>
          Hey there! We’d love to know what you’re working on. Drop your project details below :)
        </h1>
      </div>
      <ContactForm />
      <div className="contact-social">
        
        <div className="contact-faq">
          <div className="contact-faq-heading heading">
            <h1>FAQ</h1>
          </div>

          <div className="contact-faq-items">
            {Object.keys(faqData).map((category) => (
              <div
                key={category}
                className={`contact-faq-item ${activeCategory === category ? "active" : ""
                  }`}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
              >
                {category}
              </div>
            ))}
          </div>

          <div className="contact-faq-content">
            {faqData[activeCategory].map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="faq-block">
                  <div
                    className="faq-question"
                    onClick={() => toggleAnswer(index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon">{isOpen ? "➖" : "➕"}</span>
                  </div>
                  <div className={`faq-answer-wrapper ${isOpen ? "open" : ""}`}>
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        style={{ width: "95%", height: "450px", margin: "30px auto" }}
        className="contact-map"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.376838302901!2d55.96197197556645!3d25.525821518311393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5c59c49b6d7a5%3A0xfbe4d0272d2e9c11!2sAl%20Shuhada&#39;%20Rd%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1752645145585!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
