# Tafsir Symposium 2026 - Web Application
**Department of Tafsīr and Quranic Studies • Ma'din Academy & SABCeR Research Council**

An international, responsive, multi-page web application engineered with the **"Verdant Precision"** design system for the **Tafsir Symposium 2026** (Wednesday, October 21, 2026).

---

## 🏛️ Application Architecture & File Structure

The project has been architected with clear separation of concerns between public symposium attendees and administrative staff:

### File Breakdown:
1. **[index.html](file:///c:/Users/ABDUL%20WAHID/OneDrive/Desktop/thafseer%20symposium/index.html)**: The dedicated public portal containing the Hero section, About the Symposium, Keynote Faculty dossiers, Interactive Schedule Timeline with `.ics` export, Media Gallery with Lightbox, and Delegate/Abstract registration modal.
2. **[admin.html](file:///c:/Users/ABDUL%20WAHID/OneDrive/Desktop/thafseer%20symposium/admin.html)**: The dedicated standalone administrative management portal featuring real-time overview metrics, the Schedule Manager CRUD form & table, drag-and-drop media uploader, and the interactive Registrations & Abstracts data table with CSV export.
3. **[app.js](file:///c:/Users/ABDUL%20WAHID/OneDrive/Desktop/thafseer%20symposium/app.js)**: Public client logic including SPA router, live countdown clock, schedule filtering, calendar exports, gallery filtering, lightbox controls, and RSVP submission handling.
4. **[admin.js](file:///c:/Users/ABDUL%20WAHID/OneDrive/Desktop/thafseer%20symposium/admin.js)**: Administrative dashboard logic controlling metric calculations, session publishing/deletions, file reading for photo uploads, and attendee paper approvals.
5. **[data.js](file:///c:/Users/ABDUL%20WAHID/OneDrive/Desktop/thafseer%20symposium/data.js)**: Shared initial data seed for schedules, faculty, gallery images, and registrations (shared between `index.html` and `admin.html` via `localStorage`).
6. **[styles.css](file:///c:/Users/ABDUL%20WAHID/OneDrive/Desktop/thafseer%20symposium/styles.css)**: Master "Verdant Precision" design system stylesheet.

---

### 2. Page 1: Public Page (Home, Theme & About)
- **Hero Section**:
  - Ambient floating Islamic geometric watermark using `element.png` with low opacity (8%) and continuous 360° rotation.
  - Centered high-definition title graphic (`title symposium.png`) paired with the subtitle: *"on Methodologies of Qur'anic Exegesis & the Hermeneutical Traditions of the Mufassirūn"*.
  - Live Countdown Timer targeting **October 21, 2026 09:00 AM** flanked by the official date emblem (`date.png`).
  - Action buttons: *"View Schedule"* (Deep Petrol `#0E5463`) and *"Submit Abstract / RSVP"* (Primary Emerald `#0D9E75`).
- **About the Symposium (Split Layout)**:
  - Left column: Department of Tafsīr and Quranic Studies mission, Sanad continuity, and peer-review publishing context.
  - Right column: Architectural card (`#F4F8F7`) with `element.png` corner motif, showcasing the 4 key focus tracks:
    1. *Usul al-Tafsir & Classical Methodologies*
    2. *Thematic Hermeneutics (Tafsir Mawdu'i)*
    3. *Quranic Bioethics & Modern Socio-Cultural Challenges*
    4. *Digital Tools & Computational Quranic Linguistics*
- **Distinguished Faculty & Keynote Speakers**:
  - 4-column grid of keynote scholars with interactive profile modals detailing academic biographies and plenary lecture topics.
  - Institutional partnership acknowledgement banner for **Ma'din Academy** and **SABCeR**.

---

### 3. Page 2: Schedule (Interactive Timeline)
- **Track Switcher Chips**: Interactive filter chips (`All Tracks`, `Classical Usul`, `Contemporary Hermeneutics`, `Valedictory`).
- **Vertical Emerald Timeline**: Continuous `#0D9E75` connecting line with glowing mint (`#1EE3A6`) node pips and pulse animations.
- **Dynamic Session Cards**:
  - Time badge, track badge, and venue hall tag.
  - Session title, presenters, and session chair details.
  - **"Add to Calendar"**: Dynamically generates and downloads an `.ics` iCalendar file for Google Calendar, Apple Calendar, or Outlook.
  - **"Abstract"**: Modal dialog displaying the peer-reviewed abstract, presentation scope, and PDF preview download trigger.

---

### 4. Page 3: Album (Interactive Media Gallery)
- **Category Filter Pills**: Filter photos by *All*, *Inauguration*, *Paper Presentations*, *Scholarly Panels*, *Posters & Exhibits*.
- **Balanced Media Grid**: Subtle hover lift (`translateY(-6px)`), image zoom (`scale(1.06)`), and emerald outline highlight (`outline: 1px solid #0D9E75`).
- **Full-Screen Lightbox**:
  - Modal with backdrop blur (`backdrop-filter: blur(8px); background: rgba(13, 30, 34, 0.5)`).
  - Next / Previous navigation buttons.
  - Full keyboard support: `ArrowRight` (Next), `ArrowLeft` (Previous), and `Escape` (Close).

---

### 5. Page 4: Admin Dashboard (Protected Management Area)
- **Quick Metrics Bar**:
  - *Total Submissions / RSVPs* (Live reactive counter)
  - *Approved Papers* (Live reactive counter)
  - *Gallery Photos Uploaded* (Live count)
  - *Session Status* (Live scheduled session count)
- **Content Management Tabs**:
  - **Tab A (Schedule Manager)**: Form to add new scientific sessions with start/end time, track, venue, chair, speaker, and abstract. Includes live status toggle (Publish/Unpublish) and session deletion.
  - **Tab B (Gallery / Album Upload)**: Drag-and-drop file upload zone, instant image preview thumbnail, category selection, and instant publication to the live Album.
  - **Tab C (Registrations & Abstracts)**: Data table with search filter by name, university, or paper title; quick actions to *Accept* or *Decline* submissions; applicant dossier viewer; and **"Export CSV Roster"** button to download the attendee spreadsheet.

---

### 6. Interactive Modals & Toast System
- **Registration & Call for Papers Dialog**:
  - Toggle between **Attendee RSVP** and **Call for Papers (Submit Abstract)**.
  - Form validation with automatic persistence into `localStorage` and instant administrative metric syncing.
- **Toast Notifications**: Floating notification toasts in the bottom right corner providing immediate user feedback for all actions.

---

## 🎨 Design System Tokens ("Verdant Precision")

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| **Surface Base** | `#FFFFFF` | Pristine white page and card background |
| **Surface Muted** | `#F4F8F7` | Soft sage tint for cards and secondary sections |
| **Surface Deep Petrol** | `#0E5463` | Dark cards, hero accents, footer, primary contrast |
| **Primary Emerald** | `#0D9E75` | CTA buttons, active chips, highlights, timeline lines |
| **Primary Hover / Active** | `#0B8260` | Button hover and pressed states |
| **Tertiary Mint Glow** | `#1EE3A6` | Glowing accents, badge borders, indicator pips |
| **Neutral Dark Typography**| `#0D1E22` | High contrast text complying with WCAG AA |
| **Subtle Divider / Border**| `#E1ECE9` | Clean hairline borders and separators |
| **Font Family** | `"Plus Jakarta Sans", sans-serif` | Clean geometric modern typography |

---

## 🚀 Running Locally

The application uses zero external build dependencies (vanilla HTML5, CSS3, and ES6+ JavaScript), and can be run immediately:

### Option A: Local Python Server (Currently Running)
```bash
python -m http.server 4173
```
Visit: [http://localhost:4173/](http://localhost:4173/)

### Option B: Node.js / npx serve
```bash
npx serve -l 4173 .
```

### Option C: Direct Browser Opening
Simply double-click `index.html` in file explorer.
