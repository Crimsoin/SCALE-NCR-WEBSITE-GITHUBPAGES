import React, { useState, useEffect } from 'react';
import './About.css'; 
import AboutHero from '../assests/images/About/About-Hero-Background.png';
import MissionImg from '../assests/images/About/Mission-Title.png'; // added import
import VisionImg from '../assests/images/About/Vision-Title.png'; // added import
import imagaplaceholder from '../assests/images/About/CTA1-image.png'; // added import
import incubator1 from '../assests/images/Home/Incubator/Incubator_1.png';
import incubator2 from '../assests/images/Home/Incubator/Incubator_2.png';
import incubator3 from '../assests/images/Home/Incubator/Incubator_3.png';
import incubator4 from '../assests/images/Home/Incubator/Incubator_4.png';
import incubator5 from '../assests/images/Home/Incubator/Incubator_5.png';
import incubator6 from '../assests/images/Home/Incubator/Incubator_6.png';
import incubator7 from '../assests/images/Home/Incubator/Incubator_7.png';
import incubator8 from '../assests/images/Home/Incubator/Incubator_8.png';
import teamMaria from '../assests/images/About/team-maria-santos.jpg';
import teamJuan from '../assests/images/About/team-juan-delacruz.jpg';
import teamSarah from '../assests/images/About/team-sarah-johnson.jpg';
import teamMichael from '../assests/images/About/team-michael-chen.jpg';
import teamAnna from '../assests/images/About/team-anna-rodriguez.jpg';
import teamDavid from '../assests/images/About/team-david-park.jpg';
import teamLisa from '../assests/images/About/team-lisa-wang.jpg';
import teamCarlos from '../assests/images/About/team-carlos-mendoza.jpg';
import teamJennifer from '../assests/images/About/team-jennifer-lee.jpg';
import teamRoberto from '../assests/images/About/team-roberto-silva.jpg';
import { getTeamMembers } from '../services/teamService';
import { getAboutPage } from '../services/pagesService';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Set page title
  useEffect(() => {
    document.title = 'About | SCALE';
  }, []);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    setLoading(true);
    setError(null);
    
    // Fetch team members and about page content separately so one failure doesn't affect the other
    try {
      const teamResult = await getTeamMembers();
      
      if (teamResult.success && teamResult.data) {
        setTeamMembers(teamResult.data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      // Don't set global error, just log it
    }
    
    // Fetch about page content separately
    try {
      const pageResult = await getAboutPage();
      
      if (pageResult.success && pageResult.data) {
        setAboutContent(pageResult.data.content);
      }
    } catch (error) {
      console.error('Error fetching about page content:', error);
      // Don't block team members from showing
    }
    
    setLoading(false);
  };

  return (
    <div className="about-page">
      <SEO
        title="About Us | SCALE NCR - Our Mission, Vision & Team"
        description="Learn about SCALE NCR's mission to support startups and entrepreneurs. Meet our team and discover our vision for innovation and business development in NCR, Philippines."
        keywords="SCALE NCR about, mission vision, team, technology business incubator, startup support, entrepreneurship programs"
        canonicalUrl="https://www.scalencr.org/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About SCALE NCR",
          "description": "Learn about SCALE NCR's mission, vision, and team",
          "url": "https://www.scalencr.org/about"
        }}
      />
      <section className="About-Hero" style={{ backgroundImage: `url(${AboutHero})` }}>
        <div className="About-Hero-Content">
          <div className='About-Hero-Introduction'>
            <h1 className="About-Hero-Introduction-Title">{aboutContent?.whoAreWeTitle || 'WHO ARE WE'}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </p>
          </div>

          <div className='About-Hero-Founding-TBI'>
            <h1 className="About-Hero-Founding-TBI-Title">FOUNDING TBIs</h1>
            <div className='About-Hero-Founding-TBI-Logo-Container'>
              <div className='About-Hero-Founding-TBI-Logo'>
                <img src={incubator1} alt="Incubator 1" loading="lazy" />
              </div>
              <div className='About-Hero-Founding-TBI-Logo cover-fit'>
                <img src={incubator2} alt="Incubator 2" loading="lazy" />
              </div>
              <div className='About-Hero-Founding-TBI-Logo'>
                <img src={incubator3} alt="Incubator 3" loading="lazy" />
              </div>
              <div className='About-Hero-Founding-TBI-Logo cover-fit'>
                <img src={incubator4} alt="Incubator 4" loading="lazy" />
              </div>
              <div className='About-Hero-Founding-TBI-Logo cover-fit'>
                <img src={incubator5} alt="Incubator 5" loading="lazy" />
              </div>
              <div className='About-Hero-Founding-TBI-Logo'>
                <img src={incubator6} alt="Incubator 6" loading="lazy" />
              </div>
              <div className='About-Hero-Founding-TBI-Logo'>
                <img src={incubator7} alt="Incubator 7" loading="lazy" />
              </div>
              <div className='About-Hero-Founding-TBI-Logo'>
                <img src={incubator8} alt="Incubator 8" loading="lazy" />
              </div>
            </div>            
          </div>
        </div>        

      </section>

      <section className="About-Mission-Vision">
        <div className="About-Mission-Vision-Content">
          <div className='About-Mission'>
            <img src={MissionImg} alt="Mission" className="About-Mission-Image" loading="lazy" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
          </div>
          <div className='About-Vision'>
            <img src={VisionImg} alt="Vision" className="About-Vision-Image" loading="lazy" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
          </div>
        </div>
      </section>    

      <section className="About-Cta-1">
        <div className="About-Cta-1-inner">
          <div className="About-Cta-1-left">
            <div className="About-Cta-1-placeholder" aria-hidden="true">
              <img src={imagaplaceholder} alt="Team Working Together" className="Home-Cta-2-placeholder" loading="lazy" />
            </div>
          </div>
          <div className="About-Cta-1-right">
            <div className="About-Cta-1-right-content">
              <div className="cta1-title">WHAT IS THE RESEED PROGRAM ?</div>
              <p className="cta1-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <button className="cta1-button" onClick={() => window.location.href = '#'}>
                visit the national website
              </button>
            </div>
          </div>
        </div>
      </section> 

      <section className="Meet-The-Team">
        <div className="Meet-The-Team-Content">
          <div className="Meet-The-Team-Title">MEET THE TEAM</div>

          <div className="Meet-The-Team-Card-Container">
            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamMaria})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">EXECUTIVE DIRECTOR</h3>
                <p className="team-name">Maria Santos</p>
              </div>
            </div>

            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamJuan})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">PROGRAM MANAGER</h3>
                <p className="team-name">Juan dela Cruz</p>
              </div>
            </div>

            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamSarah})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">STARTUP MENTOR</h3>
                <p className="team-name">Sarah Johnson</p>
              </div>
            </div>

            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamMichael})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">BUSINESS ADVISOR</h3>
                <p className="team-name">Michael Chen</p>
              </div>
            </div>

            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamAnna})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">OPERATIONS COORDINATOR</h3>
                <p className="team-name">Anna Rodriguez</p>
              </div>
            </div>

            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamDavid})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">TECHNOLOGY LEAD</h3>
                <p className="team-name">David Park</p>
              </div>
            </div>

            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamLisa})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">MARKETING SPECIALIST</h3>
                <p className="team-name">Lisa Wang</p>
              </div>
            </div>

            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamCarlos})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">FINANCE MANAGER</h3>
                <p className="team-name">Carlos Mendoza</p>
              </div>
            </div>

            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamJennifer})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">RESEARCH ANALYST</h3>
                <p className="team-name">Jennifer Lee</p>
              </div>
            </div>

            <div className="Meet-The-Team-Card">
              <div className="team-image-placeholder" 
                   style={{backgroundImage: `url(${teamRoberto})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              </div>
              <div className="team-meta">
                <h3 className="team-role">COMMUNITY MANAGER</h3>
                <p className="team-name">Roberto Silva</p>
              </div>
            </div>
          </div>
            
        </div>



      </section>       

    </div>
  );
};

export default About;