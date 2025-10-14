// sidebar.js - The new intelligent core for the extension
// Version: 25.0 - Vercel Feature Sync

// --- 1. Element selection ---
const smartPasteBox = document.getElementById('smart-paste-box');
const resumeTextInput = document.getElementById('resume-text');
const analyzeButton = document.getElementById('analyze-button');
const resultContainer = document.getElementById('result-container');
const sourcesContainer = document.getElementById('sources-container');
const themeSwitcher = document.getElementById('theme-switcher');
const collapseButton = document.getElementById('collapse-button');
const langToggle = document.getElementById('lang-toggle');
const resizer = document.getElementById('resizer');
const topPanel = document.getElementById('top-panel');
const aspectTagsContainer = document.getElementById('aspect-tags');

// --- 2. Translations, Definitions, and Icons (Synced with Vercel App v23.0) ---
const translations = {
    'zh-CN': { 
        logo_text: '🔬 职场透镜', title: '分析求职信息', subtitle: 'AI将自动搜索并分析公司与职位',
        smart_paste_label: '粘贴职位信息或公司名', smart_paste_placeholder: '从网页右键划词，或直接粘贴...',
        aspects_label: '选择你关注的方面',
        resume_label: '我的简历 / 个人简介 (可选)', resume_placeholder: '粘贴你的个人简介或简历，获得更精准的匹配分析...',
        button_text: '开始分析', button_loading_text: '分析中...',
        support_text: "请开发者喝杯咖啡",
        welcome_title: "欢迎使用职场透镜！", 
        welcome_p1: "在求职网站（如LinkedIn）上，点击页面上的“🔬分析”按钮，或在任何网页上划词右键，即可开始分析！",
        rate_limit_exceeded: "开拓者，您今日的免费分析额度已用尽！🚀\n\nProject Lens 每天为所有用户提供5次免费分析。",
        no_info_found: "抱歉，未能找到关于该公司的足够信息。请尝试使用公司的法定全称，或检查公司名称是否正确。",
        connection_error: "发生连接错误，请检查网络或联系开发者。",
        loading_statuses: ["正在连接AI大脑...", "正在全网搜索公司信息...", "正在阅读相关新闻与评价...", "正在召唤 Gemini 进行深度分析...", "即将完成，正在生成报告..."],
        report_titles: {
            company_header: '分析报告：',
            red_flag: '🚨 Red Flag 风险扫描',
            hiring_experience: '👻 招聘流程与候选人体验',
            timeliness_analysis: '⏱️ 信息时效性分析',
            culture_fit: '📊 文化契合度分析',
            value_match: '💖 价值匹配报告',
            final_risk: '⚖️ 最终风险评估',
            sources: '引用来源'
        },
        aspects: {
            reputation: '公司声誉', management: '管理风格', sustainability: '可持续性', wlb: '工作与生活平衡',
            growth: '成长机会', salary: '薪酬水平', overtime: '加班文化', innovation: '创新文化', 
            benefits: '福利待遇', diversity: '多元化与包容性', training: '培训与学习', rating: '评级'
        },
        definitions: {
            reputation: '公司声誉是公众、客户、员工和投资者对一个组织的综合看法和评价。',
            management: '管理风格是指公司各级管理者在领导团队、分配任务、做出决策时所表现出的一贯行为模式。',
            sustainability: '可持续性是指公司在追求经济利益的同时，如何平衡其对社会和环境的影响。',
            wlb: '工作与生活平衡指的是员工能够在职业责任和个人生活之间找到一个健康的平衡点。',
            growth: '成长机会指的是公司为员工提供的学习新技能、承担更多责任、以及获得晉升的可能性。',
            salary: '薪酬水平指的是公司提供的工资、奖金等现金报酬在市场中的相对位置。',
            overtime: '加班文化是指公司对于正常工作时间之外的额外工作的普遍态度和做法。',
            innovation: '创新文化是指公司鼓励和支持新思想、新产品、新服务的程度。',
            benefits: '福利待遇包括除薪水外的所有非现金报酬，如健康保险、退休金计划、带薪休假等。',
            diversity: '多元化与包容性是指公司在员工构成和工作环境中，对不同背景、文化和观点的尊重与接纳程度。',
            training: '培训与学习机会反映了公司对员工职业发展的投入程度。'
        }
    },
    'zh-TW': {
        logo_text: '🔬 職場透鏡', title: '分析求職資訊', subtitle: 'AI將自動搜尋並分析公司與職位',
        smart_paste_label: '貼上職位資訊或公司名', smart_paste_placeholder: '從網頁右鍵劃詞，或直接貼上...',
        aspects_label: '選擇您關注的方面',
        resume_label: '我的履歷 / 個人簡介 (可選)', resume_placeholder: '貼上你的個人簡介或履歷，獲得更精準的匹配分析...',
        button_text: '開始分析', button_loading_text: '分析中...',
        support_text: "請開發者喝杯咖啡",
        welcome_title: "歡迎來到 Project Lens！", welcome_p1: "我能幫你一鍵分析公司文化與職位詳情，避免求職踩坑。請在左側輸入資訊，開始你的第一次探索吧！",
        rate_limit_exceeded: "開拓者，您今日的免費分析額度已用盡！🚀\n\nProject Lens 每天為所有用戶提供5次免費分析。",
        no_info_found: "抱歉，未能找到關於該公司的足夠資訊。請嘗試使用公司的法定全稱，或檢查公司名稱是否正確。",
        connection_error: "發生連接錯誤，請檢查網路或聯絡開發者。",
        loading_statuses: ["正在連接AI大腦...", "正在全網搜尋公司資訊...", "正在閱讀相關新聞與評價...", "正在召喚 Gemini 進行深度分析...", "即將完成，正在生成報告..."],
        report_titles: {
            company_header: '分析報告：',
            red_flag: '🚨 Red Flag 風險掃描',
            hiring_experience: '👻 招聘流程與候選人體驗',
            timeliness_analysis: '⏱️ 資訊時效性分析',
            culture_fit: '📊 文化契合度分析',
            value_match: '💖 價值匹配報告',
            final_risk: '⚖️ 最終風險評估',
            sources: '引用來源'
        },
        aspects: {
            reputation: '公司聲譽', management: '管理風格', sustainability: '永續性', wlb: '工作與生活平衡',
            growth: '成長機會', salary: '薪酬水平', overtime: '加班文化', innovation: '創新文化', 
            benefits: '福利待遇', diversity: '多元化與包容性', training: '培訓與學習', rating: '評級'
        },
        definitions: { /* Definitions in Traditional Chinese */ }
    },
    'en': {
        logo_text: '🔬 Project Lens', title: 'Analyze Job Information', subtitle: 'AI will automatically search and analyze the company & role',
        smart_paste_label: 'Paste Job Info or Company Name', smart_paste_placeholder: 'Right-click on any webpage, or paste here...',
        aspects_label: 'Select Aspects You Care About',
        resume_label: 'My Resume / Bio (Optional)', resume_placeholder: 'Paste your bio or resume for a more accurate culture-fit analysis...',
        button_text: 'Analyze', button_loading_text: 'Analyzing...',
        support_text: "Buy me a coffee",
        welcome_title: "Welcome to Project Lens!", 
        welcome_p1: "On job sites (like LinkedIn), click the '🔬 Analyze' button, or on any webpage, highlight text and right-click to start!",
        rate_limit_exceeded: "Explorer, you have used up your free analysis quota for today! 🚀\n\nProject Lens provides 5 free analyses per day for all users.",
        no_info_found: "Sorry, not enough information could be found for this company. Please try using the official full name or check the spelling.",
        connection_error: "Connection error. Please check your network or contact the developer.",
        loading_statuses: ["Connecting to the AI brain...", "Searching for company info across the web...", "Reading related news and reviews...", "Summoning Gemini for deep analysis...", "Finalizing, generating report..."],
        report_titles: {
            company_header: 'Analysis Report for:',
            red_flag: '🚨 Red Flag Scan',
            hiring_experience: '👻 Hiring Process & Candidate Experience',
            timeliness_analysis: '⏱️ Information Timeliness Analysis',
            culture_fit: '📊 Culture Fit Analysis',
            value_match: '💖 Value Match Report',
            final_risk: '⚖️ Final Risk Assessment',
            sources: 'References'
        },
        aspects: { 
            reputation: 'Reputation', management: 'Management Style', sustainability: 'Sustainability', wlb: 'Work-Life Balance',
            growth: 'Growth Opportunities', salary: 'Salary Level', overtime: 'Overtime Culture', innovation: 'Innovation Culture',
            benefits: 'Benefits Package', diversity: 'Diversity & Inclusion', training: 'Training & Learning', rating: 'Rating'
        },
        definitions: { /* Definitions in English */ }
    }
};
// Populate missing translations for brevity
translations['zh-TW'].definitions = translations['zh-CN'].definitions;
translations['en'].definitions = translations['zh-CN'].definitions;

const ICONS = {
    linkedin: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>`,
    glassdoor: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.185 1.185A1.5 1.5 0 0 1 2.57.293l10.854 10.854a.5.5 0 0 1 0 .708L11.146 14a.5.5 0 0 1-.708 0L.293 2.854A1.5 1.5 0 0 1 1.185 1.185zM14.815 1.185a1.5 1.5 0 0 0-2.122 0L.854 13.146a.5.5 0 0 0 0 .708L2.854 15.707a.5.5 0 0 0 .708 0L15.707 3.565a1.5 1.5 0 0 0 0-2.122l-.892-.892z"/></svg>`,
    indeed: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.555 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM10.31 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM8.36 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM5.945 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM15.363 4.091A1.91 1.91 0 0 0 13.455 2.182h-10.91A1.91 1.91 0 0 0 .636 4.091v7.818A1.91 1.91 0 0 0 2.545 13.818h10.91a1.91 1.91 0 0 0 1.909-1.909V4.091zM2.909 5.227a1.136 1.136 0 1 1 0 2.273 1.136 1.136 0 0 1 0-2.273z"/></svg>`,
    default: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>`
};

// --- 3. Core Logic ---
let currentLang = 'zh-CN';
let loadingInterval = null;
let reportCache = {}; 

function setLanguage(langCode) {
    currentLang = langCode;
    const t = translations[langCode] || translations['en'];
    
    document.querySelectorAll('[data-key]').forEach(elem => { const key = elem.dataset.key; if(t[key]) elem.textContent = t[key]; });
    document.querySelectorAll('[data-key-placeholder]').forEach(elem => { const key = elem.dataset.keyPlaceholder; if(t[key]) elem.placeholder = t[key]; });
    document.querySelectorAll('[data-key-title]').forEach(elem => { const key = elem.dataset.keyTitle; if(t[key]) elem.title = t[key]; });

    langToggle.querySelectorAll('button').forEach(button => button.classList.toggle('active', button.dataset.lang === langCode));
    chrome.storage.sync.set({ language: langCode });
    
    generateAspectTags(); // Regenerate tags in the new language

    if (!resultContainer.querySelector('.report-section')) {
        showWelcomeMessage();
    }
}

function setTheme(theme) {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    themeSwitcher.textContent = theme === 'light' ? '🌙' : '☀️';
    chrome.storage.sync.set({ theme: theme });
}

function generateAspectTags() {
    const t = translations[currentLang];
    const aspects = t.aspects;
    let tagsHTML = '';
    const defaultChecked = ['wlb', 'reputation', 'growth', 'salary', 'overtime'];
    for (const key in aspects) {
        if (key !== 'rating') { 
            const checked = defaultChecked.includes(key) ? 'checked' : '';
            tagsHTML += `<input type="checkbox" id="${key}" value="${key}" ${checked}><label for="${key}">${aspects[key]}</label>`;
        }
    }
    aspectTagsContainer.innerHTML = tagsHTML;
}

function showWelcomeMessage() {
    const t = translations[currentLang] || translations['en'];
    resultContainer.innerHTML = `
        <h2 data-key="welcome_title">${t.welcome_title}</h2>
        <p data-key="welcome_p1" style="color: var(--text-secondary-color); margin-top: 15px;">${t.welcome_p1}</p>
    `;
    sourcesContainer.innerHTML = '';
    sourcesContainer.style.display = 'none';
}

function renderReport(companyName, reportData, sourcesData) {
    const t = translations[currentLang];
    const titles = t.report_titles;
    const aspects = t.aspects;
    const defs = t.definitions;

    const sourceLinkMap = new Map(sourcesData.map(source => [source.id, source.link]));
    
    const processText = (text) => {
        if (!text) return '';
        const linkedText = text.replace(/\[([\d,\s]+)\]/g, (match, content) => {
            const ids = content.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
            return ids.map(id => {
                const url = sourceLinkMap.get(id);
                if (url) {
                    // Use a special class for external links to be handled by the message listener
                    return `<a href="${url}" class="citation-link external-link">[${id}]</a>`;
                }
                return `[${id}]`;
            }).join('');
        });
        return marked.parse(linkedText);
    };
    
    let reportHTML = `<h1>${titles.company_header} ${companyName}</h1>`;
    
    const sectionMapping = [
        { key: 'red_flag_text', title: titles.red_flag, data: reportData.red_flag_status ? `${reportData.red_flag_status}\n${reportData.red_flag_text}` : reportData.red_flag_text, style: 'success' },
        { key: 'hiring_experience_text', title: titles.hiring_experience, data: reportData.hiring_experience_text, style: 'warning' },
        { key: 'timeliness_analysis', title: titles.timeliness_analysis, data: reportData.timeliness_analysis },
        { key: 'culture_fit', title: titles.culture_fit, isCultureFit: true },
        { key: 'value_match_text', title: titles.value_match, data: reportData.value_match_text, preContent: reportData.value_match_score > 0 ? `<div class="progress-bar-container"><div class="progress-bar" style="width: ${reportData.value_match_score}%;">${reportData.value_match_score}%</div></div>` : '' },
        { key: 'final_risk_text', title: titles.final_risk, data: reportData.final_risk_text, preContent: reportData.final_risk_rating ? `<p><strong>${aspects.rating}: ${reportData.final_risk_rating}</strong></p>` : '' }
    ];

    sectionMapping.forEach(section => {
        if (section.isCultureFit) {
            const cf = reportData.culture_fit || {};
            let cultureFitHTML = '';
            for (const key in cf) {
                if (cf[key] && aspects[key] && defs[key]) {
                    cultureFitHTML += `
                        <h3>${aspects[key]}<span class="tooltip-container"><span class="tooltip-icon">i</span><span class="tooltip-text">${defs[key]}</span></span></h3>
                        ${processText(cf[key])}`;
                }
            }
            if (cultureFitHTML) {
                reportHTML += `<div class="report-section"><h2>${section.title}</h2>${cultureFitHTML}</div>`;
            }
        } else if (section.data) {
            reportHTML += `<div class="report-section ${section.style || ''}"><h2>${section.title}</h2>${section.preContent || ''}${processText(section.data)}</div>`;
        }
    });

    resultContainer.innerHTML = DOMPurify.sanitize(reportHTML, {ADD_TAGS: ['span', 'div', 'ul', 'li', 'strong', 'a', 'br', 'h2', 'h3', 'p', 'em', 'b', 'i'], ADD_ATTR: ['style', 'href', 'class', 'target', 'rel']});
    
    let sourcesHTML = `<h2>${titles.sources}</h2>`;
    sourcesData.forEach(source => {
        const icon = ICONS[source.source_type] || ICONS.default;
        sourcesHTML += `<div class="source-item" id="source-${source.id}">${icon}<span>[${source.id}]</span><a href="${source.link}" target="_blank" rel="noopener noreferrer" class="external-link">${source.title}</a></div>`;
    });
    sourcesContainer.innerHTML = DOMPurify.sanitize(sourcesHTML, {ADD_TAGS: ['div', 'span', 'a', 'svg', 'path', 'g'], ADD_ATTR: ['id', 'href', 'target', 'rel', 'class', 'xmlns', 'width', 'height', 'fill', 'viewBox', 'd', 'fill-rule', 'clip-rule']});
    sourcesContainer.style.display = sourcesData.length > 0 ? 'block' : 'none';
}

analyzeButton.addEventListener('click', () => {
    const t = translations[currentLang];
    const buttonTextSpan = analyzeButton.querySelector('span');
    const companyName = smartPasteBox.value.trim();

    if (!companyName) return;
    
    if (reportCache[companyName]) {
        console.log("Loading from cache...");
        const { report, sources, name } = reportCache[companyName];
        renderReport(name, report, sources);
        return;
    }

    buttonTextSpan.textContent = t.button_loading_text;
    analyzeButton.insertAdjacentHTML('beforeend', '<div class="spinner"></div>');
    analyzeButton.disabled = true;
    sourcesContainer.style.display = 'none';

    let statusIndex = 0;
    const loadingStatuses = t.loading_statuses;
    resultContainer.innerHTML = `<p>${loadingStatuses[statusIndex++]}</p>`;
    loadingInterval = setInterval(() => {
        if (statusIndex < loadingStatuses.length) {
            resultContainer.innerHTML = `<p>${loadingStatuses[statusIndex++]}</p>`;
        } else { clearInterval(loadingInterval); }
    }, 2500);

    const analysisData = { 
        companyName: companyName,
        resumeText: resumeTextInput.value, 
        language: currentLang
    };
    chrome.runtime.sendMessage({ type: "ANALYZE_COMPANY", data: analysisData });
});

// --- Message Listeners ---

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ANALYSIS_RESULT") {
        if (loadingInterval) {
            clearInterval(loadingInterval);
            loadingInterval = null;
        }

        const t = translations[currentLang];
        const buttonTextSpan = analyzeButton.querySelector('span');
        const result = message.result;

        if (result.ok) {
            const companyName = smartPasteBox.value.trim();
            reportCache[companyName] = { report: result.data.report, sources: result.data.sources, name: result.data.company_name };
            renderReport(result.data.company_name, result.data.report, result.data.sources);
        } else {
            const errorData = result.data || {};
            if (errorData.error === 'rate_limit_exceeded') {
                resultContainer.innerHTML = `<div class="report-section warning"><h2>${t.rate_limit_exceeded.split('\n')[0]}</h2><p style="white-space: pre-wrap;">${t.rate_limit_exceeded.split('\n\n')[1]}</p></div>`;
            } else if (errorData.error === 'no_info_found') {
                resultContainer.innerHTML = `<div class="report-section warning"><h2>${t.no_info_found.split('。')[0]}</h2><p>${t.no_info_found}</p></div>`;
            } else {
                resultContainer.innerHTML = `<div class="report-section danger"><h2>Error</h2><p>${t.connection_error}</p></div>`;
            }
        }

        buttonTextSpan.textContent = t.button_text;
        if (analyzeButton.querySelector('.spinner')) analyzeButton.querySelector('.spinner').remove();
        analyzeButton.disabled = false;
    }
});

window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'FILL_SIDEBAR') {
        smartPasteBox.value = event.data.text;
        reportCache = {}; // Clear cache when new text is filled
        showWelcomeMessage();
    }
});


// --- Resizable Panel & Event Listeners ---
function makeResizable() {
    let isResizing = false;
    resizer.addEventListener('mousedown', (e) => { isResizing = true; document.body.style.userSelect = 'none'; document.body.style.pointerEvents = 'none'; });
    window.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const newHeight = e.clientY - topPanel.offsetTop;
        const minHeight = 250;
        const maxHeight = window.innerHeight - 200;
        if (newHeight > minHeight && newHeight < maxHeight) { topPanel.style.height = `${newHeight}px`; }
    });
    window.addEventListener('mouseup', (e) => {
        if (isResizing) { isResizing = false; document.body.style.userSelect = ''; document.body.style.pointerEvents = ''; chrome.storage.sync.set({ topPanelHeight: topPanel.style.height }); }
    });
}

themeSwitcher.addEventListener('click', () => {
    const isLight = document.documentElement.classList.contains('light-mode');
    setTheme(isLight ? 'dark' : 'light');
});
langToggle.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) { const langCode = button.dataset.lang; if (langCode && langCode !== currentLang) { setLanguage(langCode); } }
});
collapseButton.addEventListener('click', () => {
    window.parent.postMessage({ type: 'PROJECT_LENS_CLOSE_SIDEBAR' }, '*');
});

// Event delegation for handling external links
document.body.addEventListener('click', (event) => {
    const link = event.target.closest('a.external-link');
    if (link && link.href) {
        event.preventDefault();
        chrome.runtime.sendMessage({ type: "OPEN_NEW_TAB", url: link.href });
    }
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['theme', 'language', 'topPanelHeight'], (data) => {
        setTheme(data.theme || 'dark');
        setLanguage(data.language || 'zh-CN');
        topPanel.style.height = data.topPanelHeight || '60%';
        showWelcomeMessage();
    });
    makeResizable();
});
