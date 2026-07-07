import React, { useState } from "react";
import "../styles/ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1>Get in Touch</h1>
        <p>We typically respond within 24 business hours.</p>
      </div>

      <div className="input-group">
        <input 
          type="text" 
          name="first_name" 
          className="contact-input" 
          placeholder=" " 
          required 
          value={formData.first_name} 
          onChange={handleChange} 
        />
        <label className="input-label">First Name</label>
      </div>

      <div className="input-group">
        <input 
          type="text" 
          name="last_name" 
          className="contact-input" 
          placeholder=" " 
          required 
          value={formData.last_name} 
          onChange={handleChange} 
        />
        <label className="input-label">Last Name</label>
      </div>

      <div className="input-group">
        <input 
          type="email" 
          name="email" 
          className="contact-input" 
          placeholder=" " 
          required 
          value={formData.email} 
          onChange={handleChange} 
        />
        <label className="input-label">Email Address</label>
      </div>

      <div className="input-group">
        <textarea
          name="message"
          placeholder=" "
          className="contact-input contact-textarea"
          required
          value={formData.message}
          onChange={handleChange}
        />
        <label className="input-label">Write your message</label>
      </div>

      <button type="submit" className="submit-btn">
        <span>Send Message</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </form>
  );
}
