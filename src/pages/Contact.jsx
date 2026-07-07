import React from "react";
import ContactForm from "../components/ContactForm";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-details">
        <div className="details-header">
          <span className="subtitle">The Pavilion</span>
          <h2>Contact Information</h2>
          <p>Reach out to our team for expert support with orders, products, or your shopping experience.</p>
        </div>

        <div className="contact-lines-wrapper">
          <div className="contact-line">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
            </div>
            <div className="contact-info-text">
              <span>Call Us</span>
              <a href="tel:+27829977500">+27 82 997 7500</a>
            </div>
          </div>

          <div className="contact-line">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
            </div>
            <div className="contact-info-text">
              <span>Email Us</span>
              <a href="mailto:dhlaminimfundo1@gmail.com">dhlaminimfundo1@gmail.com</a>
            </div>
          </div>

          <div className="contact-line">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div className="contact-info-text">
              <span>Location</span>
              <p>Johannesburg, South Africa</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form-container">
        <ContactForm />
      </div>
    </div>
  );
}
