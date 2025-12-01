import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DirectoryStartupTemplate.css';
import { getStartupById } from '../services/startupsService';
import LoadingSpinner from '../components/LoadingSpinner';

const DirectoryStartupTemplate = () => {
    const { slug } = useParams();
    const [startup, setStartup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = 'Startup | SCALE';
        fetchStartup();
    }, [slug]);

    // Static startup data (matching Directory.jsx)
    const staticStartupsData = [
        { id: 1, name: "TechNova Solutions", type: "startup", location: "Quezon City", industry: "Artificial Intelligence", image: null, slug: "technova-solutions", description: "AI-powered business automation platform for enterprises looking to streamline their operations and increase efficiency through intelligent workflow automation.", stage: "Series A", incubator: "DOST Technology Business Incubator", social: { facebook: { link: "https://facebook.com/technova", label: "TechNova Solutions" }, email: { link: "info@technova.ph", label: "Contact TechNova" } } },
        { id: 2, name: "EcoTech Manila", type: "startup", location: "Manila", industry: "Clean Technology", image: null, slug: "ecotech-manila", description: "Sustainable energy solutions for urban environments, focusing on solar power integration and smart grid technologies for residential and commercial buildings.", stage: "Seed", incubator: "UP Technology Business Incubator", social: { x: { link: "https://twitter.com/ecotech", label: "@EcoTechMNL" }, instagram: { link: "https://instagram.com/ecotechmanila", label: "@EcoTechManila" } } },
        { id: 3, name: "HealthLink PH", type: "startup", location: "Makati", industry: "Healthcare Technology", image: null, slug: "healthlink-ph", description: "Telemedicine platform connecting patients with healthcare providers across the Philippines, making quality healthcare accessible to remote communities.", stage: "Series B", incubator: "Ateneo Innovation Center", social: { instagram: { link: "https://instagram.com/healthlink", label: "@HealthLinkPH" }, facebook: { link: "https://facebook.com/healthlinkph", label: "HealthLink Philippines" } } },
        { id: 4, name: "AgriSmart Systems", type: "startup", location: "Pasig", industry: "Agriculture Technology", image: null, slug: "agrismart-systems", description: "IoT solutions for smart farming and crop monitoring, helping Filipino farmers increase yield and reduce costs through precision agriculture technology.", stage: "Pre-Seed", incubator: "UPLB Technology Business Incubator", social: { email: { link: "info@agrismart.ph", label: "Contact AgriSmart" }, x: { link: "https://twitter.com/agrismart", label: "@AgriSmartPH" } } },
        { id: 5, name: "EduTech Pro", type: "startup", location: "Taguig", industry: "Education Technology", image: null, slug: "edutech-pro", description: "Digital learning platform for K-12 education, providing interactive educational content and learning management systems for Philippine schools.", stage: "Seed", incubator: "De La Salle Innovation Center", social: { facebook: { link: "https://facebook.com/edutech", label: "EduTech Pro" }, email: { link: "hello@edutechpro.ph", label: "EduTech Team" } } },
        { id: 6, name: "FinanceFlow", type: "startup", location: "BGC Taguig", industry: "Financial Technology", image: null, slug: "financeflow", description: "Digital banking solutions for SMEs, offering streamlined financial services including digital payments, lending, and business analytics for small businesses.", stage: "Series A", incubator: "DOST Technology Business Incubator", social: { x: { link: "https://twitter.com/financeflow", label: "@FinanceFlowPH" }, instagram: { link: "https://instagram.com/financeflow", label: "@FinanceFlowPH" } } },
        { id: 7, name: "LogiTrack Solutions", type: "startup", location: "Paranaque", industry: "Logistics", image: null, slug: "logitrack-solutions", description: "Supply chain management and tracking platform, revolutionizing logistics operations with real-time tracking and automated inventory management systems.", stage: "Seed", incubator: "UP Technology Business Incubator", social: { instagram: { link: "https://instagram.com/logitrack", label: "@LogiTrackPH" }, email: { link: "support@logitrack.ph", label: "LogiTrack Support" } } },
        { id: 8, name: "GameDev Studio PH", type: "startup", location: "Quezon City", industry: "Gaming", image: null, slug: "gamedev-studio-ph", description: "Mobile game development and publishing company creating engaging Filipino-themed games and providing game development services for international clients.", stage: "Pre-Seed", incubator: "Ateneo Innovation Center", social: { email: { link: "hello@gamedevph.com", label: "GameDev Studio" }, facebook: { link: "https://facebook.com/gamedevph", label: "GameDev Studio PH" } } },
        { id: 9, name: "CloudSecure PH", type: "startup", location: "Manila", industry: "Cybersecurity", image: null, slug: "cloudsecure-ph", description: "Cloud security and data protection services, providing comprehensive cybersecurity solutions for businesses transitioning to cloud-based infrastructure.", stage: "Series A", incubator: "UPLB Technology Business Incubator", social: { facebook: { link: "https://facebook.com/cloudsecure", label: "CloudSecure PH" }, x: { link: "https://twitter.com/cloudsecure", label: "@CloudSecurePH" } } },
        { id: 10, name: "FoodTech Innovations", type: "startup", location: "Makati", industry: "Food Technology", image: null, slug: "foodtech-innovations", description: "Food delivery optimization and kitchen automation solutions, helping restaurants improve efficiency and customer satisfaction through smart technology.", stage: "Seed", incubator: "De La Salle Innovation Center", social: { x: { link: "https://twitter.com/foodtech", label: "@FoodTechPH" }, email: { link: "info@foodtech.ph", label: "FoodTech Team" } } }
    ];

    const fetchStartup = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Find startup in static data by slug
            const foundStartup = staticStartupsData.find(startup => startup.slug === slug);
            
            if (foundStartup) {
                setStartup(foundStartup);
                document.title = `${foundStartup.name} | SCALE`;
            } else {
                setError('Startup not found');
            }
        } catch (error) {
            console.error('Error loading startup:', error);
            setError('Failed to load startup details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="startup-template-page">
                <section className="StartupTemplate-Hero">
                    <div style={{ padding: '100px', textAlign: 'center' }}>
                        <LoadingSpinner message="Loading startup details..." />
                    </div>
                </section>
            </div>
        );
    }

    if (error || !startup) {
        return (
            <div className="startup-template-page">
                <section className="StartupTemplate-Hero">
                    <div className="startup-template-container">
                        <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
                            {error || 'Startup not found'}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Link to="/directory" style={{ color: '#249CCC', textDecoration: 'none', fontSize: '18px' }}>
                                ← Back to Directory
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="startup-template-page">
            <section className="StartupTemplate-Hero">
                <div className="startup-template-container">
                    {/* Breadcrumb Navigation */}
                    <div className="breadcrumb">
                        <Link to="/directory" className="breadcrumb-link">Startup Network</Link>
                        <span className="breadcrumb-separator">&gt;</span>
                        <span className="breadcrumb-current">{startup.name}</span>
                    </div>

                    {/* Main Content */}
                    <div className="startup-template-content">
                        {/* Left Side - Text Details */}
                        <div className="startup-info-section">
                            <h1 className="startup-title">{startup.name}</h1>
                            
                            <div className="startup-description">
                                <p><strong>Description:</strong> {startup.description}</p>
                            </div>

                            <div className="startup-details">
                                {startup.location && <p><strong>Location:</strong> {startup.location}</p>}
                                {startup.incubator && <p><strong>Incubator:</strong> {startup.incubator}</p>}
                                {startup.industry && <p><strong>Industry:</strong> {startup.industry}</p>}
                                {startup.stage && <p><strong>Stage:</strong> {startup.stage}</p>}
                            </div>

                            <div className="startup-social">
                                {startup.social?.facebook?.link && (
                                    <a href={startup.social.facebook.link} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        {startup.social.facebook.label}
                                    </a>
                                )}
                                {startup.social?.x?.link && (
                                    <a href={startup.social.x.link} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                        </svg>
                                        {startup.social.x.label}
                                    </a>
                                )}
                                {startup.social?.instagram?.link && (
                                    <a href={startup.social.instagram.link} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                        {startup.social.instagram.label}
                                    </a>
                                )}
                                {startup.social?.email?.link && (
                                    <a href={startup.social.email.link.includes('@') ? `mailto:${startup.social.email.link}` : startup.social.email.link} className="social-link email">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        {startup.social.email.label}
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="startup-image-section">
                            <div className="startup-main-image" style={startup.image ? {backgroundImage: `url(${startup.image})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>
                                {!startup.image && <span>Image Placeholder</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DirectoryStartupTemplate;
