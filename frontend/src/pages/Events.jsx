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

    // Static events data - SCALE NCR Events
    const staticEventsData = [
        {
            id: 1,
            title: "SCALE NCR General Assembly and Press Conference",
            description: "The first general assembly of the founding and general members of the consortium was held to orient members about the regulations, mission, vision, goals, and objectives of SCALE NCR. The event also served as the formal introduction of the consortium to the members of the press, as well as an opportunity to present its upcoming activities and projects.",
            summary: "The first general assembly of the founding and general members of the consortium was held to orient members about the regulations, mission, vision, goals, and objectives of SCALE NCR. The event also served as the formal introduction of the consortium to the members of the press, as well as an opportunity to present its upcoming activities and projects.",
            date_published: "2024-08-29",
            image: "/assests/images/Events/SCALE_NCR_General_Assembly_and_Press_Conference.png",
            slug: "scale-ncr-general-assembly-press-conference"
        },
        {
            id: 2,
            title: "SCALE NCR 2025 Planning Session",
            description: "The founding members of SCALE NCR convened to discuss and plan the consortium's Year 2 deliverables. The meeting focused on reviewing the progress and achievements from the previous year, identifying key areas for improvement, and setting strategic priorities for the consortium's continued growth and impact. Members also collaborated on outlining upcoming programs, capacity-building initiatives, and partnerships that will further strengthen the innovation ecosystem across the NCR region.",
            summary: "The founding members of SCALE NCR convened to discuss and plan the consortium's Year 2 deliverables.",
            date_published: "2025-01-16",
            image: "/assests/images/Events/SCALE_NCR_2025_Planning_Session.png",
            slug: "scale-ncr-2025-planning-session"
        },
        {
            id: 3,
            title: "Startup Ecosystem and Innovation Mapping Orientation Meeting with NCR City Clusters",
            description: "The NCR Startup Ecosystem and Innovation Mapping aims to identify the strengths, gaps, opportunities, and challenges of each city in the National Capital Region. This initiative will also serve as a valuable guide for leaders and stakeholders in enhancing their services relevant to the startup and innovation ecosystem, thereby strengthening their programs and improving their overall standing. PAMAMARISAN - April 24, 2024, CAMANAVA + QC - May 17, 2024, PAMAMA - May 28, 2024, MUNTAPARLAS - June 11, 2024.",
            summary: "The NCR Startup Ecosystem and Innovation Mapping aims to identify the strengths, gaps, opportunities, and challenges of each city in the National Capital Region. ",
            date_published: "2024-04-24",
            image: "/assests/images/Events/Startup_Ecosystem_and_Innovation_Mapping_Orientation_Meeting_with_NCR_City_Clusters.png",
            slug: "startup-ecosystem-innovation-mapping-ncr-clusters"
        },
        {
            id: 4,
            title: "NCT TBI Summit",
            description: "This region-wide event aims to bring together key players and stakeholders in the NCR Startup and Innovation Ecosystem to talk about the challenges, bridge gaps, and celebrate milestones in advancing the culture of innovation in the region.",
            summary: "This region-wide event aims to bring together key players and stakeholders in the NCR Startup and Innovation Ecosystem to talk about the challenges, bridge gaps, and celebrate milestones in advancing the culture of innovation in the region.",
            date_published: "2024-10-10",
            image: "/assests/images/Events/NCT_TBI_Summit.png",
            slug: "nct-tbi-summit"
        },
        {
            id: 5,
            title: "Regional Startup and Ecosystem Mapping Activities",
            description: "The SCALE NCR has also been tapped by stakeholders outside the National Capital Region to support initiatives in mapping their respective startup ecosystems. Activities conducted in Lanao Del Norte, Surigao, Isabela, Quirino, Nueve Vizcaya, Negros Island, Bacolod, Iloilo, and Ilocos.",
            summary: "The SCALE NCR has also been tapped by stakeholders outside the National Capital Region to support initiatives in mapping their respective startup ecosystems. Activities conducted in Lanao Del Norte, Surigao, Isabela, Quirino, Nueve Vizcaya, Negros Island, Bacolod, Iloilo, and Ilocos.",
            date_published: "2024-09-15",
            image: "/assests/images/Events/Regional_Startup_and_Ecosystem_Mapping_Activities.jpg",
            slug: "regional-startup-ecosystem-mapping-activities"
        },
        {
            id: 6,
            title: "Philippine Startup Week 2024",
            description: "A nationwide event where startup ecosystem enablers, startups, and players get together to share ideas, platforms, showcase their innovation to the community.",
            summary: "A nationwide event where startup ecosystem enablers, startups, and players get together to share ideas, platforms, showcase their innovation to the community.",
            date_published: "2025-11-11",
            image: "/assests/images/Events/Philippine_Startup_Week_2024.png",
            slug: "philippine-startup-week-2024"
        },
        {
            id: 7,
            title: "SCALE NCR Study Mission in Vietnam",
            description: "The SCALE NCR Consortium touch-based with various startup ecosystem players in Ho Chi Minh and Hanoi cities in Vietnam to discuss strategies, learn best practices, and explore areas of collaboration between PH and VN stakeholders.",
            summary: "The SCALE NCR Consortium touch-based with various startup ecosystem players in Ho Chi Minh and Hanoi cities in Vietnam to discuss strategies, learn best practices, and explore areas of collaboration between PH and VN stakeholders.",
            date_published: "2024-10-28",
            image: "/assests/images/Events/SCALE_NCR_Study_Mission_in_Vietnam.png",
            slug: "scale-ncr-vietnam-study-mission"
        },
        {
            id: 8,
            title: "Startup Institute Trainings",
            description: "SCALE NCR conducts capacity-building activities to stakeholders equipping them with understanding of the innovation ecosystem.",
            summary: "SCALE NCR conducts capacity-building activities to stakeholders equipping them with understanding of the innovation ecosystem.",
            date_published: "2024-12-01",
            image: "/assests/images/Events/Startup_Institute_Trainings.png",
            slug: "startup-institute-trainings"
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
                                <div className="event-card">
                                    {event.image && (
                                        <img 
                                            src={event.image} 
                                            alt={event.title}
                                            className="event-card-image"
                                            onError={(e) => {
                                                console.log('Image failed to load:', event.image);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    )}
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
