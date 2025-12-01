import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Directory.css';
import { getStartups } from '../services/startupsService';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';

const Directory = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState(''); // What user types
    const [searchTerm, setSearchTerm] = useState(''); // Active search query
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        sort: 'none',
        location: '',
        industry: ''
    });
    
    const ITEMS_PER_PAGE = 12;

    // Set page title
    useEffect(() => {
        document.title = 'Directory | SCALE';
    }, []);

    // Static sample data for startups and consortiums
    const staticStartupsData = [
        // Startups (24 items for 2 pages)
        { id: 1, name: "TechNova Solutions", type: "startup", location: "Quezon City", industry: "Artificial Intelligence", image: null, slug: "technova-solutions", description: "AI-powered business automation platform", stage: "Series A", incubator: "DOST Technology Business Incubator", social: { facebook: { link: "https://facebook.com/technova", label: "TechNova Solutions" } } },
        { id: 2, name: "EcoTech Manila", type: "startup", location: "Manila", industry: "Clean Technology", image: null, slug: "ecotech-manila", description: "Sustainable energy solutions for urban environments", stage: "Seed", incubator: "UP Technology Business Incubator", social: { x: { link: "https://twitter.com/ecotech", label: "@EcoTechMNL" } } },
        { id: 3, name: "HealthLink PH", type: "startup", location: "Makati", industry: "Healthcare Technology", image: null, slug: "healthlink-ph", description: "Telemedicine platform connecting patients with healthcare providers", stage: "Series B", incubator: "Ateneo Innovation Center", social: { instagram: { link: "https://instagram.com/healthlink", label: "@HealthLinkPH" } } },
        { id: 4, name: "AgriSmart Systems", type: "startup", location: "Pasig", industry: "Agriculture Technology", image: null, slug: "agrismart-systems", description: "IoT solutions for smart farming and crop monitoring", stage: "Pre-Seed", incubator: "UPLB Technology Business Incubator", social: { email: { link: "info@agrismart.ph", label: "Contact AgriSmart" } } },
        { id: 5, name: "EduTech Pro", type: "startup", location: "Taguig", industry: "Education Technology", image: null, slug: "edutech-pro", description: "Digital learning platform for K-12 education", stage: "Seed", incubator: "De La Salle Innovation Center", social: { facebook: { link: "https://facebook.com/edutech", label: "EduTech Pro" } } },
        { id: 6, name: "FinanceFlow", type: "startup", location: "BGC Taguig", industry: "Financial Technology", image: null, slug: "financeflow", description: "Digital banking solutions for SMEs", stage: "Series A", incubator: "DOST Technology Business Incubator", social: { x: { link: "https://twitter.com/financeflow", label: "@FinanceFlowPH" } } },
        { id: 7, name: "LogiTrack Solutions", type: "startup", location: "Paranaque", industry: "Logistics", image: null, slug: "logitrack-solutions", description: "Supply chain management and tracking platform", stage: "Seed", incubator: "UP Technology Business Incubator", social: { instagram: { link: "https://instagram.com/logitrack", label: "@LogiTrackPH" } } },
        { id: 8, name: "GameDev Studio PH", type: "startup", location: "Quezon City", industry: "Gaming", image: null, slug: "gamedev-studio-ph", description: "Mobile game development and publishing", stage: "Pre-Seed", incubator: "Ateneo Innovation Center", social: { email: { link: "hello@gamedevph.com", label: "GameDev Studio" } } },
        { id: 9, name: "CloudSecure PH", type: "startup", location: "Manila", industry: "Cybersecurity", image: null, slug: "cloudsecure-ph", description: "Cloud security and data protection services", stage: "Series A", incubator: "UPLB Technology Business Incubator", social: { facebook: { link: "https://facebook.com/cloudsecure", label: "CloudSecure PH" } } },
        { id: 10, name: "FoodTech", type: "startup", location: "Makati", industry: "Food Technology", image: null, slug: "foodtech-innovations", description: "Food delivery optimization and kitchen automation", stage: "Seed", incubator: "De La Salle Innovation Center", social: { x: { link: "https://twitter.com/foodtech", label: "@FoodTechPH" } } },
        { id: 11, name: "MedDevice", type: "startup", location: "Pasig", industry: "Medical Devices", image: null, slug: "meddevice-solutions", description: "Affordable medical equipment for rural healthcare", stage: "Series B", incubator: "DOST Technology Business Incubator", social: { instagram: { link: "https://instagram.com/meddevice", label: "@MedDevicePH" } } },
        { id: 12, name: "RetailBot PH", type: "startup", location: "Taguig", industry: "Retail Technology", image: null, slug: "retailbot-ph", description: "AI-powered retail analytics and automation", stage: "Pre-Seed", incubator: "UP Technology Business Incubator", social: { email: { link: "contact@retailbot.ph", label: "RetailBot Team" } } },
        { id: 13, name: "TransportTech", type: "startup", location: "BGC Taguig", industry: "Transportation", image: null, slug: "transporttech-manila", description: "Smart transportation and mobility solutions", stage: "Seed", incubator: "Ateneo Innovation Center", social: { facebook: { link: "https://facebook.com/transporttech", label: "TransportTech Manila" } } },
        { id: 14, name: "EnergyWise PH", type: "startup", location: "Paranaque", industry: "Energy Management", image: null, slug: "energywise-ph", description: "Smart energy monitoring and optimization platform", stage: "Series A", incubator: "UPLB Technology Business Incubator", social: { x: { link: "https://twitter.com/energywise", label: "@EnergyWisePH" } } },
        { id: 15, name: "PropTech Solutions", type: "startup", location: "Quezon City", industry: "Real Estate Technology", image: null, slug: "proptech-solutions", description: "Digital real estate marketplace and management tools", stage: "Seed", incubator: "De La Salle Innovation Center", social: { instagram: { link: "https://instagram.com/proptech", label: "@PropTechPH" } } },
        { id: 16, name: "SocialImpact Tech", type: "startup", location: "Manila", industry: "Social Innovation", image: null, slug: "socialimpact-tech", description: "Technology solutions for social good and community development", stage: "Pre-Seed", incubator: "DOST Technology Business Incubator", social: { email: { link: "impact@socialtech.ph", label: "Social Impact Team" } } },
        { id: 17, name: "SportsTech PH", type: "startup", location: "Makati", industry: "Sports Technology", image: null, slug: "sportstech-ph", description: "Athletic performance tracking and sports analytics", stage: "Series A", incubator: "UP Technology Business Incubator", social: { facebook: { link: "https://facebook.com/sportstech", label: "SportsTech PH" } } },
        { id: 18, name: "TravelSmart", type: "startup", location: "Pasig", industry: "Travel Technology", image: null, slug: "travelsmart-solutions", description: "AI-powered travel planning and booking platform", stage: "Seed", incubator: "Ateneo Innovation Center", social: { x: { link: "https://twitter.com/travelsmart", label: "@TravelSmartPH" } } },
        { id: 19, name: "VirtualReality PH", type: "startup", location: "Taguig", industry: "Virtual Reality", image: null, slug: "virtualreality-ph", description: "VR/AR solutions for education and entertainment", stage: "Pre-Seed", incubator: "UPLB Technology Business Incubator", social: { instagram: { link: "https://instagram.com/vrph", label: "@VirtualRealityPH" } } },
        { id: 20, name: "BlockchainTech", type: "startup", location: "BGC Taguig", industry: "Blockchain", image: null, slug: "blockchaintech-manila", description: "Blockchain solutions for supply chain and payments", stage: "Series A", incubator: "De La Salle Innovation Center", social: { email: { link: "blockchain@techmanila.ph", label: "Blockchain Team" } } },
        { id: 21, name: "RoboTech", type: "startup", location: "Paranaque", industry: "Robotics", image: null, slug: "robotech-innovations", description: "Industrial automation and robotic solutions", stage: "Seed", incubator: "DOST Technology Business Incubator", social: { facebook: { link: "https://facebook.com/robotech", label: "RoboTech Innovations" } } },
        { id: 22, name: "GreenTech", type: "startup", location: "Quezon City", industry: "Environmental Technology", image: null, slug: "greentech-solutions", description: "Environmental monitoring and sustainability solutions", stage: "Pre-Seed", incubator: "UP Technology Business Incubator", social: { x: { link: "https://twitter.com/greentech", label: "@GreenTechPH" } } },
        { id: 23, name: "DataAnalytics Pro", type: "startup", location: "Manila", industry: "Data Analytics", image: null, slug: "dataanalytics-pro", description: "Big data analytics and business intelligence platform", stage: "Series A", incubator: "Ateneo Innovation Center", social: { instagram: { link: "https://instagram.com/dataanalytics", label: "@DataAnalyticsPH" } } },
        { id: 24, name: "IoT Philippines", type: "startup", location: "Makati", industry: "Internet of Things", image: null, slug: "iot-philippines", description: "IoT platforms for smart cities and industrial applications", stage: "Seed", incubator: "UPLB Technology Business Incubator", social: { email: { link: "iot@philippines.tech", label: "IoT Philippines" } } },
        
        // Consortium Members (24 items for 2 pages)
        { id: 25, name: "MMD Authority", type: "consortium", location: "Manila", industry: "Government", image: null, slug: "mmda", description: "Metropolitan Manila's urban planning and development authority", stage: "Government Agency", incubator: "DOST Technology Business Incubator", social: { facebook: { link: "https://facebook.com/mmda", label: "MMDA Official" } } },
        { id: 26, name: "Philippine CC", type: "consortium", location: "Makati", industry: "Business Association", image: null, slug: "pcc", description: "Leading business organization promoting trade and commerce", stage: "Established", incubator: "UP Technology Business Incubator", social: { x: { link: "https://twitter.com/pcc", label: "@PCCPhilippines" } } },
        { id: 27, name: "Ayala Corporation", type: "consortium", location: "BGC Taguig", industry: "Conglomerate", image: null, slug: "ayala-corp", description: "Diversified business conglomerate with investments in various sectors", stage: "Public Corporation", incubator: "Ateneo Innovation Center", social: { instagram: { link: "https://instagram.com/ayalacorp", label: "@AyalaCorporation" } } },
        { id: 28, name: "Smart", type: "consortium", location: "Quezon City", industry: "Telecommunications", image: null, slug: "smart-communications", description: "Leading telecommunications and digital services provider", stage: "Public Corporation", incubator: "UPLB Technology Business Incubator", social: { email: { link: "info@smart.com.ph", label: "Smart Communications" } } },
        { id: 29, name: "BPI", type: "consortium", location: "Makati", industry: "Banking", image: null, slug: "bpi", description: "Universal bank providing comprehensive financial services", stage: "Public Corporation", incubator: "De La Salle Innovation Center", social: { facebook: { link: "https://facebook.com/bpi", label: "BPI Official" } } },
        { id: 30, name: "PLDT", type: "consortium", location: "Manila", industry: "Telecommunications", image: null, slug: "pldt", description: "Integrated telecommunications company", stage: "Public Corporation", incubator: "DOST Technology Business Incubator", social: { x: { link: "https://twitter.com/pldt", label: "@PLDTHome" } } },
        { id: 31, name: "Jollibee", type: "consortium", location: "Pasig", industry: "Food & Beverage", image: null, slug: "jollibee", description: "Global food service company with multiple restaurant brands", stage: "Public Corporation", incubator: "UP Technology Business Incubator", social: { instagram: { link: "https://instagram.com/jollibee", label: "@Jollibee" } } },
        { id: 32, name: "SM Investments", type: "consortium", location: "Taguig", industry: "Investment Holding", image: null, slug: "sm-investments", description: "Leading investment holding and management company", stage: "Public Corporation", incubator: "Ateneo Innovation Center", social: { email: { link: "investor@sminvestments.com", label: "SM Investments" } } },
        { id: 33, name: "Globe Telecom", type: "consortium", location: "BGC Taguig", industry: "Telecommunications", image: null, slug: "globe-telecom", description: "Digital solutions platform and telecommunications provider", stage: "Public Corporation", incubator: "UPLB Technology Business Incubator", social: { facebook: { link: "https://facebook.com/globe", label: "Globe Official" } } },
        { id: 34, name: "Aboitiz Equity", type: "consortium", location: "Paranaque", industry: "Investment Holding", image: null, slug: "aev", description: "Strategic business investments across multiple industries", stage: "Public Corporation", incubator: "De La Salle Innovation Center", social: { x: { link: "https://twitter.com/aboitiz", label: "@AboitizGroup" } } },
        { id: 35, name: "Lopez Holdings", type: "consortium", location: "Quezon City", industry: "Investment Holding", image: null, slug: "lopez-holdings", description: "Investment holding company with interests in various sectors", stage: "Public Corporation", incubator: "DOST Technology Business Incubator", social: { instagram: { link: "https://instagram.com/lopezgroup", label: "@LopezGroup" } } },
        { id: 36, name: "Manila Electric", type: "consortium", location: "Manila", industry: "Utilities", image: null, slug: "meralco", description: "Largest electric distribution utility in the Philippines", stage: "Public Corporation", incubator: "UP Technology Business Incubator", social: { email: { link: "info@meralco.com.ph", label: "Meralco" } } },
        { id: 37, name: "Philippine Airlines", type: "consortium", location: "Makati", industry: "Aviation", image: null, slug: "philippine-airlines", description: "Flag carrier airline of the Philippines", stage: "Public Corporation", incubator: "Ateneo Innovation Center", social: { facebook: { link: "https://facebook.com/pal", label: "Philippine Airlines" } } },
        { id: 38, name: "Cebu Pacific Air", type: "consortium", location: "Pasig", industry: "Aviation", image: null, slug: "cebu-pacific", description: "Low-cost airline serving domestic and international routes", stage: "Public Corporation", incubator: "UPLB Technology Business Incubator", social: { x: { link: "https://twitter.com/cebupacificair", label: "@CebuPacificAir" } } },
        { id: 39, name: "Robinsons Retail", type: "consortium", location: "Taguig", industry: "Retail", image: null, slug: "robinsons-retail", description: "Multi-format retail company with various store chains", stage: "Public Corporation", incubator: "De La Salle Innovation Center", social: { instagram: { link: "https://instagram.com/robinsons", label: "@Robinsons" } } },
        { id: 40, name: "Universal Robina", type: "consortium", location: "BGC Taguig", industry: "Food Manufacturing", image: null, slug: "urc", description: "Leading food and beverage manufacturer", stage: "Public Corporation", incubator: "DOST Technology Business Incubator", social: { email: { link: "info@urc.com.ph", label: "Universal Robina" } } },
        { id: 41, name: "Philippine National", type: "consortium", location: "Paranaque", industry: "Banking", image: null, slug: "pnb", description: "Universal bank offering comprehensive financial services", stage: "Public Corporation", incubator: "UP Technology Business Incubator", social: { facebook: { link: "https://facebook.com/pnb", label: "PNB Official" } } },
        { id: 42, name: "Metropolitan BanK", type: "consortium", location: "Quezon City", industry: "Banking", image: null, slug: "metrobank", description: "Universal bank with extensive branch network", stage: "Public Corporation", incubator: "Ateneo Innovation Center", social: { x: { link: "https://twitter.com/metrobank", label: "@Metrobank" } } },
        { id: 43, name: "PLDT Inc", type: "consortium", location: "Manila", industry: "Technology Services", image: null, slug: "pldt-inc", description: "Technology and telecommunications services provider", stage: "Public Corporation", incubator: "UPLB Technology Business Incubator", social: { instagram: { link: "https://instagram.com/pldtinc", label: "@PLDTInc" } } },
        { id: 44, name: "San Miguel", type: "consortium", location: "Makati", industry: "Conglomerate", image: null, slug: "san-miguel", description: "Diversified conglomerate with businesses across multiple sectors", stage: "Public Corporation", incubator: "De La Salle Innovation Center", social: { email: { link: "info@sanmiguel.com.ph", label: "San Miguel Corporation" } } },
        { id: 45, name: "GT Capital Holdings", type: "consortium", location: "Pasig", industry: "Investment Holding", image: null, slug: "gt-capital", description: "Investment holding company with automotive and banking interests", stage: "Public Corporation", incubator: "DOST Technology Business Incubator", social: { facebook: { link: "https://facebook.com/gtcapital", label: "GT Capital" } } },
        { id: 46, name: "Alliance Global", type: "consortium", location: "Taguig", industry: "Conglomerate", image: null, slug: "alliance-global", description: "Conglomerate with interests in real estate, food, and spirits", stage: "Public Corporation", incubator: "UP Technology Business Incubator", social: { x: { link: "https://twitter.com/allianceglobal", label: "@AllianceGlobal" } } },
        { id: 47, name: "JG Summit", type: "consortium", location: "BGC Taguig", industry: "Conglomerate", image: null, slug: "jg-summit", description: "Diversified conglomerate with various business interests", stage: "Public Corporation", incubator: "Ateneo Innovation Center", social: { instagram: { link: "https://instagram.com/jgsummit", label: "@JGSummit" } } },
        { id: 48, name: "Filinvest ", type: "consortium", location: "Paranaque", industry: "Real Estate", image: null, slug: "filinvest", description: "Real estate development and investment company", stage: "Public Corporation", incubator: "UPLB Technology Business Incubator", social: { email: { link: "info@filinvest.com.ph", label: "Filinvest Development" } } }
    ];

    // Fetch startups based on active tab
    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when switching tabs
        fetchStartups();
    }, [activeTab]);

    const fetchStartups = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Use static data instead of API call
            setStartups(staticStartupsData);
        } catch (error) {
            console.error('Error loading directory:', error);
            setError('Failed to load directory. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput); // Apply the search only when form is submitted
        setCurrentPage(1); // Reset to first page when searching
    };

    // Filter by active tab type first
    const tabFilteredStartups = startups.filter(startup => {
        const type = activeTab === 'tab1' ? 'startup' : 'consortium';
        return startup.type === type;
    });

    let filteredStartups = tabFilteredStartups.filter(startup => {
        if (searchTerm && !startup.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        if (filters.location && startup.location !== filters.location) {
            return false;
        }
        if (filters.industry && startup.industry !== filters.industry) {
            return false;
        }
        return true;
    });

    // Apply sorting
    if (filters.sort === 'a-z') {
        filteredStartups = [...filteredStartups].sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === 'z-a') {
        filteredStartups = [...filteredStartups].sort((a, b) => b.name.localeCompare(a.name));
    }

    // Get unique locations and industries for filter dropdowns
    const uniqueLocations = [...new Set(tabFilteredStartups.map(s => s.location).filter(Boolean))];
    const uniqueIndustries = [...new Set(tabFilteredStartups.map(s => s.industry).filter(Boolean))];

    // Pagination calculations
    const totalPages = Math.ceil(filteredStartups.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedStartups = filteredStartups.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= maxVisible; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            }
        }
        return pages;
    };

    return (
        <div className="directory-page">
            <SEO
                title="Startup Directory | SCALE NCR - Discover Philippine Startups & Consortiums"
                description="Explore SCALE NCR's startup directory featuring innovative startups and business consortiums in the Philippines. Find partners, investors, and entrepreneurial opportunities."
                keywords="startup directory, Philippine startups, business consortium, startup ecosystem, entrepreneur directory, NCR startups, innovation partners"
                canonicalUrl="https://www.scalencr.org/directory"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Startup Directory - SCALE NCR",
                    "description": "Directory of startups and consortiums supported by SCALE NCR",
                    "url": "https://www.scalencr.org/directory"
                }}
            />
            
            <section className="Directory-Hero">
                <div className="directory-tabs-section" data-active-tab={activeTab}>
                    <div className="directory-tab-buttons">
                        <button
                            className={`directory-tab-button directory-tab-1 ${activeTab === 'tab1' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tab1')}
                        >
                            Startup Network
                        </button>
                        <button
                            className={`directory-tab-button directory-tab-2 ${activeTab === 'tab2' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tab2')}
                        >
                            Consortium Members
                        </button>
                    </div>

                    <div className="directory-tab-content">
                        {activeTab === 'tab1' && (
                            <div className="directory-tab-panel">
                                
                                <div className="directory-header-results">
                                    <h2>Startup Network</h2>
                                    <div className="directory-results-count">
                                        Showing {Math.min(paginatedStartups.length, filteredStartups.length)} of {filteredStartups.length} results
                                    </div>                                   
                                </div>

                                <div className="directory-content-grid">
                                    <div className="directory-filters-startup">
                                        {/* Search Bar */}
                                        <form onSubmit={handleSearch} className="directory-filter-search">
                                            <svg className="directory-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5"/>
                                                <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                                            </svg>
                                            <input 
                                                type="text" 
                                                placeholder="search . . ."
                                                className="directory-search-input"
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                            />
                                            <button type="submit" className="directory-search-button">enter</button>
                                        </form>

                                        {/* Sort Dropdown */}
                                        <div className="directory-filter-group">
                                            <label className="directory-filter-label">
                                                <span className="directory-sort-icon">⇅</span> Sort:
                                            </label>
                                            <select 
                                                className="directory-filter-select"
                                                value={filters.sort}
                                                onChange={(e) => setFilters({...filters, sort: e.target.value})}
                                            >
                                                <option value="none">none</option>
                                                <option value="a-z">A-Z</option>
                                                <option value="z-a">Z-A</option>
                                            </select>
                                        </div>

                                        {/* Incubator Dropdown */}
                                        <div className="directory-filter-group">
                                            <label className="directory-filter-label">Incubator:</label>
                                            <select 
                                                className="directory-filter-select"
                                                value={filters.industry}
                                                onChange={(e) => setFilters({...filters, industry: e.target.value})}
                                            >
                                                <option value="">choose a TBI</option>
                                                {uniqueIndustries.map(industry => (
                                                    <option key={industry} value={industry}>{industry}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Location Dropdown */}
                                        <div className="directory-filter-group">
                                            <label className="directory-filter-label">Location:</label>
                                            <select 
                                                className="directory-filter-select"
                                                value={filters.location}
                                                onChange={(e) => setFilters({...filters, location: e.target.value})}
                                            >
                                                <option value="">choose a city</option>
                                                {uniqueLocations.map(location => (
                                                    <option key={location} value={location}>{location}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Industry Checkboxes */}
                                        <div className="directory-industry-group">
                                            <label className="directory-filter-label">Industry</label>
                                            <div className="directory-checkbox-list">
                                                <label className="directory-checkbox-item">
                                                    <input type="checkbox" />
                                                    <span>Artificial Intelligence</span>
                                                </label>
                                                <label className="directory-checkbox-item">
                                                    <input type="checkbox" />
                                                    <span>Construction Tech</span>
                                                </label>
                                                <label className="directory-checkbox-item">
                                                    <input type="checkbox" />
                                                    <span>Data Analysis</span>
                                                </label>
                                                <label className="directory-checkbox-item">
                                                    <input type="checkbox" />
                                                    <span>Data Science</span>
                                                </label>
                                                <label className="directory-checkbox-item">
                                                    <input type="checkbox" />
                                                    <span>Machine Learning</span>
                                                </label>
                                                <label className="directory-checkbox-item">
                                                    <input type="checkbox" />
                                                    <span>Robotics</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="directory-cards-grid">
                                        {loading ? (
                                            <div className="directory-loading-spinner">
                                                <div className="directory-spinner"></div>
                                            </div>
                                        ) : error ? (
                                            <div style={{ width: '842px', padding: '40px', textAlign: 'center', color: '#666' }}>{error}</div>
                                        ) : filteredStartups.length === 0 ? (
                                            <div style={{ width: '842px', padding: '40px', textAlign: 'center', color: '#666' }}>No startups found</div>
                                        ) : (
                                            <div className="directory-cards-wrapper">
                                                <div className="directory-cards-container">
                                                    {paginatedStartups.map((startup) => (
                                                        <Link to={`/directory/${startup.type}/${startup.slug || startup.id}`} key={startup.id} style={{ textDecoration: 'none' }}>
                                                            <div className="directory-startup-card">
                                                                <div className="directory-card-image" 
                                                                     style={startup.image ? {backgroundImage: `url(${startup.image})`} : {}}>
                                                                    {!startup.image && 'Image'}
                                                                </div>
                                                                <div className="directory-card-meta">
                                                                    <h3 className="directory-card-location">{startup.location?.toUpperCase() || 'LOCATION'}</h3>
                                                                    <p className="directory-card-name">{startup.name}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>

                                                {/* Pagination */}
                                                {totalPages > 1 && (
                                                    <div className="directory-pagination">
                                                <button 
                                                    className="directory-pagination-btn directory-pagination-prev"
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    ‹
                                                </button>
                                                {getPageNumbers().map(pageNum => (
                                                    <button 
                                                        key={pageNum}
                                                        className={`directory-pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                                                        onClick={() => handlePageChange(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                ))}
                                                <button 
                                                    className="directory-pagination-btn directory-pagination-next"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    ›
                                                </button>
                                            </div>
                                        )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'tab2' && (
                            <div className="directory-tab-panel">
                                <div className="directory-header-results">
                                    <h2>Consortium Members</h2>
                                    <div className="directory-results-count">
                                        Showing {Math.min(paginatedStartups.length, filteredStartups.length)} of {filteredStartups.length} results
                                    </div>                                   
                                </div>

                                <div className="directory-content-grid">
                                    <div className="directory-filters-consortium">
                                        {/* Search Bar */}
                                        <form onSubmit={handleSearch} className="directory-filter-search">
                                            <svg className="directory-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5"/>
                                                <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                                            </svg>
                                            <input 
                                                type="text" 
                                                placeholder="search . . ."
                                                className="directory-search-input"
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                            />
                                            <button type="submit" className="directory-search-button directory-search-button-consortium">enter</button>
                                        </form>

                                        {/* Sort Dropdown */}
                                        <div className="directory-filter-group">
                                            <label className="directory-filter-label">
                                                <span className="directory-sort-icon">⇅</span> Sort:
                                            </label>
                                            <select 
                                                className="directory-filter-select"
                                                value={filters.sort}
                                                onChange={(e) => setFilters({...filters, sort: e.target.value})}
                                            >
                                                <option value="none">none</option>
                                                <option value="a-z">A-Z</option>
                                                <option value="z-a">Z-A</option>
                                            </select>
                                        </div>

                                        {/* Incubator Dropdown */}
                                        <div className="directory-filter-group">
                                            <label className="directory-filter-label">Incubator:</label>
                                            <select 
                                                className="directory-filter-select"
                                                value={filters.location}
                                                onChange={(e) => setFilters({...filters, location: e.target.value})}
                                            >
                                                <option value="">choose a city</option>
                                                {uniqueLocations.map(location => (
                                                    <option key={location} value={location}>{location}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Location Dropdown */}
                                        <div className="directory-filter-group">
                                            <label className="directory-filter-label">Location:</label>
                                            <select 
                                                className="directory-filter-select"
                                                value={filters.industry}
                                                onChange={(e) => setFilters({...filters, industry: e.target.value})}
                                            >
                                                <option value="">choose a TBI</option>
                                                {uniqueIndustries.map(industry => (
                                                    <option key={industry} value={industry}>{industry}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="directory-cards-grid">
                                        {loading ? (
                                            <div className="directory-loading-spinner">
                                                <div className="directory-spinner"></div>
                                            </div>
                                        ) : error ? (
                                            <div style={{ width: '842px', padding: '40px', textAlign: 'center', color: '#666' }}>{error}</div>
                                        ) : filteredStartups.length === 0 ? (
                                            <div style={{ width: '842px', padding: '40px', textAlign: 'center', color: '#666' }}>No consortium members found</div>
                                        ) : (
                                            <div className="directory-cards-wrapper">
                                                <div className="directory-cards-container">
                                                    {paginatedStartups.map((startup) => (
                                                        <Link to={`/directory/${startup.type}/${startup.slug || startup.id}`} key={startup.id} style={{ textDecoration: 'none' }}>
                                                            <div className="directory-startup-card">
                                                                <div className="directory-card-image" 
                                                                     style={startup.image ? {backgroundImage: `url(${startup.image})`} : {}}>
                                                                    {!startup.image && 'Image'}
                                                                </div>
                                                                <div className="directory-card-meta">
                                                                    <h3 className="directory-card-location">{startup.location?.toUpperCase() || 'LOCATION'}</h3>
                                                                    <p className="directory-card-name">{startup.name}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>

                                                {/* Pagination */}
                                                {totalPages > 1 && (
                                                    <div className="directory-pagination">
                                                <button 
                                                    className="directory-pagination-btn directory-pagination-prev"
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    ‹
                                                </button>
                                                {getPageNumbers().map(pageNum => (
                                                    <button 
                                                        key={pageNum}
                                                        className={`directory-pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                                                        onClick={() => handlePageChange(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                ))}
                                                <button 
                                                    className="directory-pagination-btn directory-pagination-next"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    ›
                                                </button>
                                            </div>
                                        )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Directory;
