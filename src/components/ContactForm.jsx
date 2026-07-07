import {useState} from "react";
import ButtonSpinner from "./ButtonSpinner";
import "../styles/ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({first_name: "", last_name: "", email: "", message: ""});
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  const statusClass = result.toLowerCase().includes("success")
    ? "success"
    : result.toLowerCase().includes("error") || result.toLowerCase().includes("wrong")
      ? "error"
      : "info";

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const validateForm = (formData) => {
    const validationErrors = {};

    const firstName = formData.get("first_name")?.trim();
    const lastName = formData.get("last_name")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || firstName.length < 2) {
      validationErrors.first_name = "First name must be at least 2 characters.";
    }

    if (!lastName || lastName.length < 2) {
      validationErrors.last_name = "Last name must be at least 2 characters.";
    }

    if (!email || !emailRegex.test(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!message || message.length < 20) {
      validationErrors.message = "Message must be at least 20 characters.";
    } else if (message.length > 1500) {
      validationErrors.message = "Message must be less than 1500 characters.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const validationErrors = validateForm(formData);

    setErrors(validationErrors);
    setResult("");

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (data.success) {
        setResult("Message sent successfully.");
        setErrors({});

        event.target.reset();

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          message: "",
        });
      } else {
        setResult("Something went wrong. Please try again.");
        console.log(data);
      }
    } catch (error) {
      setResult("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit} noValidate>
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
          required
        />
        <label className="input-label">First Name</label>
        {errors.first_name && <span className="error-message">{errors.first_name}</span>}
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
          required
        />
        <label className="input-label">Last Name</label>
        {errors.last_name && <span className="error-message">{errors.last_name}</span>}
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
          required
        />
        <label className="input-label">Email Address</label>
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="input-group">
        <textarea
          name="message"
          placeholder=" "
          className="contact-input contact-textarea"
          required
          value={formData.message}
          onChange={handleChange}
          required
        />
        <label className="input-label">Write your message</label>
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <ButtonSpinner />
            <span>Sending...</span>
          </>
        ) : (
          <span>Send Message</span>
        )}
      </button>
      {result && <span className={`form-status ${statusClass}`}>{result}</span>}
    </form>
  );
}
