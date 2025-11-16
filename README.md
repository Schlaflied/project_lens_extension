# 🔬 职场透镜浏览器扩展 (Project Lens Extension)

这是一个基于 Chromium 内核浏览器（Chrome, Edge）的侧边栏扩展工具。它专为求职者设计，可直接在招聘网站上激活，提供即时、深入的 AI 公司文化和风险分析。

This is a sidebar extension built for Chromium-based browsers (Chrome, Edge). Designed for job seekers, it activates directly on hiring sites, providing instant, in-depth AI company culture and risk analysis.

## 核心功能 / Core Features

* **情境式激活 / Contextual Activation:** 扩展会在 **LinkedIn, Indeed, Glassdoor** 等主流求职网站上自动激活，并注入一个浮动的、可拖动的指南针按钮。
* **一键分析 / One-Click Analysis:** 在支持的网站上，点击浮动按钮或页面中的“🔬 Analyze”集成按钮，即可自动抓取当前职位信息并填充到侧边栏。
* **划词分析 / Context Menu Analysis:** 用户可以在任何网页上划选公司信息或文本，通过右键菜单直接调用插件进行分析。
* **可定制 UI / Customizable UI:** 提供一个可调整大小（Resizer）的侧边栏面板，用于输入信息和切换语言/主题。
* **AI 报告与引用 / AI Reporting & Citation:** 插件连接到 Project Lens 后端 API，获取 Gemini 生成的详细报告，包括红旗风险、文化契合度和引用来源。
* **稳健的后台 / Robust Background:** `background.js` 采用优化的异步处理，确保即使在网络或 API 错误时，也能向侧边栏返回清晰的错误信息。

## 技术栈 / Tech Stack

| 模块 / Module | 组件 / Component | 描述 / Description |
| :--- | :--- | :--- |
| **架构 / Architecture** | Manifest V3 (MV3) | 现代 Chrome/Edge 扩展架构，使用 Service Worker 作为后台。/ Modern Chrome/Edge extension architecture using a Service Worker for the background. |
| **UI 集成 / UI Integration** | Content Script, Iframes | `content.js` 负责注入浮动按钮和侧边栏 (`sidebar.html`)，并处理页面交互。/ `content.js` injects the floating button and sidebar (`sidebar.html` as an iframe) and handles page interaction. |
| **前端 / Frontend** | HTML, CSS, Vanilla JavaScript | 侧边栏的 UI 逻辑、国际化和主题切换。/ Sidebar UI logic, i18n, and theme switching. |
| **API 通信 / API Communication** | `background.js` (Fetch API) | 负责调用外部后端 API (`https://project-lens-backend.../analyze`)。/ Handles calling the external backend API. |

## 浏览器兼容性 / Browser Compatibility

本项目基于通用的 **Chromium** 扩展架构开发，兼容性优秀。/ This project is based on the general **Chromium** extension architecture and has excellent compatibility.

| 浏览器 / Browser | 兼容性 / Compatibility | 备注 / Notes |
| :--- | :--- | :--- |
| **Google Chrome** | ✅ Fully Supported | 标准开发平台。/ Standard development platform. |
| **Microsoft Edge** | ✅ Fully Supported | 基于 Chromium 内核，完全兼容。/ Fully compatible due to the Chromium engine. |
