# 🚨 Community Emergency Resource Directory

> **Course:** CSE326 – Internet & Web Programming  
> **Academic Year:** 2026  
> **Project Type:** Frontend Web Application (Client-Side)  
> **🌐 Live Demo:** [https://community-emergency-directory.vercel.app](https://community-emergency-directory.vercel.app)  
> **🔐 Admin PIN:** `1234`

---

## 👨‍🎓 Student Details (Fill before submission)
- **Student Name:** Shivansh Sharma
- **Registration No:** 12611232
- **Roll No / Section:** 48 / K4P26XP
- **Course Code:** CSE326 (Internet & Web Programming)

---

## 📌 Project Overview
The **Community Emergency Resource Directory** is a web-based crisis response portal designed to help citizens and disaster response volunteers quickly discover, locate, and contact essential relief services (Emergency Medical Aid, Disaster Shelters, Clean Food & Water Camps, and 24x7 Helplines).

The project combines **interactive geographic mapping (Leaflet.js)** with **real-time filtering**, **client-side data persistence (`localStorage`)**, and an **authenticated Admin Portal protected by a Security PIN**.

---

## 🌟 Key Features

### 1. 🌐 Public Portal (`index.html`)
- **Interactive OpenStreetMap Integration:** Visualizes emergency centers with interactive pins and detailed popups using Leaflet.js.
- **GPS Location Detection:** One-click *"My Location"* button utilizing the HTML5 Geolocation API (`navigator.geolocation`).
- **Live Multi-Criteria Filtering:** Simultaneous filtering by:
  - Keyword search (name, contact, or category)
  - Category dropdown (Shelter, Medical, Food & Water, Helpline)
  - Real-time availability status (Available, Limited, Full)
  - One-click **"Reset"** button to clear filters.
- **Emergency Summary Counters:** Dynamic statistics showing total available facilities, hospitals, and relief camps.
- **24x7 National Helpline Strip:** One-touch quick dial hotlines (112 Emergency, 108 Ambulance, 101 Fire, 1070 Disaster).
- **Responsive Card Grid:** Smooth hover lift animations and instant *"View on Map"* pan-and-zoom triggers.

### 2. 🔐 Admin Management Portal (`admin.html`)
- **Security PIN Authorization:** Restricted access screen requiring a 4-digit PIN.
  - **Default Admin PIN:** `1234`
  - Wrong PIN triggers a CSS keyframe shake animation and error feedback.
  - Session state maintained using `sessionStorage` with a manual *"Lock Portal"* button.
- **Full CRUD Management:**
  - **Create:** Add new emergency centers with auto-validation.
  - **Read:** Live administrative data table.
  - **Update:** Switch availability status dropdowns and toggle verification badges.
  - **Delete:** Remove outdated listings with confirmation prompt.
- **Client-Side Form Validation:**
  - JavaScript Regex verification for contact numbers.
  - Numerical range boundary verification for coordinates (Latitude: -90° to 90°, Longitude: -180° to 180°).
  - Bootstrap visual feedback states (`is-valid` / `is-invalid`).
- **Data Export & Demo Reset:**
  - **📥 Export JSON:** Download the live listings as a `.json` backup file.
  - **🔄 Reset Demo Data:** One-click button to restore initial sample hospitals, shelters, and relief camps.

---

## 🛠️ Technology Stack
- **Structure:** Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- **Styling:** CSS3 (Custom Variables, Flexbox, CSS Grid, `@keyframes` Animations, Hover Transitions) + Bootstrap 5.3 CDN
- **Scripting:** Pure JavaScript ES6+ (DOM manipulation, Arrow Functions, Array Methods: `map`, `filter`, `find`)
- **Mapping Library:** Leaflet.js v1.9.4 & OpenStreetMap Tiles
- **Storage & APIs:** HTML5 Web Storage API (`localStorage` & `sessionStorage`), HTML5 Geolocation API

---

## 📂 Project Structure
```text
HTML Project/
│
├── index.html          # Public directory portal with map & search
├── admin.html          # Admin portal protected with Security PIN
├── 15.html             # Student Performance Dashboard
├── README.md           # Project documentation & evaluation guide
│
├── css/
│   └── styles.css      # Custom styling, animations & PIN overlay
│
└── js/
    ├── data.js         # Default dataset & localStorage initialization
    ├── map.js          # Leaflet.js map setup, markers & geolocation
    ├── app.js          # Public directory rendering, search & filters
    └── admin.js        # Admin PIN auth, form validation & CRUD actions
```

---

## 🚀 How to Run the Project
1. Open the project folder on your computer.
2. Double-click **`index.html`** to launch the Public Portal in any modern web browser (Chrome, Edge, Safari, Firefox).
3. To access the Admin Dashboard, click **"Admin Dashboard"** in the navigation bar.
4. When prompted by the Security Lock screen:
   - **PIN:** `1234`
   - Click **Unlock Portal**.
