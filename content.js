// content.js - The intelligent page interactor (v4.4 - Site-Specific Trigger)
// This version restricts the floating button to specific sites.

console.log("Project Lens content script loaded! V4.4 (Site-Specific)");

let sidebar = null;
let isSidebarOpen = false;

// --- Sidebar Injection & Communication (No changes) ---
function injectSidebar() {
    if (document.getElementById('project-lens-sidebar')) return;
    sidebar = document.createElement('iframe');
    sidebar.id = 'project-lens-sidebar';
    sidebar.style.cssText = `
        position: fixed; top: 0; right: -500px; width: 455px; height: 100%;
        border: none; z-index: 2147483647; box-shadow: -5px 0 15px rgba(0,0,0,0.15);
        transition: right 0.3s ease-in-out; background-color: transparent;
    `;
    sidebar.src = chrome.runtime.getURL('sidebar.html');
    document.body.appendChild(sidebar);
    window.addEventListener('message', (event) => {
        if (event.source !== sidebar.contentWindow) return;
        if (event.data.type === 'PROJECT_LENS_CLOSE_SIDEBAR') toggleSidebar(false);
    });
}

function toggleSidebar(forceState) {
    if (!sidebar) {
        injectSidebar();
        setTimeout(() => toggleSidebar(true), 100);
        return;
    }
    isSidebarOpen = (typeof forceState === 'boolean') ? forceState : !isSidebarOpen;
    sidebar.style.right = isSidebarOpen ? '0' : '-500px';
}

// --- UNIVERSAL FLOATING BUTTON (Draggable and Dismissible) ---
function ensureFloatingButtonExists() {
    if (document.getElementById('project-lens-trigger-button')) return;
    if (!document.body) return;

    const lensButton = document.createElement('div');
    lensButton.id = 'project-lens-trigger-button';
    lensButton.innerHTML = `
      <div class="pl-main-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4v0a4 4 0 0 0 4-4v0a4 4 0 0 0-4-4Z" /><path d="M18.29 12.12 22 15.83" /><path d="M12.12 18.29 15.83 22" /><path d="m5.71 12.12-4-3.71" /><path d="m12.12 5.71-3.71-4" /></svg>
      </div>
      <div class="pl-close-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
    `;
    document.body.appendChild(lensButton);
    
    const mainIcon = lensButton.querySelector('.pl-main-icon');
    const closeIcon = lensButton.querySelector('.pl-close-icon');

    let isDragging = false;

    // Dragging Logic
    lensButton.addEventListener('mousedown', (e) => {
        if (e.target.closest('.pl-close-icon')) return;
        isDragging = false;
        const offsetX = e.clientX - lensButton.getBoundingClientRect().left;
        const offsetY = e.clientY - lensButton.getBoundingClientRect().top;
        
        const onMouseMove = (e) => {
            isDragging = true;
            lensButton.style.cursor = 'grabbing';
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            
            const buttonRect = lensButton.getBoundingClientRect();
            newX = Math.max(0, Math.min(newX, window.innerWidth - buttonRect.width));
            newY = Math.max(0, Math.min(newY, window.innerHeight - buttonRect.height));
            
            lensButton.style.left = `${newX}px`;
            lensButton.style.top = `${newY}px`;
            lensButton.style.bottom = 'auto';
            lensButton.style.right = 'auto';
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            lensButton.style.cursor = 'pointer';
            setTimeout(() => { isDragging = false; }, 0);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // Click to Open Logic
    mainIcon.addEventListener('click', (event) => {
        if (!isDragging) {
            event.stopPropagation();
            toggleSidebar();
        }
    });

    // Click to Close Logic
    closeIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        lensButton.style.display = 'none'; // Hide instead of remove, simpler to manage
    });

    console.log("Project Lens Guardian: Injected/Verified draggable button.");
}


// --- INTEGRATED BUTTON (Progressive Enhancement - No changes) ---
function injectIntegratedButton() {
    if (document.querySelector('.project-lens-page-button')) return;

    let targetElement, jobDescriptionSelector, companyNameSelector;
    const hostname = window.location.hostname;

    if (hostname.includes('linkedin.com') && window.location.pathname.includes('/jobs/view/')) {
        targetElement = document.querySelector('.jobs-unified-top-card__primary-description');
        jobDescriptionSelector = '.jobs-description__content .jobs-box__html-content';
        companyNameSelector = '.jobs-unified-top-card__company-name a';
    } else if (hostname.includes('indeed.com')) {
        targetElement = document.querySelector('.jobsearch-JobInfoHeader-title-container');
        jobDescriptionSelector = '#jobDescriptionText';
        companyNameSelector = '[data-testid="job-header-company-name"] a, .css-1cxc9zk a';
    } else if (hostname.includes('glassdoor.')) {
        targetElement = document.querySelector('[data-test="job-title"]');
        jobDescriptionSelector = '[data-test="job-description"]';
        companyNameSelector = '[data-test="employer-name"]';
    }

    if (targetElement) {
        const analyzeButton = document.createElement('button');
        analyzeButton.innerHTML = '🔬 Analyze with Project Lens';
        analyzeButton.className = 'project-lens-page-button';
        analyzeButton.style.cssText = `margin-left: 10px; padding: 8px 12px; font-size: 14px; font-weight: bold; color: #fff; background-color: #9b59b6; border: none; border-radius: 20px; cursor: pointer; transition: all 0.3s; z-index: 999;`;
        targetElement.parentNode.insertBefore(analyzeButton, targetElement.nextSibling);
        analyzeButton.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            const jobEl = document.querySelector(jobDescriptionSelector);
            const compEl = document.querySelector(companyNameSelector);
            let combinedText = `Company: ${compEl ? compEl.innerText : 'Unknown'}\n\nJob Description:\n${jobEl ? jobEl.innerText : 'Not found'}`;
            toggleSidebar(true);
            setTimeout(() => {
                if (sidebar && sidebar.contentWindow) {
                   sidebar.contentWindow.postMessage({ type: "FILL_SIDEBAR", text: combinedText }, '*');
                }
            }, 300);
        });
    }
}

// --- Main Execution Logic ---
function main() {
    console.log("Project Lens main() function starting.");
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "TOGGLE_SIDEBAR") toggleSidebar();
        if (message.type === "CONTEXT_MENU_ANALYZE") {
            toggleSidebar(true);
             setTimeout(() => {
                if (sidebar && sidebar.contentWindow) {
                    sidebar.contentWindow.postMessage({ type: "FILL_SIDEBAR", text: message.text }, '*');
                }
            }, 300);
        }
    });

    // MODIFICATION: Define which sites should show the floating button
    const supportedSites = ['linkedin.com', 'indeed.com', 'glassdoor.'];
    const isSupportedSite = supportedSites.some(site => window.location.hostname.includes(site));

    // MODIFICATION: Only run the button logic on supported sites
    if (isSupportedSite) {
        const guardianObserver = new MutationObserver(() => {
            ensureFloatingButtonExists();
            injectIntegratedButton(); // This has its own checks, safe to call
        });

        // Use a function to avoid repetition
        const startObserver = () => {
            if (document.body) {
                guardianObserver.observe(document.body, { childList: true, subtree: true });
                ensureFloatingButtonExists();
            }
        };
        
        // Ensure the DOM is ready before trying to attach things
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startObserver);
        } else {
            startObserver();
        }
    }
}

main();
