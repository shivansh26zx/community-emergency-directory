# 🚨 Community Emergency Resource Directory

> **Course:** CSE326 – Internet & Web Programming  
> **Student Name:** Shivansh Sharma  
> **Registration No:** 12611232 | **Roll No:** 48 | **Section:** K4P26XP  
> **🌐 Live GitHub Pages:** [https://shivansh26zx.github.io/community-emergency-directory/](https://shivansh26zx.github.io/community-emergency-directory/)  
> **⚡ Live Vercel Mirror:** [https://community-emergency-directory.vercel.app](https://community-emergency-directory.vercel.app)  
> **📂 GitHub Repository:** [https://github.com/shivansh26zx/community-emergency-directory](https://github.com/shivansh26zx/community-emergency-directory)  

---

## 🎯 Project Overview & Objective
The **Community Emergency Resource Directory** is a clean, accessible, and responsive crisis response website designed to connect citizens, relief volunteers, and emergency response workers with vital services (trauma hospitals, disaster shelters, clean water camps, and dispatch helplines).

The entire project has been restructured to strictly demonstrate the theoretical and practical concepts taught across **Unit #1, Unit #2, and Unit #3** of the CSE326 curriculum. Every tag, attribute, and style rule maps directly to the syllabus so it can be easily explained during class viva and laboratory evaluation.

---

## 📚 Syllabus Alignment & Defense Guide (Units 1, 2, and 3)

### 1️⃣ Unit #1: HTML5 Fundamentals
* **Document Structure & Metadata:**
  * `<!DOCTYPE html>`: HTML5 document type declaration.
  * `<html lang="en">`: Declares language for accessibility.
  * `<head>` with `<meta charset="UTF-8">`, `<meta name="viewport">` (responsive scaling), `<meta name="author">`, `<meta name="description">`, `<meta name="keywords">`.
* **Headings & Text Hierarchy:**
  * Headings `<h1>` down to `<h6>` following proper SEO hierarchy.
  * Paragraphs `<p>`, line breaks `<br>`, and thematic horizontal rules `<hr>`.
* **Text Formatting Elements:**
  * `<b>` & `<strong>` (bold / important text).
  * `<i>` & `<em>` (italic / emphasized text).
  * `<mark>` (highlighted text), `<small>` (disclaimer text).
  * `<del>` (deleted text) and `<ins>` (inserted text).
  * `<sup>` (superscript, e.g., pH 7<sup>+</sup>) and `<sub>` (subscript, e.g., H<sub>2</sub>O).
* **Quotations & Citations:**
  * `<blockquote>` (with `cite="..."` attribute for official NDMA guideline quote).
  * `<q>` (inline quotation) and `<cite>` (creative work citation).
  * `<abbr title="...">` (e.g., `<abbr title="Community Emergency Response Team">CERT</abbr>`).
  * `<dfn>` (defining term: Emergency Evacuation Zone).
* **Lists:**
  * **Unordered List (`<ul type="square">`):** Emergency supply kit essentials.
  * **Ordered List (`<ol type="1">`):** Step-by-step crisis evacuation procedures.
  * **Description List (`<dl>`, `<dt>`, `<dd>`):** Crisis terms (Triage, Disaster Shelter, Trauma Relief Wing).
* **Hyperlinks (`<a>`):**
  * `target="_blank"` with `title` for external tabs.
  * Internal bookmark anchors (`href="#about"`, `href="#schedule"`, `href="#register"`).
  * Special protocols: `tel:112` and `mailto:emergency.relief@community.org`.
* **Images & Figures:**
  * `<figure>` with `<img>` (`src`, `alt`, `width`, `height`) and `<figcaption>`.
* **HTML Table with `colspan` and `rowspan`:**
  * `<table>` with `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`.
  * **`rowspan="2"`:** Merges Category cell across multiple facility rows (e.g., Medical Aid covers Civil Hospital and Apex Relief).
  * **`colspan="2"`:** Merges Operational Hours across morning and night shifts.
* **Multimedia Elements:**
  * `<audio controls>`: Emergency siren audio broadcast with `<source>` and fallback text.
  * `<video controls width="100%">`: Disaster safety guidelines video with `<source>` and fallback text.
  * `<iframe>`: Embedded interactive emergency map window.
* **Scalable Vector Graphics (SVG):**
  * Embedded `<svg>` container drawing an official vector relief badge using `<rect>`, `<circle>`, `<line>`, and `<text>`.

---

### 2️⃣ Unit #2: Semantic Layout, Accessibility & Forms
* **Semantic Page Architecture:**
  * `<header>`: Page introduction and main title.
  * `<nav>`: Primary navigation section.
  * `<main>`: Unique central content area (strictly one per page).
  * `<section>`: Thematic groupings of content.
  * `<article>`: Self-contained announcements.
  * `<aside>`: Related sidebar containing direct dispatch hotline numbers.
  * `<footer>`: Copyright, course credentials, and `<address>` contact tag.
* **Accessibility Fundamentals:**
  * Descriptive `alt` text on images for screen readers.
  * Every `<label for="element_id">` explicitly binds to its `<input id="element_id">`.
* **Comprehensive Emergency Registration Form (`<form>`):**
  * `action="registered.html"` and `method="GET"`.
  * `<input type="text">`, `type="email"`, `type="tel"`.
  * **Radio Button Groups:** Grouped by identical `name="resource_category"` ensuring only one radio option can be checked.
  * **Checkboxes:** Multi-select checkboxes for provisions (Ambulance, Oxygen, Clean Water, Power Backup).
  * **Dropdown Menu:** `<select>` with `<option>` elements for relief zones.
  * **Textarea:** `<textarea rows="4" cols="40">` for multi-line physical directions.
  * **File Upload:** `<input type="file">` for ID/permit uploads.
  * **Action Buttons:** `<input type="submit">`, `<input type="reset">`, and `<button type="submit">`.

---

### 3️⃣ Unit #3: Cascading Style Sheets (CSS)
* **Types of CSS Applied:**
  * **External CSS:** Main styling cleanly separated in `css/style.css`.
  * **Internal CSS:** Embedded `<style>` in `<head>` showing cascading priority.
  * **Inline CSS:** `style="..."` on specific elements to demonstrate priority (Inline > Internal/External > Browser Default).
* **CSS Selectors Demonstrated:**
  1. **Universal Selector (`*`):** Resetting box-sizing, margins, and paddings.
  2. **Element Selector:** Styling `body`, `h1`, `h2`, `p`, `table`, `th`, `td`.
  3. **ID Selector (`#id`):** `#main-header`, `#site-title`, `#navbar`, `#emergency-table`, `#registration-form`.
  4. **Class Selector (`.class`):** `.container`, `.section-box`, `.badge`, `p.lead-text`, `p.alert-text`.
  5. **Grouping Selector:** `h1, h2, h3, h4, h5, h6 { ... }` and `th, td { ... }`.
  6. **Attribute Selector:** `input[type="text"]`, `a[target="_blank"]`, `input[type="submit"]`.
  7. **Pseudo-Class Selector (`:hover`):** Navigation link hover (`.nav-link:hover`), button hover, and table row hover (`tr:hover`).
  8. **Pseudo-Class Selector (`:first-child`):** `article p:first-child`.
  9. **Pseudo-Element (`::before`):** `.protocol-item::before` (inserts checkmarks) and `p.urgent-notice::before` (inserts warning badge).
* **Text & Font Properties:**
  * `color`, `background-color`, `text-align: center | left | justify`.
  * `text-transform: uppercase | capitalize`.
  * `text-decoration`: Wavy underline (`text-decoration-style: wavy; text-decoration-color: red;`), strikethrough (`line-through`).
  * Text Spacing: `letter-spacing`, `line-height`, `text-indent`.
  * `text-shadow: 2px 2px 5px #000000;` on the main header.
  * Font properties: `font-family` with serif/sans-serif fallbacks, `font-style: italic;`, `font-weight: 900;`, `font-variant: small-caps;`.
* **Containers & Layout:**
  * Block container `<div>` with padding, borders, and margins.
  * Inline container `<span>` with `.highlight` for keyword highlighting without breaking sentence flow.

---

## 🚀 How to Run & Present in VS Code
1. Open the project folder `HTML Project` in **Visual Studio Code**.
2. Right-click **`index.html`** and select **"Open with Live Server"** (or double click to open in Chrome/Safari).
3. Fill out the registration form and click **"Register Emergency Listing"** to navigate to `registered.html`.
4. Point to the comments in `index.html` and `css/style.css` to explain any Unit 1, 2, or 3 topic to the professor.
