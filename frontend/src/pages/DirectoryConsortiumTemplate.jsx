import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DirectoryConsortiumTemplate.css';
import { getStartupById } from '../services/startupsService';
import LoadingSpinner from '../components/LoadingSpinner';

const DirectoryConsortiumTemplate = () => {
    const { slug } = useParams();
    const [consortium, setConsortium] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = 'Consortium Member | SCALE';
        fetchConsortium();
    }, [slug]);

    // Static consortium data (matching Directory.jsx)
    const staticConsortiumData = [
        { id: 25, name: "Metro Manila Development Authority", type: "consortium", location: "Manila", industry: "Government", image: null, slug: "mmda", description: "Metropolitan Manila's urban planning and development authority, responsible for traffic management, flood control, and urban development coordination across the National Capital Region.", stage: "Government Agency", incubator: "DOST Technology Business Incubator", social: { facebook: { link: "https://facebook.com/mmda", label: "MMDA Official" }, x: { link: "https://twitter.com/MMDA", label: "@MMDA" } } },
        { id: 26, name: "Philippine Chamber of Commerce", type: "consortium", location: "Makati", industry: "Business Association", image: null, slug: "pcc", description: "Leading business organization promoting trade and commerce in the Philippines, supporting entrepreneurs and businesses through advocacy, networking, and capacity building programs.", stage: "Established", incubator: "UP Technology Business Incubator", social: { x: { link: "https://twitter.com/pcc", label: "@PCCPhilippines" }, email: { link: "info@philippinechamber.com", label: "PCC Contact" } } },
        { id: 27, name: "Ayala Corporation", type: "consortium", location: "BGC Taguig", industry: "Conglomerate", image: null, slug: "ayala-corp", description: "Diversified business conglomerate with investments in real estate, telecommunications, banking, automotive, electronics, and water infrastructure, driving sustainable development across the Philippines.", stage: "Public Corporation", incubator: "Ateneo Innovation Center", social: { instagram: { link: "https://instagram.com/ayalacorp", label: "@AyalaCorporation" }, facebook: { link: "https://facebook.com/ayalacorporation", label: "Ayala Corporation" } } },
        { id: 28, name: "Smart Communications", type: "consortium", location: "Quezon City", industry: "Telecommunications", image: null, slug: "smart-communications", description: "Leading telecommunications and digital services provider in the Philippines, offering mobile, fixed-line, and broadband services with extensive network coverage nationwide.", stage: "Public Corporation", incubator: "UPLB Technology Business Incubator", social: { email: { link: "info@smart.com.ph", label: "Smart Communications" }, instagram: { link: "https://instagram.com/smartcommunications", label: "@SmartCommunications" } } },
        { id: 29, name: "Bank of the Philippine Islands", type: "consortium", location: "Makati", industry: "Banking", image: null, slug: "bpi", description: "Universal bank providing comprehensive financial services including retail banking, corporate banking, investment banking, and asset management across the Philippines and internationally.", stage: "Public Corporation", incubator: "De La Salle Innovation Center", social: { facebook: { link: "https://facebook.com/bpi", label: "BPI Official" }, x: { link: "https://twitter.com/bpi", label: "@BPI" } } },
        { id: 30, name: "Philippine Long Distance Telephone", type: "consortium", location: "Manila", industry: "Telecommunications", image: null, slug: "pldt", description: "Integrated telecommunications company providing fixed-line, wireless, and digital services, connecting Filipino communities through innovative communication solutions.", stage: "Public Corporation", incubator: "DOST Technology Business Incubator", social: { x: { link: "https://twitter.com/pldt", label: "@PLDTHome" }, email: { link: "customercare@pldt.com.ph", label: "PLDT Customer Care" } } },
        { id: 31, name: "Jollibee Foods Corporation", type: "consortium", location: "Pasig", industry: "Food & Beverage", image: null, slug: "jollibee", description: "Global food service company operating multiple restaurant brands, bringing joy through great-tasting food and creating memorable dining experiences worldwide.", stage: "Public Corporation", incubator: "UP Technology Business Incubator", social: { instagram: { link: "https://instagram.com/jollibee", label: "@Jollibee" }, facebook: { link: "https://facebook.com/JollibeePhilippines", label: "Jollibee Philippines" } } },
        { id: 32, name: "SM Investments Corporation", type: "consortium", location: "Taguig", industry: "Investment Holding", image: null, slug: "sm-investments", description: "Leading investment holding and management company with diverse portfolio including retail, banking, real estate, and hospitality businesses across Asia.", stage: "Public Corporation", incubator: "Ateneo Innovation Center", social: { email: { link: "investor@sminvestments.com", label: "SM Investments" }, x: { link: "https://twitter.com/sminvestments", label: "@SMInvestments" } } },
        { id: 33, name: "Globe Telecom", type: "consortium", location: "BGC Taguig", industry: "Telecommunications", image: null, slug: "globe-telecom", description: "Digital solutions platform and telecommunications provider offering mobile, broadband, and digital services, enabling digital transformation across the Philippines.", stage: "Public Corporation", incubator: "UPLB Technology Business Incubator", social: { facebook: { link: "https://facebook.com/globe", label: "Globe Official" }, instagram: { link: "https://instagram.com/globeph", label: "@GlobePH" } } },
        { id: 34, name: "Aboitiz Equity Ventures", type: "consortium", location: "Paranaque", industry: "Investment Holding", image: null, slug: "aev", description: "Strategic business investments across power, banking, food, real estate, and infrastructure sectors, driving sustainable development and economic growth in the Philippines.", stage: "Public Corporation", incubator: "De La Salle Innovation Center", social: { x: { link: "https://twitter.com/aboitiz", label: "@AboitizGroup" }, email: { link: "info@aboitiz.com", label: "Aboitiz Group" } } }
    ];

    const fetchConsortium = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Find consortium in static data by slug
            const foundConsortium = staticConsortiumData.find(consortium => consortium.slug === slug);
            
            if (foundConsortium) {
                setConsortium(foundConsortium);
                document.title = `${foundConsortium.name} | SCALE`;
            } else {
                setError('Consortium member not found');
            }
        } catch (error) {
            console.error('Error loading consortium:', error);
            setError('Failed to load consortium details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="consortium-template-page">
                <section className="ConsortiumTemplate-Hero">
                    <div style={{ padding: '100px', textAlign: 'center' }}>
                        <LoadingSpinner message="Loading consortium details..." />
                    </div>
                </section>
            </div>
        );
    }

    if (error || !consortium) {
        return (
            <div className="consortium-template-page">
                <section className="ConsortiumTemplate-Hero">
                    <div className="consortium-template-container">
                        <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
                            {error || 'Consortium member not found'}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Link to="/directory" style={{ color: '#EF7D22', textDecoration: 'none', fontSize: '18px' }}>
                                ← Back to Directory
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="consortium-template-page">
            <section className="ConsortiumTemplate-Hero">
                <div className="consortium-template-container">
                    {/* Breadcrumb Navigation */}
                    <div className="breadcrumb">
                        <Link to="/directory" className="breadcrumb-link">Consortium Members</Link>
                        <span className="breadcrumb-separator">&gt;</span>
                        <span className="breadcrumb-current">{consortium.name}</span>
                    </div>

                    {/* Main Content */}
                    <div className="consortium-template-content">
                        {/* Left Side - Text Details */}
                        <div className="consortium-info-section">
                            <h1 className="consortium-title">{consortium.name}</h1>
                            
                            <div className="consortium-description">
                                <p><strong>Description:</strong> {consortium.description}</p>
                            </div>

                            <div className="consortium-details">
                                {consortium.location && <p><strong>Location:</strong> {consortium.location}</p>}
                                {consortium.incubator && <p><strong>Incubator:</strong> {consortium.incubator}</p>}
                                {consortium.industry && <p><strong>Industry:</strong> {consortium.industry}</p>}
                                {consortium.stage && <p><strong>Stage:</strong> {consortium.stage}</p>}
                            </div>

                            <div className="consortium-social">
                                {consortium.social?.facebook?.link && (
                                    <a href={consortium.social.facebook.link} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        {consortium.social.facebook.label}
                                    </a>
                                )}
                                {consortium.social?.x?.link && (
                                    <a href={consortium.social.x.link} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                        </svg>
                                        {consortium.social.x.label}
                                    </a>
                                )}
                                {consortium.social?.instagram?.link && (
                                    <a href={consortium.social.instagram.link} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                        {consortium.social.instagram.label}
                                    </a>
                                )}
                                {consortium.social?.email?.link && (
                                    <a href={consortium.social.email.link.includes('@') ? `mailto:${consortium.social.email.link}` : consortium.social.email.link} className="social-link email">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        {consortium.social.email.label}
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="consortium-image-section">
                            <div className="consortium-main-image" style={consortium.image ? {backgroundImage: `url(${consortium.image})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>
                                {!consortium.image && <span>Image Placeholder</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DirectoryConsortiumTemplate;
