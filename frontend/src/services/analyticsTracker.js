// Simple Analytics Tracking Service for SCALE Website
// Tracks page views and sends data to backend

class AnalyticsTracker {
    constructor() {
        this.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
        this.trackingEnabled = true;
    }

    // Track page view
    async trackPageView(path, title) {
        if (!this.trackingEnabled) return;
        
        try {
            const response = await fetch(`${this.apiUrl}/track-page.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    page: path || window.location.pathname,
                    title: title || document.title || 'SCALE NCR'
                })
            });
            
            const result = await response.json();
            if (!result.success) {
                console.warn('✗ Tracking failed:', result.message);
            }
        } catch (error) {
            console.warn('Analytics tracking error:', error);
        }
    }

    // Track custom events
    async trackEvent(eventName, eventData = {}) {
        if (!this.trackingEnabled) return;
        
        // For future implementation
        // Custom event tracked silently
    }

    // Initialize tracking on page load
    init() {
        // Track initial page view
        this.trackPageView();
        
        // Track page changes for SPA navigation
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = (...args) => {
            originalPushState.apply(history, args);
            setTimeout(() => this.trackPageView(), 100);
        };
        
        history.replaceState = (...args) => {
            originalReplaceState.apply(history, args);
            setTimeout(() => this.trackPageView(), 100);
        };
        
        // Listen for back/forward navigation
        window.addEventListener('popstate', () => {
            setTimeout(() => this.trackPageView(), 100);
        });
    }
}

// Create global instance
const analytics = new AnalyticsTracker();

export default analytics;