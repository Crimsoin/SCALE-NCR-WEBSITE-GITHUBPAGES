import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';
import logo from '../assests/images/Header/Logo.png'; // adjust path if your folder is "assets"
import { API_BASE_URL } from '../services/apiConfig';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/newsletter-subscribe.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Successfully subscribed to newsletter!' });
        setEmail('');
        // Auto-hide success message after 5 seconds
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">

        {isHomePage && (
          <div className="footer-newsletter">
            <h1 className="Subscribe-Newsletter-Title">JOIN OUR NEWSLETTER</h1>
            {message && (
              <div style={{
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                color: message.type === 'success' ? '#155724' : '#721c24',
                border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {message.text}
              </div>
            )}
            <form className="Subscribe-Newsletter-Form" onSubmit={handleNewsletterSubmit}>
              <div className="Subscribe-Newsletter-Field">
                <input 
                  id="newsletter-email" 
                  name="newsletter-email" 
                  type="email" 
                  placeholder="enter your email. . ." 
                  className="Subscribe-Newsletter-Input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  required 
                />
                <button 
                  type="submit" 
                  className="Subscribe-Newsletter-Button"
                  disabled={submitting}
                >
                  {submitting ? 'subscribing...' : 'subscribe'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="SCALE Logo" />
          </div>

          <div className="footer-links-container">
            <div className="footer-section">
              <h3 className="footer-section-title">QUICK LINKS</h3>
              <nav className="footer-links">
                <a href="/">HOME</a>
                <a href="/about">ABOUT</a>
                <a href="/directory">STARTUP DIRECTORY</a>
                <a href="/events">NEWS & EVENTS</a>
                <a href="/contact">CONTACT US</a>
              </nav>
            </div>

            <div className="footer-section">
              <h3 className="footer-section-title">CONNECT</h3>
              <div className="footer-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FACEBOOK</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
              </div>
            </div>

            <div className="footer-section">
              <h3 className="footer-section-title">LOCATION</h3>
              <div className="footer-address">
                <p>PHYSICAL ADDRESS</p>
                <p>CITY, PROVINCE</p>
                <p>COUNTRY</p>
              </div>
            </div>
          </div>
        </div>



        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} SCALE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;