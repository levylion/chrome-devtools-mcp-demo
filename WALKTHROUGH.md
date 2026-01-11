# 🍺 BrewMaster Pro: Chrome DevTools MCP Presentation Guide

**Goal:** Demonstrate how Chrome DevTools MCP helps AI agents identify, diagnose, and fix web development issues.

---

## 🚀 Setup & Launch

1. **Start the Mock API:**
   ```bash
   npx json-server db.json
   ```

2. **Start the Angular App:**
   ```bash
   npx ng serve
   ```
   *Open [http://localhost:4200](http://localhost:4200) (or the port shown in terminal)*

3. **Open Chrome DevTools:**
   - Press `F12` or `Cmd+Option+I`
   - ensure your AI assistant is connected to Chrome DevTools MCP

---

## 🎬 Demo Scenarios

### 1️⃣ Security Scan (Sensitive Data)
**Narrative:** "Let's see if our legacy auth code has any security holes."

*   **Action:** Ask AI: *"Check the application for any security vulnerabilities, especially in storage."*
*   **What happens:**
    1.  AI navigates to the app.
    2.  Logs in (or checks existing session).
    3.   inspects `sessionStorage`.
    4.  **FOUND:** `user_password` and `api_key` in plain text!
*   **The Fix:** AI suggests moving to `httpOnly` cookies or clearing storage on logout.

### 2️⃣ CSS Layout Bug (Mobile Responsive)
**Narrative:** "The dashboard looks great here, but how does it look on mobile?"

*   **Action:** Ask AI: *"Check if the dashboard is mobile responsive. Take screenshots to verify."*
*   **What happens:**
    1.  AI takes a desktop screenshot (Looks good).
    2.  AI uses emulation to switch to iPhone 12/Pixel view.
    3.  AI takes mobile screenshot.
    4.  **FOUND:** Cards overflowing horizontally, font size too big.
*   **The Fix:** AI modifies `dashboard.css` to use `repeat(auto-fit, minmax(...))` instead of fixed columns.

### 3️⃣ Performance & Emulation (The Laggy Log)
**Narrative:** "Our users report the Brew Log page is slow on older phones. Can you investigate?"

*   **Action:** Ask AI: *"Go to Brew Log page. Simulate a low-end device with 4x CPU slowdown and analyze performance."*
*   **What happens:**
    1.  AI enables **CPU Throttling (4x)**.
    2.  Navigates to Brew Log.
    3.  Runs a **Performance Trace**.
    4.  **FOUND:** 20,000 DOM nodes and frequent polling causing "DOM Thrashing".
*   **The Fix:** AI suggests Virtual Scrolling (`@angular/cdk/scrolling`).

### 4️⃣ Live Page Creation (The "Wow" Moment)
**Narrative:** "We need a new page to track ingredients. Can you build it?"

*   **Action:** Ask AI: *"Create a new 'Ingredients' page. It should have a list of grains/hops and a form to add new ones. Match the existing dark theme."*
*   **What happens:**
    1.  AI generates `ingredients.component.ts/html/css`.
    2.  AI adds the route.
    3.  **Verification:** AI navigates to the new page, hovers over items, and clicks buttons to prove it works.

### 5️⃣ Network Debugging (Broken Recipes)
**Narrative:** "The Recipes page isn't loading anything. It seems broken."

*   **Action:** Ask AI: *"Why is the Recipes page failing to load data?"*
*   **What happens:**
    1.  AI navigates to `/recipe-wishlist`.
    2.  AI inspects **Network Requests**.
    3.  **FOUND:** Failed requests to `http://api.wrong-domain.local:9999/recipes`.
*   **The Fix:** AI identifies the incorrect API domain in `recipe.service.ts` and corrects it to `http://localhost:3000`.

---

## 📝 Speaker Notes

*   **Emphasize "Intentional Bugs":** existing code often has hidden issues. MCP acts as a "second pair of eyes."
*   **Highlight Emulation:** The CSS and Performance scenarios show MCP doing things that are tedious for humans (switching devices, throttling CPU).
*   **The "Loop":** Show the pattern: **Detect → Fix → Verify**.

---

## 🐛 Bug Cheat Sheet

| Feature | Bug Location | Type |
|---------|--------------|------|
| **Auth** | `auth.service.ts` | Security (Sensitive Storage) |
| **Dashboard** | `dashboard.css` | CSS (Fixed Grid) |
| **Brew Log** | `brew-log.ts` | Performance (20k items + polling) |
| **Recipes** | `recipe.service.ts` | Network (Wrong URL) |
| **Add Batch** | `add-batch.ts` | Console Error (Undefined prop) |
| **Gauge** | `temperature-gauge.ts` | Accessibility (Missing ARIA) |
