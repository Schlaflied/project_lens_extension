// content.js - The ultimate hybrid version with patience!

console.log("Project Lens content script loaded! V10.0 (Patient)");

// --- 全局变量定义 ---
let sidebar = null;
let isSidebarOpen = false;

const targetSites = [
    'linkedin.com',
    'indeed.com',
    'glassdoor.com'
];

// --- 核心功能函数 ---

function toggleSidebar(forceState) {
    if (!sidebar) return;
    const sidebarWidth = 455;
    isSidebarOpen = (typeof forceState === 'boolean') ? forceState : !isSidebarOpen;
    sidebar.style.right = isSidebarOpen ? '0px' : `-${sidebarWidth + 50}px`;
}

function injectSidebar() {
    if (document.getElementById('project-lens-sidebar')) return;

    sidebar = document.createElement('iframe');
    sidebar.id = 'project-lens-sidebar';
    sidebar.src = chrome.runtime.getURL('sidebar.html');
    sidebar.style.cssText = `
        position: fixed; top: 0; right: -505px; width: 455px; height: 100%;
        border: none; z-index: 2147483647; box-shadow: -5px 0 15px rgba(0,0,0,0.15);
        transition: right 0.3s ease-in-out; background-color: transparent;
    `;
    document.body.appendChild(sidebar);

    window.addEventListener('message', (event) => {
        if (event.source !== sidebar.contentWindow) return;
        if (event.data.type && event.data.type === 'PROJECT_LENS_CLOSE_SIDEBAR') {
            toggleSidebar(false);
        }
    });
}

function injectFloatingButton() {
    if (document.getElementById('project-lens-trigger-button')) return;

    const lensButton = document.createElement('div');
    lensButton.id = 'project-lens-trigger-button';
    lensButton.innerHTML = `
      <div class="pl-main-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4v0a4 4 0 0 0 4-4v0a4 4 0 0 0-4-4Z" /><path d="M18.29 12.12 22 15.83" /><path d="M12.12 18.29 15.83 22" /><path d="m5.71 12.12-4-3.71" /><path d="m12.12 5.71-3.71-4" /></svg>
      </div>
      <div class="pl-close-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
    `;
    document.body.appendChild(lensButton);
    addEventListenersToButton(lensButton);
}

function addEventListenersToButton(button) {
    let isDragging = false;
    let offsetX, offsetY;

    const closeIcon = button.querySelector('.pl-close-icon');
    closeIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        button.style.display = 'none';
    });

    const mainIcon = button.querySelector('.pl-main-icon');
    mainIcon.addEventListener('click', (event) => {
        if (!isDragging) {
            event.stopPropagation();
            if (!sidebar) injectSidebar();
            setTimeout(() => toggleSidebar(), 50);
        }
    });
    
    button.addEventListener('mousedown', (e) => {
        isDragging = false;
        offsetX = e.clientX - button.getBoundingClientRect().left;
        offsetY = e.clientY - button.getBoundingClientRect().top;
        button.style.cursor = 'grabbing';
        function onMouseMove(e) {
            isDragging = true;
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            const buttonRect = button.getBoundingClientRect();
            newX = Math.max(0, Math.min(newX, window.innerWidth - buttonRect.width));
            newY = Math.max(0, Math.min(newY, window.innerHeight - buttonRect.height));
            button.style.left = `${newX}px`;
            button.style.top = `${newY}px`;
            button.style.bottom = 'auto';
            button.style.right = 'auto';
        }
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            button.style.cursor = 'pointer';
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    button.ondragstart = () => false;
}

/**
 * 【核心升级】这是我们脚本的总入口
 */
function main() {
    // 1. 监听来自 background.js 的“右上角图标点击”消息 (通用功能)
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "TOGGLE_SIDEBAR") {
            if (!sidebar) injectSidebar();
            setTimeout(() => toggleSidebar(), 50);
        }
    });

    // 2. 检查当前网站是否是我们的“主战场”
    const isOnTargetSite = targetSites.some(site => window.location.hostname.includes(site));

    if (isOnTargetSite) {
        // 如果是，就注入紫色小球，并用“监工”保护它 (特殊功能)
        injectFloatingButton();
        const observer = new MutationObserver(() => {
            if (!document.getElementById('project-lens-trigger-button')) {
                console.log("Project Lens button was removed. Re-injecting...");
                injectFloatingButton();
            }
        });
        // 现在 document.body 肯定存在了，可以安全地监视它
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// 【核心升级】确保在DOM加载完成后再执行我们的脚本
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    // 如果我们来晚了，DOM已经加载好了，就直接执行
    main();
}
