import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import slide1 from '../assests/images/Home/HOME-Slideshow-1.png';
import slide2 from '../assests/images/Home/HOME-Slideshow-2.png';
import slide3 from '../assests/images/Home/HOME-Slideshow-3.png';
import slide4 from '../assests/images/Home/HOME-Slideshow-4.png';
import ctaBg from '../assests/images/Home/Home-Cta-1-Background.png';
import cta2 from '../assests/images/Home/CTA2-image.png';
import incubator1 from '../assests/images/Home/Incubator/Incubator_1.png';
import incubator2 from '../assests/images/Home/Incubator/Incubator_2.png';
import incubator3 from '../assests/images/Home/Incubator/Incubator_3.png';
import incubator4 from '../assests/images/Home/Incubator/Incubator_4.png';
import incubator5 from '../assests/images/Home/Incubator/Incubator_5.png';
import incubator6 from '../assests/images/Home/Incubator/Incubator_6.png';
import incubator7 from '../assests/images/Home/Incubator/Incubator_7.png';
import incubator8 from '../assests/images/Home/Incubator/Incubator_8.png';
import incubator9 from '../assests/images/Home/Incubator/Incubator_9.png';
import member1 from '../assests/images/Home/Members/1.png';
import member2 from '../assests/images/Home/Members/2.png';
import member3 from '../assests/images/Home/Members/3.png';
import member4 from '../assests/images/Home/Members/4.png';
import member5 from '../assests/images/Home/Members/5.png';
import member6 from '../assests/images/Home/Members/6.png';
import member7 from '../assests/images/Home/Members/7.png';
import member8 from '../assests/images/Home/Members/8.png';
import member9 from '../assests/images/Home/Members/9.png';
import member10 from '../assests/images/Home/Members/10.png';
import member11 from '../assests/images/Home/Members/11.png';
import member12 from '../assests/images/Home/Members/12.png';
import member13 from '../assests/images/Home/Members/13.png';
import member14 from '../assests/images/Home/Members/14.png';
import member15 from '../assests/images/Home/Members/15.png';
import member16 from '../assests/images/Home/Members/16.png';
import member17 from '../assests/images/Home/Members/17.png';
import { getFeaturedStartups } from '../services/startupsService';
import { getHomePage } from '../services/pagesService';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';

const Home = () => {
  const [homeSettings, setHomeSettings] = useState(null);
  const [featuredStartups, setFeaturedStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set page title
  useEffect(() => {
    document.title = 'Home | SCALE';
  }, []);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  // Static featured startups and consortium data
  const staticFeaturedData = [];

  const fetchHomeContent = async () => {
    setLoading(true);
    setError(null);
    
    // Fetch home page content and set static featured startups
    try {
      const pageResult = await getHomePage();
      if (pageResult.success && pageResult.data) {
        setHomeSettings(pageResult.data.content);
      }
    } catch (error) {
      console.error('Error fetching home page content:', error);
      // Don't block other content from loading
    }
    
    // Use static featured startups data
    setFeaturedStartups(staticFeaturedData);
    
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Static slideshow data using SCALE event images
  const slides = [
    {
      imageUrl: slide1,
      showOverlay: false,
      title: 'SCALING STARTUPS TOGETHER',
      description: 'Empowering innovation and entrepreneurship in the National Capital Region through collaborative partnerships and support programs.'
    },
    {
      imageUrl: slide2,
      showOverlay: true,
      title: 'BUILDING STRONG COMMUNITIES',
      description: 'Fostering connections and collaboration among entrepreneurs, investors, and industry leaders to create a thriving startup ecosystem.'
    },
    {
      imageUrl: slide3,
      showOverlay: true,
      title: 'KNOWLEDGE SHARING SESSIONS',
      description: 'Expert-led discussions and panel sessions providing valuable insights and strategies for startup growth and development.'
    },
    {
      imageUrl: slide4,
      showOverlay: true,
      title: 'NETWORKING & COLLABORATION',
      description: 'Creating opportunities for meaningful connections and partnerships that drive innovation and business success.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef(null);

  // navigation is handled via dots and autoplay

  useEffect(() => {
    // autoplay every 5 seconds
    if (slides.length > 0) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(slideIntervalRef.current);
  }, [slides.length]); // run when slides change

  return (
    <div className="home-page">
      <SEO
        title="SCALE NCR - Technology Business Incubator | Supporting Innovation & Entrepreneurship"
        description="SCALE NCR supports startups and enterprises through innovation programs, business incubation, and entrepreneurship development in the National Capital Region, Philippines."
        keywords="SCALE NCR, technology business incubator, startup incubator, entrepreneurship, innovation hub, business development, NCR Philippines, startup ecosystem, TBI"
        canonicalUrl="https://yoursite.com/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Home - SCALE NCR",
          "description": "SCALE NCR Technology Business Incubator homepage",
          "url": "https://yoursite.com/"
        }}
      />

      {!loading && (
        <section className="Home-Hero-Slideshow">
          <div className="slider">
            <div className="slides">
              {slides.length > 0 && slides[0].imageUrl ? (
                slides.map((slide, idx) => (
                  <div
                    className={`slide ${idx === currentIndex ? 'active' : ''}`}
                    key={idx}
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                  >
                    {slide.showOverlay && slide.title && (
                      <div className="slide-overlay">
                        <div className="slide-content">
                          <h1 className="slide-title">{slide.title}</h1>
                          {slide.description && (
                            <p className="slide-description">{slide.description}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="slide active" style={{ backgroundColor: '#f0f0f0' }}>
                  {/* Empty slide placeholder */}
                </div>
              )}
            </div>

            {slides.length > 0 && slides[0].imageUrl && (
              <div className="slider-dots">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="Founding-Incubator">
            <div className="founding-inner">
              <h2>FOUNDING TECHNOLOGY BUSINESS INCUBATORS</h2>
              <div className="Home-Founding-Boxes" aria-hidden="false">
                <div className="Home-Founding-Incubator-Logo">
                  <img src={incubator1} alt="Incubator 1" loading="lazy" />
                </div>
                <div className="Home-Founding-Incubator-Logo cover-fit">
                  <img src={incubator2} alt="Incubator 2" loading="lazy" />
                </div>
                <div className="Home-Founding-Incubator-Logo">
                  <img src={incubator3} alt="Incubator 3" loading="lazy" />
                </div>
                <div className="Home-Founding-Incubator-Logo cover-fit">
                  <img src={incubator4} alt="Incubator 4" loading="lazy" />
                </div>
                <div className="Home-Founding-Incubator-Logo cover-fit">
                  <img src={incubator5} alt="Incubator 5" loading="lazy" />
                </div>
                <div className="Home-Founding-Incubator-Logo">
                  <img src={incubator6} alt="Incubator 6" loading="lazy" />
                </div>
                <div className="Home-Founding-Incubator-Logo">
                  <img src={incubator7} alt="Incubator 7" loading="lazy" />
                </div>
                <div className="Home-Founding-Incubator-Logo">
                  <img src={incubator8} alt="Incubator 8" loading="lazy" />
                </div>
                <div className="Home-Founding-Incubator-Logo">
                  <img src={incubator9} alt="Incubator 9" loading="lazy" />
                </div>
              </div>
            </div>
      </section>

      <section className="General-Members">
            <div className="general-members-inner">
              <h2>GENERAL MEMBERS</h2>
              <div className="Home-General-Members-Boxes" aria-hidden="false">
                <div className="Home-General-Member-Logo">
                  <img src={member1} alt="General Member 1" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member2} alt="General Member 2" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member3} alt="General Member 3" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member4} alt="General Member 4" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member5} alt="General Member 5" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member6} alt="General Member 6" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member7} alt="General Member 7" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member8} alt="General Member 8" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member9} alt="General Member 9" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member10} alt="General Member 10" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member11} alt="General Member 11" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member12} alt="General Member 12" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member13} alt="General Member 13" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member14} alt="General Member 14" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member15} alt="General Member 15" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member16} alt="General Member 16" />
                </div>
                <div className="Home-General-Member-Logo">
                  <img src={member17} alt="General Member 17" />
                </div>
              </div>
            </div>
      </section>

      <section className="Home-Cta-1" style={{ backgroundImage: `url(${ctaBg})` }} aria-label="Call to action">
        <div className="Home-Cta-1-container">
          <h2 className="Home-cta-title">!! EXCITING NEWS !!</h2>
          <h3 className="Home-cta-subtitle">We are thrilled to be a partner of &lt;organization&gt;</h3>
          <p className="Home-cta-description">
            Happening on &lt;date&gt; at the &lt;place&gt;, 
            &lt;event&gt; is set to be an extraordinary event, bringing 
            together the brightest minds, pioneering startups, and 
            influential industry leaders.
            <br />
            <br />
            Get <strong>50%</strong> off Premier passes when you 
            use our promo code <strong>SCALE50</strong>.
          </p>

          <button className="Home-cta-button" onClick={() => window.location.href = '#'}>
            sign up now
          </button>
        </div>
      </section>

      <section className="Featured-Startups">
        <div className="Featured-Startups-Content">
          <div className="Featured-Startups-Title">FEATURED STARTUPS</div>
          {loading ? (
            <LoadingSpinner message="Loading featured startups..." />
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>{error}</div>
          ) : featuredStartups.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>No featured startups available</div>
          ) : (
            <div className="Featured-Startups-Container">
              {featuredStartups.map((startup) => (
                <Link to={`/directory/${startup.type}/${startup.id}`} key={startup.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="Featured-Startups-Card">
                    <div className="Featured-Startups-Image-Placeholder" 
                         style={startup.image ? {backgroundImage: `url(${startup.image})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>
                      {!startup.image && 'Image'}
                    </div>
                    <div className="Featured-Startups-Meta">
                      <h3 className="Featured-Startups-Team-Loc">{startup.location?.toUpperCase() || 'LOCATION'}</h3>
                      <p className="Featured-Startups-Team-Name">{startup.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>       
      </section>



      <section className="Home-Cta-2">
        <div className="Home-Cta-2-inner">
          <div className="Home-Cta-2-left">
            <div className="Home-Cta-2-placeholder" aria-hidden="true">
              <img src={cta2} alt="Speaker at SCALE Event" className="Home-Cta-2-placeholder" loading="lazy" />
            </div>
          </div>
          <div className="Home-Cta-2-right">
            <div className="Home-Cta-2-right-content">
              <div className="cta2-title">LOOKING BACK: EVENT 2025 LOREM IPSUM</div>
              <div className="cta2-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </div>
              <button className="cta2-button" onClick={() => window.location.href = '#'}>
                check it out
              </button>
            </div>
          </div>
        </div>
      </section> 

    </div>
  );
};

export default Home;