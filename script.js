/* ========================= */
/* Data for AI Platform - Demo Script */
/* ========================= */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTabs();
    startAnimations();
});

/* ========================= */
/* Layer Navigation */
/* ========================= */

function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.layer-section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const layerId = this.getAttribute('data-layer') + '-layer';
            
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const selectedSection = document.getElementById(layerId);
            if (selectedSection) {
                selectedSection.classList.add('active');
                
                // Update breadcrumb
                updateBreadcrumb(this.textContent);
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

/* ========================= */
/* Tab Management */
/* ========================= */

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show selected tab content
            const selectedContent = document.getElementById(tabId);
            if (selectedContent) {
                selectedContent.classList.add('active');
            }
        });
    });
}

/* ========================= */
/* Breadcrumb Update */
/* ========================= */

function updateBreadcrumb(layerName) {
    const breadcrumb = document.getElementById('breadcrumb-text');
    if (breadcrumb) {
        breadcrumb.textContent = layerName.trim();
    }
}

/* ========================= */
/* Animations & Visual Effects */
/* ========================= */

function startAnimations() {
    // Animate KPI cards
    animateKPICards();
    
    // Animate metrics
    animateMetrics();
    
    // Live updates simulation
    simulateLiveUpdates();
}

function animateKPICards() {
    const cards = document.querySelectorAll('.kpi-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach(metric => {
        const finalValue = metric.textContent;
        
        if (finalValue.includes('%')) {
            const numericValue = parseFloat(finalValue);
            animateValue(metric, 0, numericValue, 1000, '%');
        } else if (finalValue.includes('M') || finalValue.includes('K')) {
            // Keep as is, just add a brief highlight
            highlightElement(metric);
        }
    });
}

function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const originalText = element.textContent;
    
    const animate = () => {
        current += increment;
        if (current >= end) {
            element.textContent = originalText;
        } else {
            element.textContent = current.toFixed(1) + suffix;
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

function highlightElement(element) {
    element.style.transition = 'color 0.3s ease';
    element.style.color = '#00b4d8';
    
    setTimeout(() => {
        element.style.color = '';
    }, 500);
}

/* ========================= */
/* Live Updates Simulation */
/* ========================= */

function simulateLiveUpdates() {
    // Update pipeline stage metrics periodically
    setInterval(() => {
        updatePipelineMetrics();
    }, 5000);
    
    // Append new log entries
    setInterval(() => {
        addNewLogEntry();
    }, 8000);
    
    // Update progress bars
    setInterval(() => {
        updateProgressBars();
    }, 3000);
}

function updatePipelineMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach(metric => {
        const text = metric.textContent;
        
        // Simulate small fluctuations
        if (text.includes('%')) {
            const currentValue = parseFloat(text);
            const variance = (Math.random() - 0.5) * 0.5; // ±0.25%
            const newValue = Math.max(90, Math.min(100, currentValue + variance));
            metric.textContent = newValue.toFixed(1) + '%';
        } else if (text.includes('rec/sec')) {
            const currentValue = parseFloat(text.replace(/,/g, ''));
            const variance = (Math.random() - 0.5) * 500;
            const newValue = Math.max(1000, currentValue + variance);
            metric.textContent = Math.floor(newValue).toLocaleString() + ' rec/sec';
        }
    });
}

function addNewLogEntry() {
    const logEntries = document.querySelector('.log-entries');
    if (!logEntries) return;
    
    const messages = [
        { time: '⏳', msg: 'Processing stage: Transform' },
        { time: '✅', msg: 'Batch processing completed' },
        { time: '📊', msg: 'Quality metrics updated' },
        { time: '🔄', msg: 'Refreshing data sources' },
        { time: '✔️', msg: 'All validations passed' },
        { time: '🔗', msg: 'Semantic relationships processed' },
        { time: '💾', msg: 'Data persisted to warehouse' },
        { time: '📈', msg: 'Performance metrics recorded' }
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const newEntry = document.createElement('div');
    newEntry.className = 'log-entry';
    
    const currentTime = new Date();
    const timeStr = currentTime.getHours().toString().padStart(2, '0') + ':' +
                   currentTime.getMinutes().toString().padStart(2, '0') + ':' +
                   currentTime.getSeconds().toString().padStart(2, '0');
    
    newEntry.innerHTML = `
        <span class="log-time">${timeStr}</span>
        <span class="log-msg">${randomMessage.time} ${randomMessage.msg}</span>
    `;
    
    // Add new entry at the top
    logEntries.insertBefore(newEntry, logEntries.firstChild);
    
    // Remove oldest entry if there are more than 10
    const entries = logEntries.querySelectorAll('.log-entry');
    if (entries.length > 10) {
        entries[entries.length - 1].remove();
    }
}

function updateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const currentWidth = parseFloat(fill.style.width);
        const maxWidth = 100;
        
        if (currentWidth < maxWidth) {
            const increment = Math.random() * 5; // Random increment 0-5%
            const newWidth = Math.min(maxWidth, currentWidth + increment);
            fill.style.width = newWidth + '%';
            
            // Update progress text
            const progressText = fill.parentElement.nextElementSibling;
            if (progressText && progressText.classList.contains('progress-text')) {
                progressText.textContent = Math.floor(newWidth) + '%';
            }
        }
    });
}

/* ========================= */
/* Hover Effects */
/* ========================= */

document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll(
        '.kpi-card, .source-card, .pipeline-stage, .context-card, .ai-card, ' +
        '.operate-card, .governance-card, .status-badge'
    );
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform === 'translateY(-4px)' ? 
                'translateY(-8px)' : 'translateY(-4px)';
        });
    });
});

/* ========================= */
/* Action Buttons */
/* ========================= */

document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.action-btn, .btn-primary');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            // Show notification
            showNotification(`Action: ${this.textContent} initiated`);
        });
    });
});

/* ========================= */
/* Notifications */
/* ========================= */

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #0066cc, #00b4d8);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 102, 204, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/* ========================= */
/* Add animation styles */
/* ========================= */

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
    
    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }
`;

document.head.appendChild(style);

/* ========================= */
/* Responsive Design Helpers */
/* ========================= */

function handleResponsiveDesign() {
    const width = window.innerWidth;
    const mainContainer = document.querySelector('.main-container');
    
    if (width < 768) {
        mainContainer.style.padding = '1rem';
    } else if (width < 1024) {
        mainContainer.style.padding = '1.5rem';
    } else {
        mainContainer.style.padding = '2rem';
    }
}

window.addEventListener('resize', handleResponsiveDesign);
handleResponsiveDesign();

/* ========================= */
/* Data Export Functions */
/* ========================= */

function exportMetricsData() {
    const metrics = {};
    
    // Collect KPI data
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach(card => {
        const label = card.querySelector('.kpi-label').textContent;
        const value = card.querySelector('.kpi-value').textContent;
        metrics[label] = value;
    });
    
    return JSON.stringify(metrics, null, 2);
}

function printDashboard() {
    window.print();
}

/* ========================= */
/* Accessibility Enhancements */
/* ========================= */

document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = `2px solid #00b4d8`;
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

/* ========================= */
/* Performance Monitoring */
/* ========================= */

function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log('Page Load Time:', pageLoadTime + 'ms');
            console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.navigationStart + 'ms');
        });
    }
}

monitorPerformance();

/* ========================= */
/* Data Refresh Interval */
/* ========================= */

let refreshInterval;

function startDataRefresh(interval = 10000) {
    refreshInterval = setInterval(() => {
        console.log('Refreshing data...');
        updatePipelineMetrics();
        animateMetrics();
    }, interval);
}

function stopDataRefresh() {
    clearInterval(refreshInterval);
}

// Start automatic refresh
startDataRefresh(10000);

/* ========================= */
/* Export Functions for Console Use */
/* ========================= */

window.DataForAI = {
    exportMetrics: exportMetricsData,
    printDashboard: printDashboard,
    startRefresh: startDataRefresh,
    stopRefresh: stopDataRefresh,
    showNotification: showNotification
};

console.log('Data for AI Platform - Demo Ready');
console.log('Available functions: window.DataForAI');
