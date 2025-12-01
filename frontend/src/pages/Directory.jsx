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
    const staticStartupsData = [];

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
