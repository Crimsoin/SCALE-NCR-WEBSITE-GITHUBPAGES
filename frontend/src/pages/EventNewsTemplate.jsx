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
    
    // Static events data (matching Events.jsx)
    const staticEventsData = [
        {
            id: 1,
            title: "SCALE Startup Pitch Competition 2025",
            description: "Join us for the biggest startup pitch competition in the NCR! Emerging startups will present their innovative solutions to a panel of expert judges and potential investors. This competition aims to provide a platform for entrepreneurs to showcase their ideas and connect with the startup ecosystem. Participants will have the opportunity to pitch their business concepts to industry leaders, venture capitalists, and successful entrepreneurs. The event features multiple categories including technology, healthcare, fintech, and social impact startups. Winners will receive seed funding, mentorship opportunities, and access to SCALE's extensive network of partners and investors.",
            summary: "Annual startup pitch competition featuring emerging entrepreneurs and innovative solutions across various industries.",
            date_published: "2025-01-15",
            author: "Maria Santos",
            content: "The SCALE Startup Pitch Competition 2025 represents our flagship event bringing together the most promising entrepreneurs across the National Capital Region. This year's competition promises to be our largest yet, with over 200 startup applications across diverse sectors including artificial intelligence, healthcare technology, fintech, and social impact ventures.\n\nParticipants will compete in multiple rounds, starting with preliminary pitches evaluated by our panel of industry experts. The top 50 startups will advance to sector-specific semifinals, where they'll receive intensive mentorship from successful entrepreneurs and venture capitalists. The final 12 startups will present their refined pitches at our grand finale event, competing for substantial seed funding and comprehensive business support.\n\nWinners will receive not only financial investment but also access to SCALE's extensive ecosystem of partners, including legal support, marketing resources, and ongoing mentorship programs. This competition has historically launched several successful Philippine startups that have gone on to achieve significant growth and international recognition.\n\nRegistration is now open for entrepreneurs with innovative solutions addressing real-world problems. We encourage applications from diverse backgrounds and are particularly interested in startups led by women entrepreneurs and those addressing sustainable development goals.",
            image: null,
            slug: "startup-pitch-competition-2025"
        },
        {
            id: 2,
            title: "Digital Transformation Workshop Series",
            description: "A comprehensive 3-day workshop series focusing on digital transformation strategies for small and medium enterprises. Learn about cloud computing, digital marketing, automation tools, and data analytics to modernize your business operations. The workshop covers practical implementation strategies, case studies from successful digital transformations, and hands-on training with industry-standard tools. Participants will develop a personalized digital transformation roadmap for their business, learn to evaluate and select appropriate technologies, and understand how to measure the ROI of digital initiatives.",
            summary: "Learn digital transformation strategies, cloud computing, and automation tools for modern business operations.",
            date_published: "2025-01-12",
            author: "Juan dela Cruz",
            content: "Digital transformation is no longer optional for businesses seeking to remain competitive in today's rapidly evolving marketplace. Our comprehensive 3-day workshop series is designed to guide small and medium enterprises through the complexities of modernizing their operations using cutting-edge technology solutions.\n\nDay 1 focuses on foundational concepts including cloud computing migration strategies, data security protocols, and selecting appropriate digital tools for your business needs. Participants will learn to assess their current technological infrastructure and identify areas where digital solutions can drive immediate improvements in efficiency and customer satisfaction.\n\nDay 2 delves into advanced topics such as marketing automation, customer relationship management systems, and leveraging data analytics for informed decision-making. Real-world case studies from successful Philippine companies will demonstrate practical applications and measurable outcomes from digital transformation initiatives.\n\nDay 3 is dedicated to hands-on implementation, where participants work directly with industry-standard tools to create their personalized digital transformation roadmap. Expert facilitators provide one-on-one guidance to ensure each business leaves with actionable steps and realistic timelines for implementation.\n\nThis workshop series has helped over 500 SMEs successfully navigate digital transformation, resulting in an average 40% improvement in operational efficiency and 25% increase in customer engagement metrics.",
            image: null,
            slug: "digital-transformation-workshop"
        },
        {
            id: 3,
            title: "AI and Machine Learning Summit",
            description: "Explore the latest trends in artificial intelligence and machine learning with industry experts and thought leaders. This summit covers practical applications, ethical considerations, and future developments in AI technology for business and society. Featured topics include natural language processing, computer vision, predictive analytics, and AI-driven automation. The event brings together researchers, practitioners, and business leaders to discuss real-world AI implementations, challenges, and opportunities across various industries including healthcare, finance, manufacturing, and education.",
            summary: "Industry summit on AI trends, practical applications, and ethical considerations with expert speakers.",
            date_published: "2025-01-10",
            author: "Dr. Sarah Johnson",
            content: "Artificial Intelligence and Machine Learning are transforming industries at an unprecedented pace, and the Philippines is positioning itself as a key player in the Southeast Asian AI ecosystem. This summit brings together leading researchers, practitioners, and business innovators to explore how AI technologies can drive sustainable economic growth while addressing ethical considerations.\n\nOur keynote speakers include internationally recognized AI researchers who will present breakthrough developments in natural language processing, computer vision, and predictive analytics. Interactive sessions will demonstrate practical AI applications in healthcare diagnostics, financial fraud detection, agricultural optimization, and educational personalization.\n\nA dedicated ethics panel will address critical questions about AI bias, data privacy, and the societal impact of automation. Philippine case studies will highlight successful AI implementations by local companies and government agencies, showcasing how strategic AI adoption can create competitive advantages while benefiting communities.\n\nNetworking opportunities connect attendees with AI startups, research institutions, and potential investors, fostering collaboration that drives innovation. Workshop sessions provide hands-on experience with popular AI frameworks and tools, enabling participants to begin implementing AI solutions in their respective organizations.",
            image: null,
            slug: "ai-machine-learning-summit"
        },
        {
            id: 4,
            title: "Sustainable Business Practices Forum",
            description: "Discover how to integrate sustainability into your business model while maintaining profitability. Topics include green technology, circular economy, sustainable supply chains, and environmental impact measurement for modern enterprises. The forum features case studies from companies that have successfully implemented sustainable practices, workshops on measuring and reporting environmental impact, and networking opportunities with sustainability-focused investors and partners. Participants will learn about green certification processes, sustainable finance options, and consumer trends driving demand for environmentally responsible products and services.",
            summary: "Forum on integrating sustainability into business models with green technology and circular economy focus.",
            date_published: "2025-01-08",
            author: "Michael Chen",
            content: "The transition to sustainable business practices is not just an environmental imperative—it's a strategic advantage that drives innovation, reduces costs, and opens new market opportunities. This forum brings together sustainability leaders, green technology innovators, and environmentally conscious investors to explore practical pathways for businesses of all sizes.\n\nFeatured presentations include case studies from Philippine companies that have successfully implemented circular economy principles, reducing waste by up to 80% while maintaining profitability. Interactive workshops guide participants through environmental impact assessment methodologies, helping businesses identify opportunities for resource optimization and cost reduction.\n\nGreen certification processes are demystified through expert-led sessions covering international standards like ISO 14001, LEED certification, and B-Corp requirements. Participants learn to navigate certification procedures, understand compliance costs, and leverage certifications for market differentiation and access to sustainable finance options.\n\nNetworking sessions connect businesses with sustainability-focused investors, green technology providers, and potential supply chain partners committed to environmental responsibility. The forum concludes with actionable roadmaps for implementing sustainable practices, measuring progress, and communicating environmental achievements to stakeholders and customers.",
            image: null,
            slug: "sustainable-business-practices-forum"
        },
        {
            id: 5,
            title: "Fintech Innovation Conference",
            description: "The premier fintech event in the Philippines bringing together financial institutions, technology companies, and regulators. Explore blockchain, digital payments, cryptocurrency, and the future of financial services in the digital age. The conference covers regulatory frameworks, cybersecurity in financial services, open banking initiatives, and emerging technologies like central bank digital currencies (CBDCs). Attendees will gain insights into fintech partnerships, digital lending platforms, insurtech innovations, and the evolving landscape of financial inclusion in Southeast Asia.",
            summary: "Premier fintech conference exploring blockchain, digital payments, and the future of financial services.",
            date_published: "2025-01-05",
            author: "Anna Rodriguez",
            content: "The Philippine fintech ecosystem has experienced remarkable growth, with digital payment adoption reaching 85% among urban consumers and digital lending platforms serving previously unbanked populations. This premier conference examines emerging trends, regulatory developments, and innovation opportunities shaping the future of financial services in Southeast Asia.\n\nExpert panels featuring central bank officials, fintech entrepreneurs, and traditional banking executives explore the evolving regulatory landscape and collaboration opportunities between established financial institutions and innovative fintech startups. Blockchain and cryptocurrency sessions address practical applications, regulatory compliance, and the potential for central bank digital currencies (CBDCs) in the Philippines.\n\nStartup showcase sessions feature emerging fintech companies presenting solutions in areas such as micro-lending, insurance technology, robo-advisory services, and cross-border payments. Investment forums connect promising fintech startups with venture capitalists and strategic investors actively seeking opportunities in the rapidly growing Philippine market.",
            image: null,
            slug: "fintech-innovation-conference"
        },
        {
            id: 6,
            title: "Women in Tech Leadership Panel",
            description: "Celebrating women leaders in technology and entrepreneurship. This panel discussion features successful female executives sharing their experiences, challenges, and strategies for building inclusive tech companies and advancing women in STEM fields. The event addresses gender diversity in tech leadership, mentorship programs for women in technology, work-life balance strategies, and creating inclusive workplace cultures. Panelists will share practical advice on career advancement, networking strategies, and overcoming barriers in male-dominated industries.",
            summary: "Panel celebrating women leaders in technology, featuring successful executives sharing experiences and strategies.",
            date_published: "2025-01-03",
            author: "Lisa Wang",
            content: "Gender diversity in technology leadership remains a critical challenge, with women holding only 25% of senior technology roles in the Philippines despite comprising nearly half of the tech workforce. This panel brings together successful female executives, entrepreneurs, and innovators to share strategies for advancing women's careers in technology and creating more inclusive workplace cultures.\n\nPanelists share personal experiences navigating male-dominated industries, building support networks, and overcoming barriers to career advancement. Practical advice covers negotiation strategies, leadership development, work-life balance approaches, and building confidence in technical decision-making roles.\n\nMentorship program announcements connect aspiring female technologists with established leaders, providing structured guidance and career development opportunities. The panel concludes with actionable steps for organizations seeking to improve gender diversity in their technology teams and leadership structures.",
            image: null,
            slug: "women-in-tech-leadership-panel"
        },
        {
            id: 7,
            title: "Blockchain and Web3 Developer Bootcamp",
            description: "Intensive 5-day bootcamp for developers interested in blockchain technology and Web3 development. Learn smart contract programming, DeFi protocols, NFT development, and decentralized application building with hands-on projects. The bootcamp covers Solidity programming, blockchain architecture, consensus mechanisms, and security best practices. Participants will work on real projects including creating their own cryptocurrency, building a decentralized marketplace, and developing smart contracts for various use cases. Industry experts will provide mentorship and career guidance for blockchain development opportunities.",
            summary: "Intensive developer bootcamp covering blockchain, smart contracts, DeFi, and decentralized applications.",
            date_published: "2024-12-28",
            author: "David Park",
            content: "Blockchain technology and Web3 development represent the next frontier of decentralized internet applications. This intensive bootcamp provides comprehensive training in smart contract programming, DeFi protocol development, and building decentralized applications that leverage blockchain's transparency and security benefits.\n\nParticipants learn Solidity programming through hands-on projects including creating ERC-20 tokens, building NFT marketplaces, and developing smart contracts for various business applications. Advanced topics cover gas optimization, security best practices, and integration with popular blockchain networks including Ethereum and Binance Smart Chain.\n\nReal-world projects challenge participants to build complete dApps from concept to deployment, with mentorship from experienced blockchain developers currently working on live projects. Career guidance sessions explore opportunities in the rapidly growing blockchain industry, including positions at startups, established tech companies, and blockchain-specific organizations.",
            image: null,
            slug: "blockchain-web3-developer-bootcamp"
        },
        {
            id: 8,
            title: "E-commerce Growth Strategies Seminar",
            description: "Master the art of growing your online business with proven e-commerce strategies. Topics include marketplace optimization, social media marketing, customer retention, inventory management, and scaling operations effectively. The seminar covers platform-specific strategies for Shopify, Amazon, Lazada, and Shopee, as well as omnichannel retail approaches. Participants will learn about conversion rate optimization, email marketing automation, influencer partnerships, and using data analytics to drive growth decisions.",
            summary: "Seminar on e-commerce growth covering marketplace optimization, social media marketing, and scaling operations.",
            date_published: "2024-12-25",
            image: null,
            slug: "ecommerce-growth-strategies-seminar",
            author: "Carlos Mendoza",
            content: "E-commerce growth in the Philippines has accelerated dramatically, with online retail sales increasing by 300% over the past three years. This seminar provides actionable strategies for businesses seeking to capitalize on digital commerce opportunities while navigating platform-specific requirements and consumer behavior trends.\n\nPlatform optimization sessions cover best practices for major marketplaces including Shopify, Lazada, Shopee, and Amazon, with insights into algorithm optimization, product listing strategies, and inventory management across multiple channels. Social commerce strategies explore leveraging Facebook, Instagram, and TikTok for direct sales and brand building.\n\nCustomer acquisition and retention workshops provide frameworks for email marketing automation, loyalty program development, and personalized shopping experiences that drive repeat purchases. Data analytics training helps participants understand key performance indicators, conversion funnel optimization, and using customer insights to drive growth decisions.",
        },
        {
            id: 9,
            title: "Startup Legal Workshop: IP and Compliance",
            description: "Essential legal knowledge for startups covering intellectual property protection, business registration, compliance requirements, and contract negotiations. Legal experts provide practical guidance for protecting your startup's interests. The workshop covers trademark and copyright protection, patent filing processes, employment law basics, data privacy compliance, and international expansion legal considerations. Participants will learn to navigate regulatory requirements, understand equity structures, and protect their innovations while scaling their business operations.",
            summary: "Legal workshop covering intellectual property protection, compliance requirements, and startup legal essentials.",
            date_published: "2024-12-22",
            author: "Jennifer Lee",
            content: "Legal compliance and intellectual property protection are fundamental to startup success, yet many entrepreneurs lack the knowledge to properly protect their innovations and navigate regulatory requirements. This workshop provides essential legal education tailored specifically for technology startups and innovative businesses.\n\nIntellectual property sessions cover trademark registration, copyright protection, and patent filing strategies, with practical guidance on when and how to protect different types of innovations. Employment law basics address contractor versus employee classifications, equity compensation structures, and creating compliant workplace policies.\n\nData privacy and cybersecurity compliance workshops ensure startups understand obligations under Philippine data protection laws and international standards like GDPR. Contract negotiation training covers common startup agreements including founder agreements, investor terms, customer contracts, and vendor relationships.",
            image: null,
            slug: "startup-legal-workshop"
        },
        {
            id: 10,
            title: "IoT and Smart Cities Innovation Expo",
            description: "Explore the Internet of Things and smart city solutions that are transforming urban living. Featuring demonstrations of smart infrastructure, connected devices, urban analytics, and sustainable city technologies. The expo showcases smart traffic management systems, environmental monitoring solutions, waste management innovations, and citizen engagement platforms. Attendees will experience live demonstrations of IoT devices, learn about data integration challenges, and explore opportunities for public-private partnerships in smart city development.",
            summary: "Innovation expo showcasing IoT solutions, smart infrastructure, and sustainable city technologies.",
            date_published: "2024-12-20",
            author: "Roberto Silva",
            content: "Smart city technologies are transforming urban infrastructure across the Philippines, with Metro Manila, Cebu, and Davao implementing IoT solutions for traffic management, environmental monitoring, and public service delivery. This expo showcases cutting-edge technologies and practical implementation strategies for creating more livable, sustainable urban environments.\n\nLive demonstrations feature smart traffic management systems that reduce congestion by 35%, environmental sensors providing real-time air quality monitoring, and waste management solutions that optimize collection routes and reduce operational costs. Interactive exhibits allow visitors to experience smart city applications firsthand.\n\nPublic-private partnership sessions explore collaboration models for implementing smart city projects, including financing structures, technology procurement processes, and performance measurement frameworks. Case studies from successful Philippine smart city initiatives provide practical insights into overcoming implementation challenges and achieving measurable improvements in citizen services.",
            image: null,
            slug: "iot-smart-cities-expo"
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
