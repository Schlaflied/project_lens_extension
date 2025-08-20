// background.js - The smarter messenger!

const API_URL = 'https://project-lens-backend-885033581194.us-central1.run.app/analyze';

// 监听来自 content script 或 sidebar 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 当收到分析请求时...
    if (message.type === "ANALYZE_COMPANY") {
        console.log("Background script received analysis request:", message.data);
        
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message.data),
        })
        .then(response => {
            return response.json().then(data => ({ 
                ok: response.ok, 
                data: data 
            }));
        })
        .then(result => {
            console.log("Sending result to sidebar:", result);
            chrome.runtime.sendMessage({ type: "ANALYSIS_RESULT", result: result });
        })
        .catch(error => {
            console.error("Error calling API:", error);
            const errorResult = { ok: false, data: { error: "connection_error", message: error.message } };
            chrome.runtime.sendMessage({ type: "ANALYSIS_RESULT", result: errorResult });
        });
        
        // 返回 true 表示我们将异步地发送响应
        return true; 
    }

    // 【新增代码】当收到打开新标签页的请求时...
    if (message.type === "OPEN_NEW_TAB") {
        // 使用 chrome.tabs API 来创建一个新的标签页
        chrome.tabs.create({ url: message.url });
        // 这里不需要异步返回，所以不用 return true
    }
});

// 当用户点击浏览器右上角的插件图标时，通知 content script 打开侧边栏
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_SIDEBAR" });
});

