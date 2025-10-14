// background.js - The central command and context menu manager
// Version 25.1 - Bulletproof Response Handling

const API_URL = 'https://project-lens-backend-885033581194.us-central1.run.app/analyze';

// --- Context Menu Setup (No change) ---
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "project-lens-analyze",
        title: "Analyze with Project Lens",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "project-lens-analyze" && info.selectionText) {
        chrome.tabs.sendMessage(tab.id, {
            type: "CONTEXT_MENU_ANALYZE",
            text: info.selectionText
        });
    }
});

// --- Message Handling for API calls and Tab management ---
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ANALYZE_COMPANY") {
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message.data),
        })
        .then(async (response) => {
            // --- ✨ 核心修正：更稳健的响应处理 ---
            const result = {
                ok: response.ok,
                status: response.status,
                data: null
            };
            // 1. 总是先获取原始文本，这几乎不会失败
            const responseText = await response.text();
            try {
                // 2. 尝试将文本解析为JSON
                result.data = JSON.parse(responseText);
            } catch (e) {
                // 3. 如果解析失败，说明响应不是JSON（比如一个纯文本错误）
                //    我们就把原始文本作为错误消息
                result.data = { error: 'parse_error', message: responseText };
            }
            return result;
        })
        .then(result => {
             // 将结构化的结果对象（无论成功或失败）转发给侧边栏
            chrome.runtime.sendMessage({ type: "ANALYSIS_RESULT", result: result });
        })
        .catch(error => {
            // 这里现在只捕获真正的网络故障
            console.error("API Fetch/Network Error:", error);
            const errorResult = { ok: false, status: 0, data: { error: "connection_error", message: error.toString() } };
            chrome.runtime.sendMessage({ type: "ANALYSIS_RESULT", result: errorResult });
        });
        return true; // 表示异步响应
    }

    if (message.type === "OPEN_NEW_TAB") {
        chrome.tabs.create({ url: message.url, active: true });
    }
    
    if (message.type === "TOGGLE_SIDEBAR") {
        if (sender.tab?.id) {
            chrome.tabs.sendMessage(sender.tab.id, { type: "TOGGLE_SIDEBAR" });
        }
    }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_SIDEBAR" });
    }
});
