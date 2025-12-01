import React, { useState, useEffect } from 'react';
import './ContactUs.css';
import cta2 from '../assests/images/Contact-Us/ContactUs-Hero.png';
import { sendContactForm, validateContactForm } from '../services/contactService';
import SEO from '../components/SEO';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'inquiry1',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    
    // Set page title
    useEffect(() => {
        document.title = 'Contact Us | SCALE';
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);
        
        // Combine first and last name
        const contactData = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            subject: formData.subject,
            message: formData.message
        };
        
        // Validate form
        const validation = validateContactForm(contactData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }
        
        try {
            setSubmitting(true);
            const result = await sendContactForm(contactData);
            
            if (result.success) {
                setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: 'inquiry1',
                    message: ''
                });
            } else {
                setSubmitStatus({ type: 'error', message: result.message || 'Failed to send message. Please try again.' });
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="contact-us-page">
            <SEO
                title="Contact Us | SCALE NCR - Get in Touch"
                description="Contact SCALE NCR for inquiries about startup programs, incubation services, and entrepreneurship support. Reach out to our team at scale.ncr.notifications@gmail.com"
                keywords="contact SCALE NCR, startup inquiries, business incubator contact, entrepreneurship support, TBI contact"
                canonicalUrl="https://www.scalencr.org/contact-us"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact SCALE NCR",
                    "description": "Get in touch with SCALE NCR",
                    "url": "https://www.scalencr.org/contact-us"
                }}
            />

            <section className="ContactUs-Hero">
                <div className="ContactUs-Hero-inner">
                    <div className="ContactUs-Hero-left">
                        <div className="ContactUs-Hero-image-wrapper" aria-hidden="true">
                            <img src={cta2} alt="Contact Us" className="ContactUs-Hero-image" loading="lazy" />
                            <div className="ContactUs-Info-Overlay">
                                <div className="ContactUs-Info-Item">
                                    <svg className="ContactUs-Icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                    <span>SCALE NCR, Technology Business Incubator</span>
                                </div>
                                <div className="ContactUs-Info-Item">
                                    <svg className="ContactUs-Icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                    </svg>
                                    <span>+63 (02) 123-4567</span>
                                </div>
                                <div className="ContactUs-Info-Item">
                                    <svg className="ContactUs-Icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                    <span>scale.ncr.notifications@gmail.com</span>
                                </div>
                                <div className="ContactUs-Social-Icons">
                                    <a href="#" className="ContactUs-Social-Link">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="ContactUs-Social-Link">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="ContactUs-Social-Link">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ContactUs-Hero-right">
                        <div className="ContactUs-Form">
                            <h2 className="ContactUs-Form-Title">CONTACT US</h2>
                            
                            {submitStatus && (
                                <div style={{ 
                                    padding: '15px', 
                                    marginBottom: '20px', 
                                    borderRadius: '5px',
                                    backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
                                    color: submitStatus.type === 'success' ? '#155724' : '#721c24',
                                    border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                                }}>
                                    {submitStatus.message}
                                </div>
                            )}
                            
                            <form className="ContactUs-Form-Container" onSubmit={handleSubmit}>
                                <div className="ContactUs-Form-Row">
                                    <div className="ContactUs-Form-Group">
                                        <label className="ContactUs-Form-Label">First Name</label>
                                        <input 
                                            type="text" 
                                            name="firstName"
                                            className="ContactUs-Form-Input" 
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="ContactUs-Form-Group">
                                        <label className="ContactUs-Form-Label">Last Name</label>
                                        <input 
                                            type="text" 
                                            name="lastName"
                                            className="ContactUs-Form-Input" 
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="ContactUs-Form-Row">
                                    <div className="ContactUs-Form-Group">
                                        <label className="ContactUs-Form-Label">Email</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            className="ContactUs-Form-Input" 
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.email && <span style={{ color: 'red', fontSize: '0.85em' }}>{errors.email}</span>}
                                    </div>
                                    <div className="ContactUs-Form-Group">
                                        <label className="ContactUs-Form-Label">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            className="ContactUs-Form-Input" 
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                
                                <div className="ContactUs-Form-Group">
                                    <label className="ContactUs-Form-Label">Select Subject?</label>
                                    <div className="ContactUs-Form-Radio-Group">
                                        <label className="ContactUs-Radio-Label">
                                            <input 
                                                type="radio" 
                                                name="subject" 
                                                value="General Inquiry" 
                                                checked={formData.subject === 'General Inquiry'}
                                                onChange={handleChange}
                                            />
                                            <span className="ContactUs-Radio-Custom"></span>
                                            <span>General Inquiry</span>
                                        </label>
                                        <label className="ContactUs-Radio-Label">
                                            <input 
                                                type="radio" 
                                                name="subject" 
                                                value="Partnership" 
                                                checked={formData.subject === 'Partnership'}
                                                onChange={handleChange}
                                            />
                                            <span className="ContactUs-Radio-Custom"></span>
                                            <span>Partnership</span>
                                        </label>
                                        <label className="ContactUs-Radio-Label">
                                            <input 
                                                type="radio" 
                                                name="subject" 
                                                value="Support" 
                                                checked={formData.subject === 'Support'}
                                                onChange={handleChange}
                                            />
                                            <span className="ContactUs-Radio-Custom"></span>
                                            <span>Support</span>
                                        </label>
                                        <label className="ContactUs-Radio-Label">
                                            <input 
                                                type="radio" 
                                                name="subject" 
                                                value="Other" 
                                                checked={formData.subject === 'Other'}
                                                onChange={handleChange}
                                            />
                                            <span className="ContactUs-Radio-Custom"></span>
                                            <span>Other</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="ContactUs-Form-Group">
                                    <label className="ContactUs-Form-Label">Message</label>
                                    <textarea 
                                        name="message"
                                        className="ContactUs-Form-Textarea" 
                                        placeholder="Write your message.." 
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                    {errors.message && <span style={{ color: 'red', fontSize: '0.85em' }}>{errors.message}</span>}
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="ContactUs-Submit-Button"
                                    disabled={submitting}
                                >
                                    {submitting ? 'sending...' : 'send message'}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>


        </div>
    );
};

export default ContactUs;
