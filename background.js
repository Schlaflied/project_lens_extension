// background.js - The central command and context menu manager
// Version 25.0 - Robust Fetch & Error Handling

const API_URL = 'https://project-lens-backend-885033581194.us-central1.run.app/analyze';

// --- Context Menu Setup ---
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
            // 【核心升级】This is a more robust way to handle all responses from our backend.
            const result = {
                ok: response.ok,
                status: response.status,
                data: null
            };
            try {
                // Our backend sends JSON for both success and known errors (like 429)
                result.data = await response.json();
            } catch (e) {
                // This catches network errors or if the server sends non-JSON response
                result.data = { error: 'parse_error', message: 'Failed to parse server response.' };
            }
            return result;
        })
        .then(result => {
             // Forward the structured result object (success or error) to the sidebar
            chrome.runtime.sendMessage({ type: "ANALYSIS_RESULT", result: result });
        })
        .catch(error => {
            // This now primarily catches true network failures
            console.error("API Fetch/Network Error:", error);
            const errorResult = { ok: false, data: { error: "connection_error", message: error.toString() } };
            chrome.runtime.sendMessage({ type: "ANALYSIS_RESULT", result: errorResult });
        });
        return true; // Indicates an asynchronous response
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
