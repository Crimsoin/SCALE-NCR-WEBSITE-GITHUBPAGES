import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Events.css';
import { getPublishedEvents } from '../services/eventsService';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;
    
    // Set page title
    useEffect(() => {
        document.title = 'Events | SCALE';
    }, []);

    // Static sample events data (24 items for 2 pages)
    const staticEventsData = [
        {
            id: 1,
            title: "SCALE Startup Pitch Competition 2025",
            description: "Join us for the biggest startup pitch competition in the NCR! Emerging startups will present their innovative solutions to a panel of expert judges and potential investors. This competition aims to provide a platform for entrepreneurs to showcase their ideas and connect with the startup ecosystem.",
            summary: "Annual startup pitch competition featuring emerging entrepreneurs and innovative solutions across various industries.",
            date_published: "2025-01-15",
            image: null,
            slug: "startup-pitch-competition-2025"
        },
        {
            id: 2,
            title: "Digital Transformation Workshop Series",
            description: "A comprehensive 3-day workshop series focusing on digital transformation strategies for small and medium enterprises. Learn about cloud computing, digital marketing, automation tools, and data analytics to modernize your business operations.",
            summary: "Learn digital transformation strategies, cloud computing, and automation tools for modern business operations.",
            date_published: "2025-01-12",
            image: null,
            slug: "digital-transformation-workshop"
        },
        {
            id: 3,
            title: "AI and Machine Learning Summit",
            description: "Explore the latest trends in artificial intelligence and machine learning with industry experts and thought leaders. This summit covers practical applications, ethical considerations, and future developments in AI technology for business and society.",
            summary: "Industry summit on AI trends, practical applications, and ethical considerations with expert speakers.",
            date_published: "2025-01-10",
            image: null,
            slug: "ai-machine-learning-summit"
        },
        {
            id: 4,
            title: "Sustainable Business Practices Forum",
            description: "Discover how to integrate sustainability into your business model while maintaining profitability. Topics include green technology, circular economy, sustainable supply chains, and environmental impact measurement for modern enterprises.",
            summary: "Forum on integrating sustainability into business models with green technology and circular economy focus.",
            date_published: "2025-01-08",
            image: null,
            slug: "sustainable-business-practices-forum"
        },
        {
            id: 5,
            title: "Fintech Innovation Conference",
            description: "The premier fintech event in the Philippines bringing together financial institutions, technology companies, and regulators. Explore blockchain, digital payments, cryptocurrency, and the future of financial services in the digital age.",
            summary: "Premier fintech conference exploring blockchain, digital payments, and the future of financial services.",
            date_published: "2025-01-05",
            image: null,
            slug: "fintech-innovation-conference"
        },
        {
            id: 6,
            title: "Women in Tech Leadership Panel",
            description: "Celebrating women leaders in technology and entrepreneurship. This panel discussion features successful female executives sharing their experiences, challenges, and strategies for building inclusive tech companies and advancing women in STEM fields.",
            summary: "Panel celebrating women leaders in technology, featuring successful executives sharing experiences and strategies.",
            date_published: "2025-01-03",
            image: null,
            slug: "women-in-tech-leadership-panel"
        },
        {
            id: 7,
            title: "Blockchain and Web3 Developer Bootcamp",
            description: "Intensive 5-day bootcamp for developers interested in blockchain technology and Web3 development. Learn smart contract programming, DeFi protocols, NFT development, and decentralized application building with hands-on projects.",
            summary: "Intensive developer bootcamp covering blockchain, smart contracts, DeFi, and decentralized applications.",
            date_published: "2024-12-28",
            image: null,
            slug: "blockchain-web3-developer-bootcamp"
        },
        {
            id: 8,
            title: "E-commerce Growth Strategies Seminar",
            description: "Master the art of growing your online business with proven e-commerce strategies. Topics include marketplace optimization, social media marketing, customer retention, inventory management, and scaling operations effectively.",
            summary: "Seminar on e-commerce growth covering marketplace optimization, social media marketing, and scaling operations.",
            date_published: "2024-12-25",
            image: null,
            slug: "ecommerce-growth-strategies-seminar"
        },
        {
            id: 9,
            title: "Startup Legal Workshop: IP and Compliance",
            description: "Essential legal knowledge for startups covering intellectual property protection, business registration, compliance requirements, and contract negotiations. Legal experts provide practical guidance for protecting your startup's interests.",
            summary: "Legal workshop covering intellectual property protection, compliance requirements, and startup legal essentials.",
            date_published: "2024-12-22",
            image: null,
            slug: "startup-legal-workshop"
        },
        {
            id: 10,
            title: "IoT and Smart Cities Innovation Expo",
            description: "Explore the Internet of Things and smart city solutions that are transforming urban living. Featuring demonstrations of smart infrastructure, connected devices, urban analytics, and sustainable city technologies.",
            summary: "Innovation expo showcasing IoT solutions, smart infrastructure, and sustainable city technologies.",
            date_published: "2024-12-20",
            image: null,
            slug: "iot-smart-cities-expo"
        },
        {
            id: 11,
            title: "Cybersecurity Best Practices Workshop",
            description: "Protect your business from cyber threats with comprehensive cybersecurity training. Learn about threat detection, data protection, security protocols, incident response, and building a security-first culture in your organization.",
            summary: "Cybersecurity workshop covering threat detection, data protection, and building security-first organizational culture.",
            date_published: "2024-12-18",
            image: null,
            slug: "cybersecurity-best-practices-workshop"
        },
        {
            id: 12,
            title: "Health Tech Innovation Summit",
            description: "Revolutionizing healthcare through technology innovation. This summit brings together healthcare professionals, tech innovators, and policy makers to discuss telemedicine, digital health solutions, and the future of healthcare delivery.",
            summary: "Healthcare technology summit discussing telemedicine, digital health solutions, and healthcare delivery innovation.",
            date_published: "2024-12-15",
            image: null,
            slug: "health-tech-innovation-summit"
        },
        {
            id: 13,
            title: "Social Media Marketing Masterclass",
            description: "Master social media marketing for business growth with expert-led sessions on content creation, audience engagement, influencer partnerships, and platform-specific strategies for maximum reach and conversion.",
            summary: "Masterclass on social media marketing covering content creation, engagement strategies, and platform optimization.",
            date_published: "2024-12-12",
            image: null,
            slug: "social-media-marketing-masterclass"
        },
        {
            id: 14,
            title: "Agtech and Smart Farming Conference",
            description: "Agricultural technology innovations transforming farming practices. Learn about precision agriculture, drone technology, crop monitoring systems, and sustainable farming solutions that increase productivity and reduce environmental impact.",
            summary: "Conference on agricultural technology, precision farming, and sustainable agriculture solutions.",
            date_published: "2024-12-10",
            image: null,
            slug: "agtech-smart-farming-conference"
        },
        {
            id: 15,
            title: "Venture Capital and Startup Funding Forum",
            description: "Connect with investors and learn about funding opportunities for startups. This forum features venture capitalists, angel investors, and successful entrepreneurs sharing insights on fundraising strategies and investment trends.",
            summary: "Forum connecting startups with investors, covering fundraising strategies and investment opportunities.",
            date_published: "2024-12-08",
            image: null,
            slug: "venture-capital-funding-forum"
        },
        {
            id: 16,
            title: "Digital Marketing Analytics Workshop",
            description: "Harness the power of data-driven marketing with comprehensive analytics training. Learn to use Google Analytics, social media insights, conversion tracking, and ROI measurement for effective marketing campaigns.",
            summary: "Workshop on digital marketing analytics, data-driven strategies, and ROI measurement techniques.",
            date_published: "2024-12-05",
            image: null,
            slug: "digital-marketing-analytics-workshop"
        },
        {
            id: 17,
            title: "Clean Energy and Green Tech Expo",
            description: "Showcase of renewable energy solutions and green technology innovations. Featuring solar power systems, energy storage solutions, electric vehicle technology, and sustainable manufacturing processes.",
            summary: "Expo featuring renewable energy solutions, green technology innovations, and sustainable manufacturing processes.",
            date_published: "2024-12-03",
            image: null,
            slug: "clean-energy-green-tech-expo"
        },
        {
            id: 18,
            title: "Product Design and User Experience Workshop",
            description: "Create user-centered products with design thinking methodologies. This hands-on workshop covers user research, prototyping, usability testing, and design systems for creating exceptional user experiences.",
            summary: "Hands-on workshop on product design, user research, prototyping, and creating exceptional user experiences.",
            date_published: "2024-11-30",
            image: null,
            slug: "product-design-ux-workshop"
        },
        {
            id: 19,
            title: "Robotics and Automation Symposium",
            description: "Explore the future of robotics and industrial automation. Topics include collaborative robots, process automation, AI-powered robotics, and the impact of automation on manufacturing and service industries.",
            summary: "Symposium on robotics, industrial automation, and AI-powered robotic solutions for various industries.",
            date_published: "2024-11-28",
            image: null,
            slug: "robotics-automation-symposium"
        },
        {
            id: 20,
            title: "Data Science and Analytics Conference",
            description: "Unlock insights from big data with advanced analytics techniques. Learn about machine learning algorithms, predictive modeling, data visualization, and implementing data-driven decision making in business operations.",
            summary: "Conference on data science, machine learning algorithms, predictive modeling, and data-driven decision making.",
            date_published: "2024-11-25",
            image: null,
            slug: "data-science-analytics-conference"
        },
        {
            id: 21,
            title: "Startup Mentorship Network Launch",
            description: "Launch of SCALE's comprehensive mentorship program connecting experienced entrepreneurs with emerging startups. Learn about the program structure, mentor matching process, and success stories from previous participants.",
            summary: "Launch of comprehensive startup mentorship program connecting experienced entrepreneurs with emerging startups.",
            date_published: "2024-11-22",
            image: null,
            slug: "startup-mentorship-network-launch"
        },
        {
            id: 22,
            title: "International Trade and Export Workshop",
            description: "Expand your business globally with international trade expertise. Topics include export regulations, international marketing, cultural considerations, logistics, and building partnerships in foreign markets.",
            summary: "Workshop on international trade, export regulations, global marketing, and building foreign market partnerships.",
            date_published: "2024-11-20",
            image: null,
            slug: "international-trade-export-workshop"
        },
        {
            id: 23,
            title: "Gaming Industry Innovation Forum",
            description: "The Philippines gaming industry forum featuring game developers, publishers, and industry experts. Discussions on mobile gaming trends, game monetization, esports opportunities, and the growing gaming ecosystem in Southeast Asia.",
            summary: "Gaming industry forum covering mobile gaming trends, monetization strategies, and Southeast Asian gaming ecosystem.",
            date_published: "2024-11-18",
            image: null,
            slug: "gaming-industry-innovation-forum"
        },
        {
            id: 24,
            title: "Real Estate Technology Conference",
            description: "PropTech innovations transforming the real estate industry. Explore virtual property tours, blockchain property transactions, AI-powered property valuation, and digital property management solutions.",
            summary: "PropTech conference on virtual tours, blockchain transactions, AI valuation, and digital property management.",
            date_published: "2024-11-15",
            image: null,
            slug: "real-estate-technology-conference"
        }
    ];

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Use static data instead of API call
            setEvents(staticEventsData);
        } catch (error) {
            console.error('Error loading events:', error);
            setError('Failed to load events. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1); // Reset to first page when sort changes
    };

    // Filter events based on search term
    const filteredEvents = events.filter(event => {
        if (!searchTerm) return true;
        
        const title = event.title || '';
        const description = event.description || '';
        const searchLower = searchTerm.toLowerCase();
        
        return title.toLowerCase().includes(searchLower) || 
               description.toLowerCase().includes(searchLower);
    });

    // Sort filtered events
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        switch (sortOption) {
            case 'newest':
                return new Date(b.date_published) - new Date(a.date_published);
            case 'oldest':
                return new Date(a.date_published) - new Date(b.date_published);
            case 'A-Z':
                return a.title.localeCompare(b.title);
            case 'Z-A':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedEvents = sortedEvents.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="events-page">
            <SEO
                title="News & Events | SCALE NCR - Latest Updates, Programs & Workshops"
                description="Stay updated with SCALE NCR's latest news, events, workshops, and programs. Discover upcoming startup events, innovation forums, and entrepreneurship activities."
                keywords="SCALE NCR events, startup events, innovation workshops, entrepreneurship programs, business forums, NCR events, TBI activities"
                canonicalUrl="https://www.scalencr.org/events"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "News and Events - SCALE NCR",
                    "description": "Latest news and events from SCALE NCR",
                    "url": "https://www.scalencr.org/events"
                }}
            />
            <div className="events-container">
                <div className="events-header">NEWS AND EVENTS</div>
                
                <div className="events-parameters">
                    {/* Sort Dropdown */}
                    <div className="events-sort-group">
                        <label className="events-filter-label">
                            <span className="events-sort-icon">⇅</span> sort:
                        </label>
                        <select 
                            className="events-sort-select"
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="newest">newest</option>
                            <option value="oldest">oldest</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="events-filter-search">
                        <svg className="events-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5"/>
                            <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                        <input 
                            type="text" 
                            placeholder="search . . ."
                            className="events-search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type="submit" className="events-search-button">enter</button>
                    </form>
                </div>

                <div className="events-cards-container">
                    {loading ? (
                        <LoadingSpinner message="Loading events..." />
                    ) : error ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>{error}</div>
                    ) : sortedEvents.length === 0 ? (
                        <div style={{ 
                            gridColumn: '1 / -1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '400px',
                            color: '#666',
                            fontSize: '18px',
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        }}>No events found</div>
                    ) : (
                        paginatedEvents.map((event) => (
                            <Link to={`/events/${event.slug}`} key={event.id} style={{ textDecoration: 'none' }}>
                                <div 
                                    className="event-card" 
                                    style={event.image ? {
                                        backgroundImage: `url(${event.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    } : {}}
                                >
                                    <div className="event-card-content">
                                        <div className="event-card-title">
                                            {event.title}
                                        </div>
                                        <div className="event-card-description">
                                            {event.summary || event.description}
                                        </div>
                                        {event.date_published && (
                                            <div className="event-card-date" style={{ marginTop: '10px', fontSize: '0.9em', color: '#fff' }}>
                                                {formatDate(event.date_published)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="events-pagination">
                        <button 
                            className="events-pagination-btn events-pagination-prev"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            ‹
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button 
                                key={index + 1}
                                className={`events-pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button 
                            className="events-pagination-btn events-pagination-next"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
