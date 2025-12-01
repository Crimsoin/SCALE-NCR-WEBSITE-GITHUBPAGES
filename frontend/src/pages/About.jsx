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
            <p>SCALE NCR (Strategic and Collaborative Alliance for Leveraging Ecosystem of Startups - National Capital Region) is a consortium formed in 2022 with the support of DOST-PCIEERD under the ReSEED Program. It was initiated by PCIEERD-supported Technology Business Incubators in the region and is  led by Miriam College - TBI, QBO Innovation, UPSCALE Innovation Lab, and DLSU-Animo Labs.
            </p>
            <p> </p><br />
            <p>
            SCALE NCR plays a pivotal role in promoting and accelerating the growth of startups within the National Capital Region (NCR) of the Philippines. The platform offers mentorship, funding opportunities, strategic partnerships, and specialized resources to support startups at various stages, aiming to cultivate investable ventures and enhance NCR’s standing in global startup ecosystem rankings.
            </p>
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
            <p>Strengthen the Philippine startup ecosystem to enable incubators and accelerators to develop investable startups. </p>
          </div>
          <div className='About-Vision'>
            <img src={VisionImg} alt="Vision" className="About-Vision-Image" loading="lazy" />
            <p>By 2028, SCALE-NCR envisions itself to be the leader in start-up initiatives, and entrepreneurial ecosystem in the country. With an end-view of producing globally competitive programs driven by science, technology, and innovation-based strategies, the SCALE-NCR is committed to establishing a robust collaboration with various start-up enablers in the country. </p>
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
                To further strengthen the startup ecosystem of the country, the Department of Science and Technology – Philippine Council for Industry, Energy and Emerging Technology (DOST-PCIEERD) invested P120 million, through the Regional Startup Enabler for Ecosystem Development (ReSEED) Program, to support DOST PCIEERD-funded Technology Business Incubators (TBIs) in leading the establishment and formalization of startup ecosystem consortium in each region  
                <br/>
                <br/>
                The program aims to reach partners and innovators in the regions in the Philippines to actively participate in the action to bolster and produce startups that are fundable by investors, as well as the government.   

              </p>
              <button className="cta1-button" onClick={() => window.location.href = '#'}>
                visit the national website
              </button>
            </div>
          </div>
        </div>
      </section>       

    </div>
  );
};

export default About;