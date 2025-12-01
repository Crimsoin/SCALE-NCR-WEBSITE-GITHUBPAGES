import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage,
  canonicalUrl,
  structuredData 
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Description
    updateMetaTag('description', description);
    
    // Keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl || window.location.href, true);
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }

    // Twitter
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:url', canonicalUrl || window.location.href, true);
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage, true);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl || window.location.href);

    // Structured Data
    if (structuredData) {
      let structuredDataScript = document.querySelector('script[type="application/ld+json"]#page-structured-data');
      
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        structuredDataScript.setAttribute('id', 'page-structured-data');
        document.head.appendChild(structuredDataScript);
      }
      
      structuredDataScript.textContent = JSON.stringify(structuredData);
    }

  }, [title, description, keywords, ogImage, canonicalUrl, structuredData]);

  return null;
};

export default SEO;
