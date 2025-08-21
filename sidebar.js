// sidebar.js - Final complete version with all functionalities AND a cool loading animation! (FIXED)

// --- 1. Element selection ---
const companyNameInput = document.getElementById('company-name');
const jobTitleInput = document.getElementById('job-title');
const resumeTextInput = document.getElementById('resume-text');
const analyzeButton = document.getElementById('analyze-button');
const resultContainer = document.getElementById('result-container');
const sourcesContainer = document.getElementById('sources-container');
const themeSwitcher = document.getElementById('theme-switcher');
const logo = document.getElementById('logo');
const collapseButton = document.getElementById('collapse-button');
const langToggle = document.getElementById('lang-toggle');
const resizer = document.getElementById('resizer');
const topPanel = document.getElementById('top-panel');

// --- 2. Translations and Icons ---
const translations = {
    'zh-CN': {
        logo_text: '🔬 职场透镜', title: '输入信息', subtitle: 'AI将自动搜索并分析该公司',
        company_name_label: '公司名称', company_name_placeholder: '例如：谷歌',
        job_title_label: '职位名称 (可选)', job_title_placeholder: '例如：软件工程师, 市场经理',
        resume_label: '我的简历 / 个人简介 (可选)', resume_placeholder: '粘贴你的个人简介或简历...',
        button_text: '开始分析', button_loading_text: '分析中...',
        result_placeholder_title: '分析报告', result_placeholder_text: '（请输入公司名后点击分析）',
        sources_title: '引用来源:', support_text: '请开发者喝杯咖啡',
        rate_limit_exceeded: "开拓者，您今日的免费分析额度已用尽！🚀\n\nProject Lens 每天为所有用户提供10次免费分析。\n如果您是需要进行大量研究的‘超级用户’，可以考虑升级到 Pro 版本（即将推出！），或通过‘请我喝杯咖啡☕️’来立即重置额度！",
        connection_error: "发生连接错误，请检查网络或联系开发者。",
        loading_statuses: [
            "正在连接AI大脑...",
            "正在全网搜索公司信息...",
            "正在阅读相关新闻与评价...",
            "正在召唤 Gemini 进行深度分析...",
            "即将完成，正在生成报告..."
        ]
    },
    'zh-TW': {
        logo_text: '🔬 職場透鏡', title: '输入资讯', subtitle: 'AI將自動搜尋並分析該公司',
        company_name_label: '公司名稱', company_name_placeholder: '例如：谷歌',
        job_title_label: '職位名稱 (可選)', job_title_placeholder: '例如：軟體工程師, 市場經理',
        resume_label: '我的履歷 / 個人簡介 (可選)', resume_placeholder: '貼上你的個人簡介或履歷...',
        button_text: '開始分析', button_loading_text: '分析中...',
        result_placeholder_title: '分析報告', result_placeholder_text: '（請輸入公司名後點擊分析）',
        sources_title: '資訊來源:', support_text: '請開發者喝杯咖啡',
        rate_limit_exceeded: "開拓者，您今日的免費分析額度已用盡！🚀\n\nProject Lens 每天為所有用戶提供10次免費分析。\n如果您是需要進行大量研究的「超級用戶」，可以考慮升級到 Pro 版本（即將推出！），或通過「請我喝杯咖啡☕️」來立即重置額度！",
        connection_error: "發生連線錯誤，請檢查網路或聯絡開發者。",
        loading_statuses: [
            "正在連接AI大腦...",
            "正在全網搜尋公司資訊...",
            "正在閱讀相關新聞與評價...",
            "正在召喚 Gemini 進行深度分析...",
            "即將完成，正在生成報告..."
        ]
    },
    'en': {
        logo_text: '🔬 Project Lens', title: 'Input Information', subtitle: 'AI will automatically search and analyze the company',
        company_name_label: 'Company Name', company_name_placeholder: 'e.g., Google',
        job_title_label: 'Job Title (Optional)', job_title_placeholder: 'e.g., Software Engineer, Marketing Manager',
        resume_label: 'My Resume / Bio (Optional)', resume_placeholder: 'Paste your bio or resume...',
        button_text: 'Analyze', button_loading_text: 'Analyzing...',
        result_placeholder_title: 'Analysis Report', result_placeholder_text: '(Enter a company name and click Analyze)',
        sources_title: 'References:', support_text: 'Buy the developer a coffee',
        rate_limit_exceeded: "Explorer, you have used up your free analysis quota for today! 🚀\n\nProject Lens provides 10 free analyses per day for all users.\nIf you are a 'power user' who needs to conduct a lot of research, consider upgrading to the Pro version (coming soon!) or 'Buy me a coffee ☕️' to reset your quota immediately!",
        connection_error: "Connection error. Please check your network or contact the developer.",
        loading_statuses: [
            "Connecting to the AI brain...",
            "Searching for company info across the web...",
            "Reading related news and reviews...",
            "Summoning Gemini for deep analysis...",
            "Finalizing, generating report..."
        ]
    }
};
const ICONS = {
    linkedin: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>`,
    glassdoor: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.185 1.185A1.5 1.5 0 0 1 2.57.293l10.854 10.854a.5.5 0 0 1 0 .708L11.146 14a.5.5 0 0 1-.708 0L.293 2.854A1.5 1.5 0 0 1 1.185 1.185zM14.815 1.185a1.5 1.5 0 0 0-2.122 0L.854 13.146a.5.5 0 0 0 0 .708L2.854 15.707a.5.5 0 0 0 .708 0L15.707 3.565a1.5 1.5 0 0 0 0-2.122l-.892-.892z"/></svg>`,
    indeed: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.555 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM10.31 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM8.36 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM5.945 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM15.363 4.091A1.91 1.91 0 0 0 13.455 2.182h-10.91A1.91 1.91 0 0 0 .636 4.091v7.818A1.91 1.91 0 0 0 2.545 13.818h10.91a1.91 1.91 0 0 0 1.909-1.909V4.091zM2.909 5.227a1.136 1.136 0 1 1 0 2.273 1.136 1.136 0 0 1 0-2.273z"/></svg>`,
    default: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>`
};

// --- 3. Core Logic ---
let currentLang = 'zh-CN';
let loadingInterval = null;

// 【修复】这是完整的 setLanguage 函数
function setLanguage(langCode) {
    currentLang = langCode;
    const t = translations[langCode];
    
    document.querySelectorAll('[data-key]').forEach(elem => { const key = elem.getAttribute('data-key'); if (t[key]) elem.textContent = t[key]; });
    document.querySelectorAll('[data-key-placeholder]').forEach(elem => { const key = elem.getAttribute('data-key-placeholder'); if (t[key]) elem.placeholder = t[key]; });
    logo.textContent = t.logo_text || '🔬 职场透镜';
    
    langToggle.querySelectorAll('button').forEach(button => {
        button.classList.toggle('active', button.dataset.lang === langCode);
    });
    
    chrome.storage.sync.set({ language: langCode });
}

// 【修复】这是完整的 setTheme 函数
function setTheme(theme) {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    themeSwitcher.textContent = theme === 'light' ? '🌙' : '☀️';
    chrome.storage.sync.set({ theme: theme });
}

analyzeButton.addEventListener('click', () => {
    const t = translations[currentLang];
    const buttonTextSpan = analyzeButton.querySelector('span');
    
    buttonTextSpan.textContent = t.button_loading_text;
    analyzeButton.insertAdjacentHTML('beforeend', '<div class="spinner"></div>');
    analyzeButton.disabled = true;
    sourcesContainer.innerHTML = '';

    let statusIndex = 0;
    const loadingStatuses = t.loading_statuses;
    resultContainer.innerHTML = `<h2 data-key="result_placeholder_title">${t.result_placeholder_title}</h2><p>${loadingStatuses[statusIndex]}</p>`;
    statusIndex++;
    
    loadingInterval = setInterval(() => {
        if (statusIndex < loadingStatuses.length) {
            resultContainer.innerHTML = `<h2 data-key="result_placeholder_title">${t.result_placeholder_title}</h2><p>${loadingStatuses[statusIndex]}</p>`;
            statusIndex++;
        } else {
            clearInterval(loadingInterval);
        }
    }, 2500);

    const analysisData = {
        companyName: companyNameInput.value,
        jobTitle: jobTitleInput.value,
        resumeText: resumeTextInput.value,
        language: currentLang
    };
    chrome.runtime.sendMessage({ type: "ANALYZE_COMPANY", data: analysisData });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ANALYSIS_RESULT") {
        if (loadingInterval) {
            clearInterval(loadingInterval);
            loadingInterval = null;
        }

        const t = translations[currentLang];
        const buttonTextSpan = analyzeButton.querySelector('span');
        const result = message.result || { ok: false, data: { error: "unknown_error" } }; 

        const heading = `<h2 data-key="result_placeholder_title">${t.result_placeholder_title}</h2>`;

        if (result.ok) {
            const analysisData = result.data;
            let analysisHtml = marked.parse(analysisData.analysis || '');
            analysisHtml = analysisHtml.replace(/\[(\d+)\]/g, (match, number) => `<a href="#source-${number}" class="citation-link">${match}</a>`);
            
            resultContainer.innerHTML = DOMPurify.sanitize(heading + analysisHtml);
            
            sourcesContainer.innerHTML = ''; 
            if (analysisData.sources && analysisData.sources.length > 0) {
                let sourcesHTML = `<h2>${t.sources_title}</h2>`;
                analysisData.sources.forEach((source, index) => {
                    const sourceId = index + 1;
                    const icon = ICONS[source.source_type] || ICONS.default;
                    sourcesHTML += `<div class="source-item" id="source-${sourceId}">${icon}<span>[${sourceId}] <a href="${source.link}" target="_blank" rel="noopener noreferrer">${source.title}</a></span></div>`;
                });
                sourcesContainer.innerHTML = DOMPurify.sanitize(sourcesHTML, { ADD_ATTR: ['id'], ADD_TAGS: ['svg', 'path'] });
            }
        } else {
            const errorData = result.data;
            if (errorData.error === 'rate_limit_exceeded') {
                resultContainer.innerHTML = `${heading}<p style="white-space: pre-wrap;">${t.rate_limit_exceeded}</p>`;
            } else if (errorData.error === 'connection_error') {
                 resultContainer.innerHTML = `${heading}<p>${t.connection_error}</p>`;
            }
            else {
                resultContainer.innerHTML = `${heading}<p>${errorData.error || 'Unknown error'}</p>`;
            }
        }

        buttonTextSpan.textContent = t.button_text;
        if (analyzeButton.querySelector('.spinner')) analyzeButton.querySelector('.spinner').remove();
        analyzeButton.disabled = false;
    }
});

// --- 4. Resizable Panel Logic ---
// 【修复】这是完整的 makeResizable 函数
function makeResizable() {
    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.userSelect = 'none';
        document.body.style.pointerEvents = 'none';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const newHeight = e.clientY - topPanel.offsetTop;
        const minHeight = 200;
        const maxHeight = window.innerHeight - 150;
        if (newHeight > minHeight && newHeight < maxHeight) {
            topPanel.style.height = `${newHeight}px`;
        }
    });

    window.addEventListener('mouseup', (e) => {
        if (isResizing) {
            isResizing = false;
            document.body.style.userSelect = '';
            document.body.style.pointerEvents = '';
            chrome.storage.sync.set({ topPanelHeight: topPanel.style.height });
        }
    });
}

// --- 5. Initialization ---
// 【修复】这是完整的初始化代码，重新添加了所有事件监听器
themeSwitcher.addEventListener('click', () => {
    const isLight = document.documentElement.classList.contains('light-mode');
    setTheme(isLight ? 'dark' : 'light');
});

langToggle.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) {
        const langCode = button.dataset.lang;
        if (langCode && langCode !== currentLang) {
            setLanguage(langCode);
        }
    }
});

collapseButton.addEventListener('click', () => {
    window.parent.postMessage({ type: 'PROJECT_LENS_CLOSE_SIDEBAR' }, '*');
});

sourcesContainer.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link && link.href) {
        event.preventDefault();
        chrome.runtime.sendMessage({
            type: "OPEN_NEW_TAB",
            url: link.href
        });
    }
});

chrome.storage.sync.get(['theme', 'language', 'topPanelHeight'], (data) => {
    setTheme(data.theme || 'dark');
    setLanguage(data.language || 'zh-CN');
    if (data.topPanelHeight) {
        topPanel.style.height = data.topPanelHeight;
    } else {
        topPanel.style.height = '55%'; 
    }
});

makeResizable();


