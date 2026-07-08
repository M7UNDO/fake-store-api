import "../styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <header className="about-hero">
        <span className="about-subtitle">The Pavillion</span>
        <h1 className="about-title">About Us</h1>
        <p className="about-lead">
          Your modern digital marketplace, designed to make online shopping effortless and meaningful. 
          We focus on quality, convenience, and innovation.
        </p>
      </header>

      <hr className="editorial-divider" />

      <div className="about-grid">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            The Pavillion was developed as part of an Interactive Media project by Mfundo Dhlamini. 
            Yes, it's a “team” of one, but don't let the size fool you. Every feature, every design choice, 
            and every interaction reflects hours of coffee-fueled creativity, careful planning, and occasional 
            talking to myself. All in the name of crafting a seamless online shopping experience!
          </p>
        </section>

        <section className="about-section">
          <h2>Our Products</h2>
          <p>
            The Pavilion offers a carefully curated collection of products that enhance your lifestyle. 
            From the latest tech gadgets to stylish fashion pieces and home essentials, we make discovering 
            your next favorite item simple and fun.
          </p>
        </section>

        <section className="about-section wide-section">
          <h2>Why Choose Us</h2>
          <p>
            We are more than an online store, we are your shopping partner. Expect reliable delivery, 
            transparent product information, and responsive customer support. Every item is curated for quality, 
            style, and value, ensuring a shopping experience you can trust. 
          </p>
          <p>
            At The Pavillion, your satisfaction is our priority. We listen, we adapt, and we constantly 
            innovate to provide products and services that reflect your needs and preferences.
          </p>
        </section>
      </div>
    </div>
  );
}