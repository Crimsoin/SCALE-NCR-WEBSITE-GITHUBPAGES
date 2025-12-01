import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EventNewsTemplate.css';
import { getEventBySlug, getPublishedEvents } from '../services/eventsService';
import LoadingSpinner from '../components/LoadingSpinner';

const EventNewsTemplate = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [otherStories, setOtherStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allEvents, setAllEvents] = useState([]);
    
    useEffect(() => {
        fetchEventData();
    }, [slug]);
    
    // Static events data - SCALE NCR Events with exact data provided
    const staticEventsData = [
        {
            id: 1,
            title: "SCALE NCR General Assembly and Press Conference",
            description: "The first general assembly of the founding and general members of the consortium was held to orient members about the regulations, mission, vision, goals, and objectives of SCALE NCR. The event also served as the formal introduction of the consortium to the members of the press, as well as an opportunity to present its upcoming activities and projects.",
            summary: "The first general assembly of the founding and general members of the consortium was held to orient members about the regulations, mission, vision, goals, and objectives of SCALE NCR. The event also served as the formal introduction of the consortium to the members of the press, as well as an opportunity to present its upcoming activities and projects.",
            date_published: "2024-08-29",
            author: "",
            venue: "QBO Innovation HQ, Makati City",
            image: "/assests/images/Events/SCALE_NCR_General_Assembly_and_Press_Conference.png",
            content: "The first general assembly of the founding and general members of the consortium was held to orient members about the regulations, mission, vision, goals, and objectives of SCALE NCR. The event also served as the formal introduction of the consortium to the members of the press, as well as an opportunity to present its upcoming activities and projects.",
            slug: "scale-ncr-general-assembly-press-conference"
        },
        {
            id: 2,
            title: "SCALE NCR 2025 Planning Session",
            description: "The founding members of SCALE NCR convened to discuss and plan the consortium's Year 2 deliverables. The meeting focused on reviewing the progress and achievements from the previous year, identifying key areas for improvement, and setting strategic priorities for the consortium's continued growth and impact. Members also collaborated on outlining upcoming programs, capacity-building initiatives, and partnerships that will further strengthen the innovation ecosystem across the NCR region.",
            summary: "The founding members of SCALE NCR convened to discuss and plan the consortium's Year 2 deliverables. The meeting focused on reviewing the progress and achievements from the previous year, identifying key areas for improvement, and setting strategic priorities for the consortium's continued growth and impact. Members also collaborated on outlining upcoming programs, capacity-building initiatives, and partnerships that will further strengthen the innovation ecosystem across the NCR region.",
            date_published: "2025-01-16",
            author: "",
            venue: "TomasInno Center, University of Santo Tomas, Manila",
            image: "/assests/images/Events/SCALE_NCR_2025_Planning_Session.png",
            content: "The founding members of SCALE NCR convened to discuss and plan the consortium's Year 2 deliverables. The meeting focused on reviewing the progress and achievements from the previous year, identifying key areas for improvement, and setting strategic priorities for the consortium's continued growth and impact. Members also collaborated on outlining upcoming programs, capacity-building initiatives, and partnerships that will further strengthen the innovation ecosystem across the NCR region.",
            slug: "scale-ncr-2025-planning-session"
        },
        {
            id: 3,
            title: "Startup Ecosystem and Innovation Mapping Orientation Meeting with NCR City Clusters",
            description: "The NCR Startup Ecosystem and Innovation Mapping aims to identify the strengths, gaps, opportunities, and challenges of each city in the National Capital Region. This initiative will also serve as a valuable guide for leaders and stakeholders in enhancing their services relevant to the startup and innovation ecosystem, thereby strengthening their programs and improving their overall standing.\n\nPAMAMARISAN - April 24, 2024\nCAMANAVA + QC - May 17, 2024\nPAMAMA - May 28, 2024\nMUNTAPARLAS - June 11, 2024",
            summary: "The NCR Startup Ecosystem and Innovation Mapping aims to identify the strengths, gaps, opportunities, and challenges of each city in the National Capital Region. This initiative will also serve as a valuable guide for leaders and stakeholders in enhancing their services relevant to the startup and innovation ecosystem, thereby strengthening their programs and improving their overall standing.\n\nPAMAMARISAN - April 24, 2024\nCAMANAVA + QC - May 17, 2024\nPAMAMA - May 28, 2024\nMUNTAPARLAS - June 11, 2024",
            date_published: "",
            author: "",
            venue: "",
            image: "/assests/images/Events/NCR_City_Clusters_Mapping.png",
            content: "The NCR Startup Ecosystem and Innovation Mapping aims to identify the strengths, gaps, opportunities, and challenges of each city in the National Capital Region. This initiative will also serve as a valuable guide for leaders and stakeholders in enhancing their services relevant to the startup and innovation ecosystem, thereby strengthening their programs and improving their overall standing.\n\nPAMAMARISAN - April 24, 2024\nCAMANAVA + QC - May 17, 2024\nPAMAMA - May 28, 2024\nMUNTAPARLAS - June 11, 2024",
            slug: "startup-ecosystem-innovation-mapping-ncr-clusters"
        },
        {
            id: 4,
            title: "NCT TBI Summit",
            description: "This region-wide event aims to bring together key players and stakeholders in the NCR Startup and Innovation Ecosystem to talk about the challenges, bridge gaps, and celebrate milestones in advancing the culture of innovation in the region.",
            summary: "This region-wide event aims to bring together key players and stakeholders in the NCR Startup and Innovation Ecosystem to talk about the challenges, bridge gaps, and celebrate milestones in advancing the culture of innovation in the region.",
            date_published: "2024-10-10",
            author: "",
            venue: "Novotel Hotel, Quezon City",
            image: "/assests/images/Events/NCT_TBI_Summit.png",
            content: "This region-wide event aims to bring together key players and stakeholders in the NCR Startup and Innovation Ecosystem to talk about the challenges, bridge gaps, and celebrate milestones in advancing the culture of innovation in the region.",
            slug: "nct-tbi-summit"
        },
        {
            id: 5,
            title: "Regional Startup and Ecosystem Mapping Activities",
            description: "The SCALE NCR has also been tapped by stakeholders outside the National Capital Region to support initiatives in mapping their respective startup ecosystems.\n\nLanao Del Norte, Surigao, Isabela, Quirino, Nueve Vizcaya, Negros Island, Bacolod, Iloilo, and Ilocos",
            summary: "The SCALE NCR has also been tapped by stakeholders outside the National Capital Region to support initiatives in mapping their respective startup ecosystems.\n\nLanao Del Norte, Surigao, Isabela, Quirino, Nueve Vizcaya, Negros Island, Bacolod, Iloilo, and Ilocos",
            date_published: "",
            author: "",
            venue: "",
            image: "/assests/images/Events/Regional_Startup_and_Ecosystem_Mapping_Activities.jpg",
            content: "The SCALE NCR has also been tapped by stakeholders outside the National Capital Region to support initiatives in mapping their respective startup ecosystems.\n\nLanao Del Norte, Surigao, Isabela, Quirino, Nueve Vizcaya, Negros Island, Bacolod, Iloilo, and Ilocos",
            slug: "regional-startup-ecosystem-mapping-activities"
        },
        {
            id: 6,
            title: "Philippine Startup Week 2024",
            description: "A nationwide event where startup ecosystem enablers, startups, and players get together to share ideas, platforms, showcase their innovation to the community.",
            summary: "A nationwide event where startup ecosystem enablers, startups, and players get together to share ideas, platforms, showcase their innovation to the community.",
            date_published: "2025-11-11",
            author: "",
            venue: "",
            image: "/assests/images/Events/Philippine_Startup_Week_2024.png",
            content: "A nationwide event where startup ecosystem enablers, startups, and players get together to share ideas, platforms, showcase their innovation to the community.",
            slug: "philippine-startup-week-2024"
        },
        {
            id: 7,
            title: "SCALE NCR Study Mission in Vietnam",
            description: "The SCALE NCR Consortium touch-based with various startup ecosystem players in Ho Chi Minh and Hanoi cities in Vietnam to discuss strategies, learn best practices, and explore areas of collaboration between PH and VN stakeholders.",
            summary: "The SCALE NCR Consortium touch-based with various startup ecosystem players in Ho Chi Minh and Hanoi cities in Vietnam to discuss strategies, learn best practices, and explore areas of collaboration between PH and VN stakeholders.",
            date_published: "2024-10-28",
            author: "",
            venue: "",
            image: "/assests/images/Events/SCALE_NCR_Study_Mission_in_Vietnam.png",
            content: "The SCALE NCR Consortium touch-based with various startup ecosystem players in Ho Chi Minh and Hanoi cities in Vietnam to discuss strategies, learn best practices, and explore areas of collaboration between PH and VN stakeholders.",
            slug: "scale-ncr-vietnam-study-mission"
        },
        {
            id: 8,
            title: "Startup Institute Trainings",
            description: "SCALE NCR conducts capacity-building activities to stakeholders equipping them with understanding of the innovation ecosystem.",
            summary: "SCALE NCR conducts capacity-building activities to stakeholders equipping them with understanding of the innovation ecosystem.",
            date_published: "",
            author: "",
            venue: "",
            image: "/assests/images/Events/Startup_Institute_Trainings.png",
            content: "SCALE NCR conducts capacity-building activities to stakeholders equipping them with understanding of the innovation ecosystem.",
            slug: "startup-institute-trainings"
        }
    ];

    const fetchEventData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Find event in static data by slug
            const foundEvent = staticEventsData.find(event => event.slug === slug);
            
            if (foundEvent) {
                setEvent(foundEvent);
                document.title = `${foundEvent.title} | SCALE`;
            } else {
                setError('Event not found');
            }
            
            // Get other events for sidebar (exclude current event)
            const filtered = staticEventsData.filter(e => e.slug !== slug);
            setOtherStories(filtered.slice(0, 5));
            setAllEvents(staticEventsData);
        } catch (error) {
            console.error('Error loading event:', error);
            setError('Failed to load event. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    const formatContent = (content) => {
        if (!content) return '';
        // Convert line breaks to <p> tags for proper paragraph spacing
        return content
            .split('\n\n')
            .filter(para => para.trim())
            .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
            .join('');
    };
    
    const handlePrevious = () => {
        const currentIndex = allEvents.findIndex(e => e.slug === slug);
        if (currentIndex > 0) {
            navigate(`/events/${allEvents[currentIndex - 1].slug}`);
        }
    };
    
    const handleNext = () => {
        const currentIndex = allEvents.findIndex(e => e.slug === slug);
        if (currentIndex < allEvents.length - 1) {
            navigate(`/events/${allEvents[currentIndex + 1].slug}`);
        }
    };
    
    const currentIndex = allEvents.findIndex(e => e.slug === slug);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < allEvents.length - 1;
    
    if (loading) {
        return (
            <div className="event-news-template-page">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <LoadingSpinner message="Loading event..." />
                </div>
            </div>
        );
    }
    
    if (error || !event) {
        return (
            <div className="event-news-template-page">
                <div style={{ padding: '100px 20px', textAlign: 'center' }}>
                    <h2>{error || 'Event not found'}</h2>
                    <Link to="/events" style={{ marginTop: '20px', display: 'inline-block', color: '#EF7D22' }}>
                        ← Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="event-news-template-page">
            <section className="EventNewsTemplate-Hero">
                <div className="event-news-template-container">

                    
                    {/* Breadcrumb Navigation */}
                    <div className="breadcrumb">
                        <Link to="/events" className="breadcrumb-link">NEWS</Link>
                        <span className="breadcrumb-separator">&gt;</span>
                        <span className="breadcrumb-current">{event.title}</span>
                    </div>








                    {/* Main Content Layout */}
                    <div className="event-news-main-layout">

                        <div className="event-news-main-layout-sections">


                            {/* Left Content */}                        
                            <div className="event-news-left-content">
                                <h1 className="event-news-title">{event.title}</h1>                       
                                <div className="event-news-meta">
                                    <span className="event-news-author">Author: {event.author}</span>
                                    <span className="event-news-date">Date Published: {formatDate(event.date_published)}</span>
                                </div>
                                {/* Featured Image */}
                                {event.image ? (
                                    <div className="event-news-featured-image" style={{ backgroundImage: `url(${event.image})` }}>
                                    </div>
                                ) : (
                                    <div className="event-news-featured-image">
                                        <span>Event Image</span>
                                    </div>
                                )}
                                {/* Article Content */}
                                <div className="event-news-content">
                                    <div dangerouslySetInnerHTML={{ __html: formatContent(event.content) }} />
                                </div>
                            </div>





                            {/* Right Sidebar - Other Stories */}
                            <div className="event-news-sidebar">
                                <h2 className="sidebar-title">Other Stories</h2>
                                <div className="other-stories-list">
                                    {otherStories.map((story) => (
                                        <Link to={`/events/${story.slug}`} key={story.id} className="story-card">
                                            {story.image ? (
                                                <div className="story-image" style={{ backgroundImage: `url(${story.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                                </div>
                                            ) : (
                                                <div className="story-image">
                                                    <span>Image</span>
                                                </div>
                                            )}
                                            <div className="story-content">
                                                <h3 className="story-title">{story.title}</h3>
                                                <p className="story-excerpt">{story.summary || story.description || 'Read more...'}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>








                        </div>
                    </div>










                    {/* Navigation Buttons */}
                    <div className="event-news-navigation">
                        <button 
                            onClick={handlePrevious} 
                            className={`nav-button prev-button ${!hasPrevious ? 'disabled' : ''}`}
                            disabled={!hasPrevious}
                        >
                            PREVIOUS
                        </button>
                        <button 
                            onClick={handleNext} 
                            className={`nav-button next-button ${!hasNext ? 'disabled' : ''}`}
                            disabled={!hasNext}
                        >
                            NEXT
                        </button>
                    </div>      






                </div>
            </section>
        </div>
    );
};

export default EventNewsTemplate;
