"use client";

import React, { useState } from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { TbLocation } from "react-icons/tb";
import { faqData } from "./faqData";
import { IoIosArrowRoundUp } from "react-icons/io";

export default function page() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="contact-container ">
      <div className="contact-heading">
        <h1>
          We're Happy to see you on this Page.Please tellu s what project you
          want to work on
        </h1>
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <div className="contact-ph">
            <MdOutlinePhoneInTalk />
            <p>+919876543219</p>
          </div>
          <div className="contact-mail">
            <SiGmail />
            <p>info@yourmail.com</p>
          </div>
          <div className="contact-address">
            <TbLocation />
            <p>Address: 123, ABC Street, XYZ City, India</p>
          </div>
        </div>
        <div className="contact-right">
          <div className="login-box">
            <p>Say Hello</p>
            <form>
              <div className="row">
                <div className="user-box">
                  <input required type="text" name="firstName" />
                  <label>First Name</label>
                </div>
                <div className="user-box">
                  <input required type="text" name="lastName" />
                  <label>Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="user-box">
                  <input required type="tel" name="phone" />
                  <label>Phone Number</label>
                </div>
                <div className="user-box">
                  <input required type="email" name="email" />
                  <label>Email</label>
                </div>
              </div>

              <div className="user-box">
                <select className="contact-service" name="service" required>
                  <option value="" disabled selected>
                    Select a Service
                  </option>
                  <option value="web-development">Web Development</option>
                  <option value="app-development">App Development</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                  <option value="digital-marketing">Digital Marketing</option>
                </select>
                <label></label>
              </div>
              <textarea
                className="contact-message"
                name="message"
                rows={5}
                required
              ></textarea>

              <button type="submit" className="submit-button">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="contact-social">
        <div className="contact-social-heading heading">
          <h1>Follow us on</h1>
        </div>
        <div className="contact-social-links">
          <div className="contact-social-link">
            <a href="">
              <img src="/insta.jpeg" alt="" />
            </a>
            <p className="contact-arrow-icon">
                <IoIosArrowRoundUp />
            </p>
          </div>
          <div className="contact-social-link">
            <a href="">
              <img src="/insta.jpeg" alt="" />
            </a>
          </div>
          <div className="contact-social-link">
            <a href="">
              <img src="/insta.jpeg" alt="" />
            </a>
          </div>
        </div>
        <div className="contact-faq">
          <div className="contact-faq-heading heading">
            <h1>FAQ</h1>
          </div>

          <div className="contact-faq-items">
            {Object.keys(faqData).map((category) => (
              <div
                key={category}
                className={`contact-faq-item ${
                  activeCategory === category ? "active" : ""
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
