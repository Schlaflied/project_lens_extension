// sidebar.js - The new intelligent core for the extension
// Version: 26.0 - Web App Feature Sync

// --- 1. 元素获取 ---
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

// --- 2. 国际化、定义与图标 (与网页版 v19.0 同步) ---
let currentLang = 'zh-CN';
const translations = {
    'zh-CN': {
        logo_text: '🔬 职场透镜', title: '输入信息', subtitle: 'AI将自动搜索并分析公司',
        smart_paste_label: '粘贴职位信息或公司名', smart_paste_placeholder: '在此处粘贴职位描述(JD)或公司名...',
        aspects_label: '选择你关注的方面 (分析后可随时切换)',
        aspect_wlb: '工作与生活平衡', aspect_reputation: '公司声誉', aspect_growth: '成长机会',
        aspect_innovation: '创新文化', aspect_salary: '薪酬水平', aspect_benefits: '福利待遇',
        aspect_overtime: '加班文化', aspect_management: '管理风格', aspect_diversity: '多元化与包容性',
        aspect_training: '培训与学习', aspect_sustainability: '可持续性',
        resume_label: '我的简历 / 个人简介 (可选)', resume_placeholder: '粘贴你的个人简介或简历，获得更精准的匹配分析...',
        button_text: '开始分析', button_loading_text: '分析中...',
        support_text: "请开发者喝杯咖啡",
        welcome_title: "欢迎来到 Project Lens！", welcome_p1: "在求职网站上点击“🔬分析”按钮，或在任何网页划词右键，即可开始！",
        no_info_found: "抱歉，我在网络上找不到关于这家公司的有效信息。请尝试使用公司的官方全称再试一次。",
        connection_error: "发生连接错误，请检查网络或联系开发者。",
        loading_statuses: ["正在连接AI大脑...", "正在全网搜索公司信息...", "正在阅读相关新闻与评价...", "正在召唤 Gemini 进行深度分析...", "即将完成，正在生成报告..."],
        report_titles: {
            red_flag: '🚨 Red Flag 风险扫描', culture_fit: '📊 文化契合度分析', hiring_experience: '👻 招聘流程与候选人体验分析',
            timeliness: '⏱️ 信息时效性分析', value_match: '💖 价值匹配报告', final_risk: '⚖️ 最终风险评估', sources: '引用来源'
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
            innovation: '创新文化是指公司鼓励和支持员工提出新想法、尝试新方法并从失败中学习的内部环境。',
            benefits: '福利待遇是指公司在工资之外为员工提供的非现金形式的报酬，如健康保险、退休金计划、带薪休假等。',
            diversity: '多元化与包容性是指公司在员工构成上体现多样性，并创造一个让所有背景的员工都感到被尊重和重视的工作环境。',
            training: '培训与学习指的是公司为提升员工技能和知识而提供的各种正式和非正式的学习机会。',
        }
    },
     'zh-TW': {
        logo_text: '🔬 職場透鏡', title: '輸入資訊', subtitle: 'AI將自動搜索並分析公司',
        smart_paste_label: '貼上職位資訊或公司名', smart_paste_placeholder: '在此處貼上職位描述(JD)或公司名...',
        aspects_label: '選擇您關注的方面 (分析後可隨時切換)',
        aspect_wlb: '工作與生活平衡', aspect_reputation: '公司聲譽', aspect_growth: '成長機會',
        aspect_innovation: '創新文化', aspect_salary: '薪酬水平', aspect_benefits: '福利待遇',
        aspect_overtime: '加班文化', aspect_management: '管理風格', aspect_diversity: '多元化與包容性',
        aspect_training: '培訓與學習', aspect_sustainability: '永續性',
        resume_label: '我的履歷 / 個人簡介 (可選)', resume_placeholder: '貼上你的個人簡介或履歷，獲得更精準的匹配分析...',
        button_text: '開始分析', button_loading_text: '分析中...',
        support_text: "請開發者喝杯咖啡",
        welcome_title: "歡迎來到 Project Lens！", welcome_p1: "在求職網站上點擊「🔬分析」按鈕，或在任何網頁劃詞右鍵，即可開始！",
        no_info_found: "抱歉，我在網路上找不到關於這家公司的有效資訊。請嘗試使用公司的官方全名再試一次。",
        connection_error: "發生連接錯誤，請檢查網路或聯絡開發者。",
        loading_statuses: ["正在連接AI大腦...", "正在全網搜尋公司資訊...", "正在閱讀相關新聞與評價...", "正在召喚 Gemini 進行深度分析...", "即將完成，正在生成報告..."],
        report_titles: {
            red_flag: '🚨 Red Flag 風險掃描', culture_fit: '📊 文化契合度分析', hiring_experience: '👻 招聘流程與候選人體驗分析',
            timeliness: '⏱️ 資訊時效性分析', value_match: '💖 價值匹配報告', final_risk: '⚖️ 最終風險評估', sources: '引用來源'
        },
        aspects: {
            reputation: '公司聲譽', management: '管理風格', sustainability: '永續性', wlb: '工作與生活平衡',
            growth: '成長機會', salary: '薪酬水平', overtime: '加班文化', innovation: '創新文化',
            benefits: '福利待遇', diversity: '多元化與包容性', training: '培訓與學習', rating: '評級'
        },
        definitions: {
            reputation: '公司聲譽是公眾、客戶、員工和投資者對一個組織的綜合看法和評價。',
            management: '管理風格是指公司各級管理者在領導團隊、分配任務、做出決策時所表現出的一貫行為模式。',
            sustainability: '永續性是指公司在追求經濟利益的同時，如何平衡其對社會和環境的影響。',
            wlb: '工作與生活平衡指的是員工能夠在職業責任和個人生活之間找到一個健康的平衡點。',
            growth: '成長機會指的是公司為員工提供的學習新技能、承擔更多責任、以及獲得晉升的可能性。',
            salary: '薪酬水平指的是公司提供的工資、獎金等現金報酬在市場中的相對位置。',
            overtime: '加班文化是指公司對於正常工作時間之外的額外工作的普遍態度和做法。',
            innovation: '創新文化是指公司鼓勵和支持員工提出新想法、嘗試新方法並從失敗中學習的內部環境。',
            benefits: '福利待遇是指公司在工資之外為員工提供的非現金形式的報酬，如健康保險、退休金計畫、帶薪休假等。',
            diversity: '多元化與包容性是指公司在員工構成上體現多樣性，並創造一個讓所有背景的員工都感到被尊重和重視的工作環境。',
            training: '培訓與學習指的是公司為提升員工技能和知識而提供的各種正式和非正式的學習機會。',
        }
    },
    'en': {
        logo_text: '🔬 Project Lens', title: 'Input Information', subtitle: 'AI will automatically search and analyze the company',
        smart_paste_label: 'Paste Job Info or Company Name', smart_paste_placeholder: 'Paste job description (JD) or company name here...',
        aspects_label: 'Select Aspects You Care About (Switch anytime after analysis)',
        aspect_wlb: 'Work-Life Balance', aspect_reputation: 'Reputation', aspect_growth: 'Growth Opportunities',
        aspect_innovation: 'Innovation Culture', aspect_salary: 'Salary Level', aspect_benefits: 'Benefits Package',
        aspect_overtime: 'Overtime Culture', aspect_management: 'Management', aspect_diversity: 'Diversity & Inclusion',
        aspect_training: 'Training & Learning', aspect_sustainability: 'Sustainability',
        resume_label: 'My Resume / Bio (Optional)', resume_placeholder: 'Paste your bio or resume for a more accurate culture-fit analysis...',
        button_text: 'Analyze', button_loading_text: 'Analyzing...',
        support_text: "Buy me a coffee",
        welcome_title: "Welcome to Project Lens!", welcome_p1: "On job sites, click the '🔬 Analyze' button, or on any webpage, highlight text and right-click to start!",
        no_info_found: "Sorry, I couldn't find any valid information about this company online. Please try again using the company's official full name.",
        connection_error: "Connection error. Please check your network or contact the developer.",
        loading_statuses: ["Connecting to the AI brain...", "Searching for company info across the web...", "Reading related news and reviews...", "Summoning Gemini for deep analysis...", "Finalizing, generating report..."],
        report_titles: {
            red_flag: '🚨 Red Flag Scan', culture_fit: '📊 Culture Fit Analysis', hiring_experience: '👻 Hiring Process & Candidate Experience Analysis',
            timeliness: '⏱️ Information Timeliness Analysis', value_match: '💖 Value Match Report', final_risk: '⚖️ Final Risk Assessment', sources: 'References'
        },
        aspects: {
            reputation: 'Reputation', management: 'Management', sustainability: 'Sustainability', wlb: 'Work-Life Balance',
            growth: 'Growth Opportunities', salary: 'Salary Level', overtime: 'Overtime Culture', innovation: 'Innovation Culture',
            benefits: 'Benefits Package', diversity: 'Diversity & Inclusion', training: 'Training & Learning', rating: 'Rating'
        },
         definitions: {
            reputation: 'Corporate reputation is the comprehensive perception and evaluation of an organization by the public, customers, employees, and investors.',
            management: 'Management style refers to the consistent pattern of behavior exhibited by managers in leading teams, assigning tasks, and making decisions.',
            sustainability: 'Sustainability refers to how a company balances its environmental and social impacts with its economic interests.',
            wlb: 'Work-life balance refers to the healthy, sustainable equilibrium employees can find between their professional responsibilities and personal life.',
            growth: 'Growth opportunities refer to the possibilities the company provides for employees to learn new skills, take on more responsibilities, and advance in their careers.',
            salary: 'Salary level refers to the relative position of the cash compensation offered by the company within the market.',
            overtime: 'Overtime culture refers to the company\'s general attitude and practices regarding extra work beyond normal working hours.',
            innovation: 'Innovation culture refers to the internal environment where the company encourages and supports employees to propose new ideas, try new methods, and learn from failures.',
            benefits: 'Benefits package refers to non-cash compensation provided to employees in addition to their wages, such as health insurance, retirement plans, paid time off, etc.',
            diversity: 'Diversity and Inclusion refers to having a diverse workforce and creating a work environment where employees from all backgrounds feel respected and valued.',
            training: 'Training and Learning refers to the various formal and informal learning opportunities provided by the company to enhance employee skills and knowledge.',
        }
    }
};

const ICONS = {
    linkedin: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>`,
    glassdoor: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.185 1.185A1.5 1.5 0 0 1 2.57.293l10.854 10.854a.5.5 0 0 1 0 .708L11.146 14a.5.5 0 0 1-.708 0L.293 2.854A1.5 1.5 0 0 1 1.185 1.185zM14.815 1.185a1.5 1.5 0 0 0-2.122 0L.854 13.146a.5.5 0 0 0 0 .708L2.854 15.707a.5.5 0 0 0 .708 0L15.707 3.565a1.5 1.5 0 0 0 0-2.122l-.892-.892z"/></svg>`,
    indeed: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.555 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM10.31 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM8.36 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM5.945 5.582a.363.363 0 0 0-.363.363v4.062a.363.363 0 0 0 .363.363h.363a.363.363 0 0 0 .363-.363V5.945a.363.363 0 0 0-.363-.363h-.363zM15.363 4.091A1.91 1.91 0 0 0 13.455 2.182h-10.91A1.91 1.91 0 0 0 .636 4.091v7.818A1.91 1.91 0 0 0 2.545 13.818h10.91a1.91 1.91 0 0 0 1.909-1.909V4.091zM2.909 5.227a1.136 1.136 0 1 1 0 2.273 1.136 1.136 0 0 1 0-2.273z"/></svg>`,
    default: `<svg class="source-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>`
};

// --- 3. 核心逻辑 ---
let loadingInterval = null;
let fullReportData = null; 
let companyNameData = null;
let sourcesData = null;


function setLanguage(langCode) {
    currentLang = langCode;
    document.documentElement.lang = langCode;
    const t = translations[currentLang];
    document.querySelectorAll('[data-key]').forEach(el=>el.textContent = t[el.dataset.key]||'');
    document.querySelectorAll('[data-key-placeholder]').forEach(el=>el.placeholder=t[el.dataset.keyPlaceholder]||'');
    document.querySelectorAll('[data-key-title]').forEach(el => el.title = t[el.dataset.keyTitle] || '');
    
    langToggle.querySelectorAll('button').forEach(btn=>btn.classList.toggle('active', btn.dataset.lang===langCode));
    chrome.storage.sync.set({ language: langCode });

    generateAspectTags(); // 重新生成标签以匹配语言
    if (fullReportData) { // 如果已有报告，则用新语言重新渲染
        renderReport();
    } else {
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
    let tagsHTML = '';
    const defaultChecked = ['wlb', 'reputation', 'growth', 'salary', 'overtime'];
    // 使用网页版的 aspects 列表来生成
    const aspects = ['wlb', 'reputation', 'growth', 'innovation', 'salary', 'benefits', 'overtime', 'management', 'diversity', 'training', 'sustainability'];
    aspects.forEach(key => {
        const checked = defaultChecked.includes(key) ? 'checked' : '';
        tagsHTML += `<input type="checkbox" id="${key}" value="${key}" ${checked}><label for="${key}" data-key="aspect_${key}">${t['aspect_' + key]}</label>`;
    });
    aspectTagsContainer.innerHTML = tagsHTML;
}


function showWelcomeMessage() {
    const t = translations[currentLang];
    resultContainer.innerHTML = `<h2 data-key="welcome_title">${t.welcome_title}</h2><p data-key="welcome_p1" style="color: var(--text-secondary-color); margin-top: 15px;">${t.welcome_p1}</p>`;
    sourcesContainer.innerHTML = '';
    sourcesContainer.style.display = 'none';
}

// ✨ 核心函数：与网页版 index.html 的 renderReport 逻辑完全同步
function renderReport() {
    if (!fullReportData) return;

    const t = translations[currentLang];
    const titles = t.report_titles;
    const aspects = t.aspects;
    const defs = t.definitions;

    const sourceLinkMap = {};
    sourcesData.forEach(source => { sourceLinkMap[source.id] = source.link; });

    const processText = text => {
        if (!text) return '';
        const linkedText = text.replace(/\[(\d+)\]/g, (match, id) => {
            const url = sourceLinkMap[id];
            // 在插件中，我们不能直接打开链接，需要发消息给 background.js
            return url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="citation-link external-link">[${id}]</a>` : match;
        });
        return marked.parse(linkedText);
    };

    const selectedAspects = Array.from(aspectTagsContainer.querySelectorAll('input:checked')).map(input => input.value);
    
    const reportHeaderHTML = `<div class="report-header"><div class="company-name">${companyNameData}</div><div class="company-location">${fullReportData.company_location || ''}</div></div>`;

    const redFlagHTML = fullReportData.red_flag_text ? `<div class="report-section success"><h2>${titles.red_flag}</h2><div class="status">${processText(fullReportData.red_flag_status)}</div>${processText(fullReportData.red_flag_text)}</div>` : '';
    const hiringExperienceHTML = fullReportData.hiring_experience_text ? `<div class="report-section warning"><h2>${titles.hiring_experience}</h2>${processText(fullReportData.hiring_experience_text)}</div>` : '';
    const timelinessHTML = fullReportData.timeliness_analysis ? `<div class="report-section info"><h2>${titles.timeliness}</h2>${processText(fullReportData.timeliness_analysis)}</div>` : '';

    let cultureFitHTML = `<h2>${titles.culture_fit}</h2>`;
    const cf = fullReportData.culture_fit || {};
    let hasCultureFitContent = false;
    selectedAspects.forEach(key => {
         if (cf[key] && aspects[key] && defs[key]) {
            cultureFitHTML += `<h3>${aspects[key]}<span class="tooltip-container"><span class="tooltip-icon">i</span><span class="tooltip-text">${defs[key]}</span></span></h3>${processText(cf[key])}`;
            hasCultureFitContent = true;
        }
    });
    if (!hasCultureFitContent) { cultureFitHTML += `<p>${t.subtitle}</p>` }
    
    const valueMatchHTML = fullReportData.value_match_score > 0 ? `<h2>${titles.value_match}</h2><div class="progress-bar-container"><div class="progress-bar" style="width: ${fullReportData.value_match_score}%;">${fullReportData.value_match_score}%</div></div>${processText(fullReportData.value_match_text)}` : '';
    const finalRiskHTML = fullReportData.final_risk_rating ? `<h2>${titles.final_risk}</h2><p><strong>${aspects.rating}: ${fullReportData.final_risk_rating}</strong></p>${processText(fullReportData.final_risk_text)}` : '';

    resultContainer.innerHTML = DOMPurify.sanitize(reportHeaderHTML + redFlagHTML + hiringExperienceHTML + timelinessHTML + cultureFitHTML + valueMatchHTML + finalRiskHTML, {ADD_TAGS: ['span', 'div', 'ul', 'li', 'strong', 'a', 'br', 'h2', 'h3', 'p', 'em', 'b', 'i'], ADD_ATTR: ['style', 'href', 'class', 'target', 'rel']});
    
    let sourcesHTML = `<h2>${titles.sources}</h2>`;
    sourcesData.forEach(source => {
        sourcesHTML += `<div class="source-item" id="source-${source.id}">${ICONS[source.source_type] || ICONS.default}<span>[${source.id}]</span><a href="${source.link}" target="_blank" rel="noopener noreferrer" class="external-link">${source.title}</a></div>`;
    });
    sourcesContainer.innerHTML = DOMPurify.sanitize(sourcesHTML, {ADD_TAGS: ['div', 'span', 'a', 'svg', 'path'], ADD_ATTR: ['id', 'href', 'target', 'rel', 'class', 'xmlns', 'width', 'height', 'fill', 'viewBox', 'd', 'fill-rule']});
    sourcesContainer.style.display = sourcesData.length > 0 ? 'block' : 'none';
}


analyzeButton.addEventListener('click', () => {
    const t = translations[currentLang];
    const buttonTextSpan = analyzeButton.querySelector('span');
    
    buttonTextSpan.textContent = t.button_loading_text;
    analyzeButton.insertAdjacentHTML('beforeend', '<div class="spinner"></div>');
    analyzeButton.disabled = true;
    sourcesContainer.style.display = 'none';
    fullReportData = null; companyNameData = null; sourcesData = null;

    let statusIndex = 0;
    const loadingStatuses = t.loading_statuses;
    resultContainer.innerHTML = `<p>${loadingStatuses[statusIndex++]}</p>`;
    loadingInterval = setInterval(() => {
        if (statusIndex < loadingStatuses.length) {
            resultContainer.innerHTML = `<p>${loadingStatuses[statusIndex++]}</p>`;
        } else { clearInterval(loadingInterval); }
    }, 2500);

    chrome.runtime.sendMessage({ 
        type: "ANALYZE_COMPANY", 
        data: { 
            companyName: smartPasteBox.value, 
            resumeText: resumeTextInput.value, 
            language: currentLang 
        } 
    });
});

// --- 消息监听器 ---
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ANALYSIS_RESULT") {
        if (loadingInterval) clearInterval(loadingInterval);
        
        const t = translations[currentLang];
        const result = message.result;

        if (result.ok) {
            fullReportData = result.data.report;
            companyNameData = result.data.company_name;
            sourcesData = result.data.sources;
            renderReport();
        } else {
            let errorMessage = t.connection_error;
            // ✨ 核心修正：读取后端返回的动态错误信息
            if (result.status === 429 && result.data && result.data.message) {
                errorMessage = result.data.message;
            } else if (result.data && result.data.error === 'no_info_found') {
                errorMessage = t.no_info_found;
            }
            resultContainer.innerHTML = `<h2 style="color: var(--danger-color);">Error</h2><p style="white-space: pre-wrap;">${errorMessage}</p>`;
        }

        const buttonTextSpan = analyzeButton.querySelector('span');
        buttonTextSpan.textContent = t.button_text;
        if(analyzeButton.querySelector('.spinner')) analyzeButton.querySelector('.spinner').remove();
        analyzeButton.disabled = false;
    } else if (message.type === 'FILL_SIDEBAR') {
        smartPasteBox.value = message.text;
        fullReportData = null; // 清空旧报告
        showWelcomeMessage(); // 显示欢迎信息
    }
});

// --- 可调整大小的面板 & 事件监听器 ---
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

themeSwitcher.addEventListener('click', () => setTheme(document.documentElement.classList.contains('light-mode') ? 'dark' : 'light'));
langToggle.addEventListener('click', (e) => { if (e.target.tagName==='BUTTON') setLanguage(e.target.dataset.lang); });
aspectTagsContainer.addEventListener('change', () => { if (fullReportData) renderReport(); });
collapseButton.addEventListener('click', () => window.parent.postMessage({ type: 'PROJECT_LENS_CLOSE_SIDEBAR' }, '*'));
document.body.addEventListener('click', (event) => {
    const link = event.target.closest('a.external-link');
    if (link && link.href) {
        event.preventDefault();
        chrome.runtime.sendMessage({ type: "OPEN_NEW_TAB", url: link.href });
    }
});

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['theme', 'language', 'topPanelHeight'], (data) => {
        setTheme(data.theme || 'dark');
        setLanguage(data.language || 'zh-CN');
        topPanel.style.height = data.topPanelHeight || '60%';
    });
    makeResizable();
});
