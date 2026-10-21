/**
 * Tafsir Symposium 2026 - Master Application Logic
 * Department of Tafsīr and Quranic Studies, Ma'din Academy & SABCeR
 */

// ==========================================
// 1. STATE MANAGEMENT & STORAGE INITIALIZATION
// ==========================================

const STORAGE_KEYS = {
  SCHEDULE: 'tafsir_schedule_2026',
  SESSIONS: 'tafsir_sessions_2026',
  GALLERY: 'tafsir_gallery_2026',
  REGISTRATIONS: 'tafsir_registrations_2026',
  SPEAKERS: 'tafsir_speakers_2026'
};

const AppState = {
  activeView: 'home',
  scheduleTrackFilter: 'All Tracks',
  galleryCategoryFilter: 'All',
  adminTab: 'schedule',
  currentLightboxIndex: 0,
  schedule: [],
  sessions: [],
  gallery: [],
  registrations: [],
  speakers: []
};

function initStorage() {
  const currentScheduleRaw = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
  if (!currentScheduleRaw || currentScheduleRaw === '[]') {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(INITIAL_SCHEDULE));
  }
  const currentSessionsRaw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  if (!currentSessionsRaw || currentSessionsRaw === '[]') {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(typeof INITIAL_SESSIONS !== 'undefined' ? INITIAL_SESSIONS : []));
  }
  const currentGalleryRaw = localStorage.getItem(STORAGE_KEYS.GALLERY);
  if (!currentGalleryRaw || currentGalleryRaw === '[]') {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
  }
  const currentRegRaw = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  if (!currentRegRaw || currentRegRaw === '[]') {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
  }
  const currentSpeakersRaw = localStorage.getItem(STORAGE_KEYS.SPEAKERS);
  if (!currentSpeakersRaw || currentSpeakersRaw === '[]') {
    localStorage.setItem(STORAGE_KEYS.SPEAKERS, JSON.stringify(INITIAL_SPEAKERS));
  }

  AppState.schedule = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCHEDULE)) || [];
  AppState.sessions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS)) || [];
  AppState.gallery = JSON.parse(localStorage.getItem(STORAGE_KEYS.GALLERY)) || [];
  AppState.registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) || [];

  const savedSpeakers = JSON.parse(localStorage.getItem(STORAGE_KEYS.SPEAKERS)) || [];
  AppState.speakers = (savedSpeakers && savedSpeakers.length > 0) ? savedSpeakers : INITIAL_SPEAKERS;
  try { localStorage.setItem(STORAGE_KEYS.SPEAKERS, JSON.stringify(AppState.speakers)); } catch (e) {}

  if (typeof FirebaseSync !== 'undefined' && FirebaseSync.isConnected) {
    Promise.all([
      FirebaseSync.seedInitialData('schedule', AppState.schedule),
      FirebaseSync.seedInitialData('sessions', AppState.sessions),
      FirebaseSync.seedInitialData('gallery', AppState.gallery),
      FirebaseSync.seedInitialData('registrations', AppState.registrations),
      FirebaseSync.seedInitialData('speakers', AppState.speakers)
    ]).then(() => {
      FirebaseSync.syncNode('schedule', (data) => {
        AppState.schedule = data || [];
        localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(AppState.schedule));
        renderSchedule();
      });
      FirebaseSync.syncNode('sessions', (data) => {
        AppState.sessions = data || [];
        localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(AppState.sessions));
      });
      FirebaseSync.syncNode('gallery', (data) => {
        AppState.gallery = data || [];
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(AppState.gallery));
        renderGallery();
      });
      FirebaseSync.syncNode('registrations', (data) => {
        AppState.registrations = data || [];
        localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(AppState.registrations));
      });
      FirebaseSync.syncNode('speakers', (data) => {
        AppState.speakers = (data && data.length > 0) ? data : INITIAL_SPEAKERS;
        try { localStorage.setItem(STORAGE_KEYS.SPEAKERS, JSON.stringify(AppState.speakers)); } catch (e) {}
        renderSpeakers();
      });
    }).catch(err => {
      console.warn("Firebase sync setup error:", err);
    });
  }
}

function saveState(key) {
  const trySetLocal = (storageKey, data) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (err) {
      console.warn(`LocalStorage quota limit warning for '${storageKey}':`, err);
    }
  };

  if (key === 'schedule') {
    trySetLocal(STORAGE_KEYS.SCHEDULE, AppState.schedule);
    if (typeof FirebaseSync !== 'undefined') FirebaseSync.saveData('schedule', AppState.schedule);
  } else if (key === 'sessions') {
    trySetLocal(STORAGE_KEYS.SESSIONS, AppState.sessions);
    if (typeof FirebaseSync !== 'undefined') FirebaseSync.saveData('sessions', AppState.sessions);
  } else if (key === 'gallery') {
    trySetLocal(STORAGE_KEYS.GALLERY, AppState.gallery);
    if (typeof FirebaseSync !== 'undefined') FirebaseSync.saveData('gallery', AppState.gallery);
  } else if (key === 'registrations') {
    trySetLocal(STORAGE_KEYS.REGISTRATIONS, AppState.registrations);
    if (typeof FirebaseSync !== 'undefined') FirebaseSync.saveData('registrations', AppState.registrations);
  } else if (key === 'speakers') {
    trySetLocal(STORAGE_KEYS.SPEAKERS, AppState.speakers);
    if (typeof FirebaseSync !== 'undefined') FirebaseSync.saveData('speakers', AppState.speakers);
  }
}

// ==========================================
// 2. CLIENT-SIDE ROUTER & VIEW SWITCHER
// ==========================================

function navigateTo(viewId) {
  if (viewId === 'admin') {
    window.location.href = 'admin.html';
    return;
  }

  const validViews = ['home', 'schedule', 'album', 'video'];
  if (!validViews.includes(viewId)) {
    viewId = 'home';
  }

  AppState.activeView = viewId;
  window.location.hash = viewId;

  // Update views
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active-view');
  });
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add('active-view');
  }

  // Update nav links
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('active');
    }
  });

  // Close mobile drawer if open
  closeMobileDrawer();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Refresh page specific contents
  if (viewId === 'schedule') {
    renderSchedule();
  } else if (viewId === 'album') {
    renderGallery();
  }
}

function navigateToSection(sectionId) {
  // If not on home view, switch to home view first
  if (AppState.activeView !== 'home') {
    AppState.activeView = 'home';
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active-view');
    });
    const targetView = document.getElementById('view-home');
    if (targetView) targetView.classList.add('active-view');
  }

  window.location.hash = sectionId;

  // Update nav links active class
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });

  closeMobileDrawer();

  setTimeout(() => {
    const targetSection = document.getElementById(`section-${sectionId}`) || document.getElementById(sectionId);
    if (targetSection) {
      const headerOffset = 80;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, 100);
}

function handleHashChange() {
  const hash = window.location.hash.replace('#', '') || 'home';
  if (['themes', 'scholars', 'brochure', 'terra-q'].includes(hash)) {
    navigateToSection(hash);
  } else {
    navigateTo(hash);
  }
}

// ==========================================
// 3. LIVE COUNTDOWN TIMER
// ==========================================

function initCountdown() {
  const dEl = document.getElementById('timer-days');
  if (!dEl) return;

  // Target: October 21, 2026 09:00:00 (From date.png)
  const targetDate = new Date('2026-10-21T09:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    let difference = targetDate - now;

    // In case target passed, show default symposium day
    if (difference < 0) {
      difference = 0;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const dEl = document.getElementById('timer-days');
    const hEl = document.getElementById('timer-hours');
    const mEl = document.getElementById('timer-minutes');
    const sEl = document.getElementById('timer-seconds');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ==========================================
// 4. PUBLIC SPEAKERS RENDERING
// ==========================================

function renderSpeakers() {
  const container = document.getElementById('speakers-container');
  if (!container) return;

  if (!AppState.speakers || AppState.speakers.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--surface-muted); border-radius: var(--radius-lg); border: 1px dashed var(--subtle-divider);">
        <p style="color: var(--neutral-dark-muted); font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Keynote Faculty Profiles Being Updated</p>
        <p style="color: var(--neutral-mid); font-size: 0.88rem;">Distinguished scholars and plenary speakers will be listed here shortly.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.speakers.map(speaker => `
    <div class="speaker-card">
      <div class="speaker-photo-wrap">
        <img src="${speaker.image}" alt="${speaker.name}" class="speaker-photo" loading="lazy" onerror="this.onerror=null; this.src='element.png';">
        <div class="speaker-badge-overlay">Keynote Faculty</div>
      </div>
      <div class="speaker-info">
        <h4>${speaker.name}</h4>
        <div class="speaker-role">${speaker.role}</div>
        <div class="speaker-affiliation">${speaker.affiliation}</div>
        <button class="speaker-action-btn" onclick="openSpeakerModal('${speaker.id}')">
          View Profile & Topic →
        </button>
      </div>
    </div>
  `).join('');
}

function openSpeakerModal(speakerId) {
  const speaker = AppState.speakers.find(s => s.id === speakerId);
  if (!speaker) return;

  const modal = document.getElementById('speaker-modal');
  const body = document.getElementById('speaker-modal-body');

  body.innerHTML = `
    <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap;">
      <img src="${speaker.image}" alt="${speaker.name}" onerror="this.onerror=null; this.src='element.png';" style="width: 120px; height: 120px; border-radius: var(--radius-md); object-fit: cover; border: 2px solid var(--primary-emerald); background: var(--surface-muted);">
      <div style="flex: 1;">
        <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--neutral-dark); margin-bottom: 0.25rem;">${speaker.name}</h3>
        <p style="font-size: 0.92rem; font-weight: 700; color: var(--primary-emerald); margin-bottom: 0.25rem;">${speaker.role}</p>
        <p style="font-size: 0.85rem; color: var(--neutral-mid);">${speaker.affiliation}</p>
      </div>
    </div>
    
    <div style="background: var(--surface-muted); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--subtle-divider); margin-bottom: 1.25rem;">
      <h5 style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; color: var(--surface-deep-petrol); margin-bottom: 0.35rem; letter-spacing: 0.04em;">Keynote Plenary Address</h5>
      <p style="font-size: 1rem; font-weight: 700; color: var(--neutral-dark); line-height: 1.4;">"${speaker.topic}"</p>
    </div>

    <div>
      <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--neutral-dark); margin-bottom: 0.5rem;">Academic Biography & Research Focus</h5>
      <p style="font-size: 0.92rem; color: var(--neutral-dark-muted); line-height: 1.6;">${speaker.bio}</p>
    </div>
  `;

  modal.classList.add('open');
}

// ==========================================
// 5. SCHEDULE (PAGE 2) LOGIC & TIMELINE
// ==========================================

function filterSchedule(track) {
  AppState.scheduleTrackFilter = track;

  // Update active chip
  document.querySelectorAll('.track-chip').forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('data-track') === track);
  });

  renderSchedule();
}

function renderSchedule() {
  const container = document.getElementById('timeline-items-container');
  if (!container) return;

  const filtered = AppState.schedule.filter(session => {
    if (session.status === 'unpublished') return false;
    if (AppState.scheduleTrackFilter === 'All Tracks') return true;
    return session.track.toLowerCase().trim() === AppState.scheduleTrackFilter.toLowerCase().trim();
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; background: var(--surface-muted); border-radius: var(--radius-lg); border: 1px dashed var(--subtle-divider);">
        <p style="color: var(--neutral-mid); font-size: 1rem; font-weight: 600;">No schedule sessions found for "${AppState.scheduleTrackFilter}".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(session => `
    <div class="timeline-item" data-session-id="${session.id}">
      <div class="timeline-node">
        <div class="timeline-node-inner"></div>
      </div>
      <div class="timeline-card">
        <div class="timeline-card-header">
          <div class="timeline-time-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${session.timeStart} – ${session.timeEnd}
          </div>
          <div class="timeline-tags">
            <span class="track-tag-badge">${session.track}</span>
            <span class="venue-tag-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${session.venue}
            </span>
          </div>
        </div>

        <h4>${session.title}</h4>
        <p class="timeline-card-description">${session.description}</p>

        <div class="timeline-card-footer">
          <div class="timeline-speakers-meta">
            <div class="speaker-line">
              <strong>Speakers/Presenter:</strong> ${session.speaker}
            </div>
            <div class="chair-line">
              <strong>Session Chair / Host:</strong> ${session.chair}
            </div>
          </div>
          <div class="timeline-actions-group">
            <button class="btn-pill-subtle" onclick="downloadSessionICS('${session.id}')" title="Add this session to your calendar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Add to Calendar
            </button>
            <button class="btn-pill-subtle" onclick="openSessionAbstractModal('${session.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              Abstract
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Download iCalendar (.ics) file
function downloadSessionICS(sessionId) {
  const session = AppState.schedule.find(s => s.id === sessionId);
  if (!session) return;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tafsir Symposium 2026//Ma\'din Academy//EN',
    'BEGIN:VEVENT',
    `SUMMARY:Tafsir Symposium 2026: ${session.title}`,
    `DESCRIPTION:${session.description}\\n\\nSpeaker: ${session.speaker}\\nChair: ${session.chair}`,
    `LOCATION:${session.venue}, Ma'din Academy Complex, Malappuram, Kerala`,
    'DTSTART:20261021T090000Z',
    'DTEND:20261021T180000Z',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `TafsirSymposium_${session.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Calendar Event Created', `"${session.title.substring(0, 35)}..." saved to your calendar.`);
}

function openSessionAbstractModal(sessionId) {
  const session = AppState.schedule.find(s => s.id === sessionId);
  if (!session) return;

  const modal = document.getElementById('abstract-modal');
  const title = document.getElementById('abstract-modal-title');
  const body = document.getElementById('abstract-modal-body');

  title.textContent = session.title;
  body.innerHTML = `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
      <span class="track-tag-badge">${session.track}</span>
      <span class="venue-tag-badge">${session.venue}</span>
      <span class="venue-tag-badge">${session.timeStart} – ${session.timeEnd}</span>
    </div>

    <div style="background: var(--surface-muted); padding: 1rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--subtle-divider); margin-bottom: 1.5rem;">
      <p style="font-size: 0.88rem; font-weight: 700; color: var(--surface-deep-petrol); margin-bottom: 0.25rem;">Presenting Scholars & Faculty:</p>
      <p style="font-size: 0.95rem; font-weight: 600; color: var(--neutral-dark);">${session.speaker}</p>
      <p style="font-size: 0.82rem; color: var(--neutral-mid); margin-top: 0.25rem;">Session Chair: ${session.chair}</p>
    </div>

    <h5 style="font-size: 0.95rem; font-weight: 800; color: var(--neutral-dark); margin-bottom: 0.65rem;">Academic Session Abstract</h5>
    <p style="font-size: 0.95rem; line-height: 1.7; color: var(--neutral-dark-muted); margin-bottom: 1.5rem;">
      ${session.abstract || session.description}
    </p>

    <div style="padding: 1rem; border-radius: var(--radius-md); background: #F8FCFA; border: 1px solid rgba(13, 158, 117, 0.2); display: flex; align-items: center; justify-content: space-between;">
      <div>
        <p style="font-size: 0.85rem; font-weight: 700; color: var(--primary-emerald);">Official Research Proceedings Volume I</p>
        <p style="font-size: 0.78rem; color: var(--neutral-mid);">Peer-Reviewed by SABCeR Editorial Council</p>
      </div>
      <button class="btn-pill-subtle" onclick="showToast('Abstract PDF', 'Full peer-reviewed PDF will be released during the opening plenary.')">
        Download PDF (Preview)
      </button>
    </div>
  `;

  modal.classList.add('open');
}

// ==========================================
// 6. ALBUM (PAGE 3) LOGIC & LIGHTBOX
// ==========================================

function filterGallery(category) {
  AppState.galleryCategoryFilter = category;

  document.querySelectorAll('.album-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-category') === category);
  });

  renderGallery();
}

function renderGallery() {
  const container = document.getElementById('album-grid-container');
  const countBadge = document.getElementById('album-count-badge');
  if (!container) return;

  const filtered = AppState.gallery.filter(item => {
    if (AppState.galleryCategoryFilter === 'All') return true;
    return item.category.toLowerCase().trim() === AppState.galleryCategoryFilter.toLowerCase().trim();
  });

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${AppState.gallery.length} Photos`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--surface-muted); border-radius: var(--radius-lg); border: 1px dashed var(--subtle-divider);">
        <p style="color: var(--neutral-mid); font-size: 1rem; font-weight: 600;">No album media found under "${AppState.galleryCategoryFilter}".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item, index) => {
    const globalIndex = AppState.gallery.findIndex(g => g.id === item.id);
    return `
      <div class="album-card" onclick="openLightbox(${globalIndex})">
        <div class="album-img-wrap">
          <img src="${item.image}" alt="${item.title}" class="album-img" loading="lazy">
          <div class="album-overlay-badge">${item.category}</div>
          <div class="album-zoom-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        </div>
        <div class="album-caption-wrap">
          <h4 class="album-caption-title">${item.title}</h4>
          <p class="album-caption-desc">${item.description || ''}</p>
          <div class="album-meta-row">
            <span>${item.timestamp}</span>
            <span style="color: var(--primary-emerald); font-weight: 700;">Click to Expand ↗</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

let isBrochureLightbox = false;

function openLightbox(index) {
  if (index < 0 || index >= AppState.gallery.length) return;
  isBrochureLightbox = false;
  AppState.currentLightboxIndex = index;

  const item = AppState.gallery[index];
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const category = document.getElementById('lightbox-category');
  const desc = document.getElementById('lightbox-desc');
  const counter = document.getElementById('lightbox-counter');

  img.src = item.image;
  img.alt = item.title;
  title.textContent = item.title;
  category.textContent = item.category;
  desc.textContent = item.description || '';
  counter.textContent = `${index + 1} / ${AppState.gallery.length}`;

  modal.classList.add('open');
}

function navigateLightbox(step) {
  if (isBrochureLightbox) {
    let nextNum = brochureCurrentPage + step;
    if (nextNum < 1) nextNum = brochureTotalPages;
    if (nextNum > brochureTotalPages) nextNum = 1;
    renderBrochurePage(nextNum);
    openBrochureFullScreen();
    return;
  }
  let nextIndex = AppState.currentLightboxIndex + step;
  if (nextIndex < 0) nextIndex = AppState.gallery.length - 1;
  if (nextIndex >= AppState.gallery.length) nextIndex = 0;
  openLightbox(nextIndex);
}

// ==========================================
// 7. SYMPOSIUM REGISTRATION MODAL
// ==========================================

function populateSessionSelectOptions(selectEl) {
  if (!selectEl) return;

  const activeSessions = AppState.sessions.filter(s => s.status !== 'unpublished');

  if (activeSessions.length === 0) {
    selectEl.innerHTML = '<option value="">No registration sessions available</option>';
    return;
  }

  selectEl.innerHTML = '<option value="" disabled selected>-- Select a Registration Session --</option>' + activeSessions.map(session => {
    const filledSeats = AppState.registrations.filter(r => r.sessionId === session.id).length;
    const limit = parseInt(session.participantLimit) || 100;
    const isFull = filledSeats >= limit;
    const ledByText = session.ledBy ? ` [Led by ${session.ledBy}]` : '';
    const label = `${session.title}${ledByText} (${session.timeSlot || 'Scheduled'}) - ${filledSeats}/${limit} Seats ${isFull ? '[FULL]' : ''}`;
    return `<option value="${session.id}" ${isFull ? 'disabled' : ''}>${label}</option>`;
  }).join('');
}

function openRegistrationModal() {
  const modal = document.getElementById('registration-modal');
  if (!modal) return;

  const selectEl = document.getElementById('reg-session-select');
  populateSessionSelectOptions(selectEl);

  modal.classList.add('open');
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const fullName = form.fullName.value.trim();
  const phone = form.phone.value.trim();
  const shuhba = form.shuhba.value.trim();
  const shuhbaNumber = form.shuhbaNumber.value.trim();
  const reasonToJoin = form.reasonToJoin.value.trim();
  const sessionId = form.sessionId.value;

  const selectedSession = AppState.sessions.find(s => s.id === sessionId);
  if (!selectedSession) {
    showToast('Selection Required', 'Please select a valid registration session.');
    return;
  }

  const filledSeats = AppState.registrations.filter(r => r.sessionId === sessionId).length;
  const limit = parseInt(selectedSession.participantLimit) || 100;
  if (filledSeats >= limit) {
    showToast('Session Full', 'This session has reached its maximum participant limit.');
    return;
  }

  const newReg = {
    id: `reg-${Date.now()}`,
    fullName,
    phone,
    shuhba,
    shuhbaNumber,
    reasonToJoin,
    sessionId: selectedSession.id,
    sessionTitle: selectedSession.title,
    status: 'Confirmed',
    date: new Date().toISOString().slice(0, 10)
  };

  AppState.registrations.unshift(newReg);
  saveState('registrations');

  closeModal('registration-modal');
  form.reset();

  showToast('Registration Confirmed!', `Welcome, ${fullName}. Registered for "${selectedSession.title}".`);
}

// ==========================================
// 9. GENERAL MODAL & DRAWER HELPERS
// ==========================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
  }
  if (modalId === 'lightbox-modal') {
    isBrochureLightbox = false;
  }
}

function openTerraQModal() {
  const modal = document.getElementById('terraq-modal');
  const iframe = document.getElementById('terraq-iframe');
  const loader = document.getElementById('terraq-iframe-loader');
  
  if (modal && iframe) {
    if (!iframe.src || iframe.src === 'about:blank' || !iframe.src.includes('terra-q')) {
      if (loader) loader.style.display = 'flex';
      iframe.onload = () => {
        if (loader) loader.style.display = 'none';
      };
      iframe.src = 'https://terra-q-inky.vercel.app/';
    }
    modal.classList.add('open');
  }
}

function closeTerraQModal() {
  closeModal('terraq-modal');
}

function toggleMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  if (drawer) {
    const isOpen = drawer.classList.toggle('open');
    if (backdrop) {
      if (isOpen) backdrop.classList.add('open');
      else backdrop.classList.remove('open');
    }
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  if (drawer) {
    drawer.classList.remove('open');
  }
  if (backdrop) {
    backdrop.classList.remove('open');
  }
}

// ==========================================
// 10. TOAST SYSTEM
// ==========================================

function showToast(title, message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}

// ==========================================
// 11. KEYBOARD & EVENT BINDINGS
// ==========================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
      modal.classList.remove('open');
    });
  }

  // Lightbox keyboard arrows
  const lightboxModal = document.getElementById('lightbox-modal');
  if (lightboxModal && lightboxModal.classList.contains('open')) {
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
  }
});

// Close modals when clicking backdrop
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

// ==========================================
// INTERACTIVE BROCHURE VIEWER
// ==========================================

let brochureCurrentPage = 1;
const brochureTotalPages = 12;

function initBrochureViewer() {
  renderBrochurePage(brochureCurrentPage);

  // Touch Swipe Navigation Support
  const imgWrap = document.querySelector('.brochure-image-wrap');
  if (imgWrap) {
    let touchStartX = 0;
    let touchEndX = 0;

    imgWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    imgWrap.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (diff > 40) {
        nextBrochurePage(); // Swipe Left -> Next Page
      } else if (diff < -40) {
        prevBrochurePage(); // Swipe Right -> Prev Page
      }
    }, { passive: true });
  }
}

function renderBrochurePage(num) {
  if (num < 1) num = 1;
  if (num > brochureTotalPages) num = brochureTotalPages;
  brochureCurrentPage = num;

  const imgEl = document.getElementById('brochure-page-img');
  if (imgEl) {
    imgEl.src = `assets/images/brochure/page_${num}.jpg`;
    imgEl.alt = `Symposium Brochure Page ${num} of ${brochureTotalPages}`;
  }

  const indicator = document.getElementById('brochure-page-indicator');
  if (indicator) {
    indicator.textContent = `Page ${num} of ${brochureTotalPages}`;
  }

  const prevBtn = document.getElementById('btn-brochure-prev');
  const nextBtn = document.getElementById('btn-brochure-next');
  if (prevBtn) prevBtn.disabled = (num <= 1);
  if (nextBtn) nextBtn.disabled = (num >= brochureTotalPages);

  // Preload adjacent pages for instantaneous flipping
  if (num < brochureTotalPages) {
    const nextImg = new Image();
    nextImg.src = `assets/images/brochure/page_${num + 1}.jpg`;
  }
  if (num > 1) {
    const prevImg = new Image();
    prevImg.src = `assets/images/brochure/page_${num - 1}.jpg`;
  }
}

function prevBrochurePage() {
  if (brochureCurrentPage <= 1) return;
  renderBrochurePage(brochureCurrentPage - 1);
}

function nextBrochurePage() {
  if (brochureCurrentPage >= brochureTotalPages) return;
  renderBrochurePage(brochureCurrentPage + 1);
}

function openBrochureFullScreen() {
  isBrochureLightbox = true;
  openModal('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');
  const category = document.getElementById('lightbox-category');
  const counter = document.getElementById('lightbox-counter');

  if (img) {
    img.src = `assets/images/brochure/page_${brochureCurrentPage}.jpg`;
    img.alt = `Official Symposium Brochure Page ${brochureCurrentPage} of ${brochureTotalPages}`;
  }
  if (title) title.textContent = `Official Symposium Brochure`;
  if (desc) desc.textContent = `Page ${brochureCurrentPage} of ${brochureTotalPages} • Use arrows to flip pages or tap Close Lightbox.`;
  if (category) category.textContent = "Brochure Publication";
  if (counter) counter.textContent = `${brochureCurrentPage} / ${brochureTotalPages}`;
}

// ==========================================
// 12. INITIALIZATION ON DOM READY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initCountdown();
  renderSpeakers();
  renderSchedule();
  renderGallery();
  initBrochureViewer();

  // Listen to hash changes
  window.addEventListener('hashchange', handleHashChange);

  // Initial routing
  const initialHash = window.location.hash.replace('#', '') || 'home';
  navigateTo(initialHash);
});

// Cross-tab synchronization with admin console
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEYS.SPEAKERS) {
    AppState.speakers = JSON.parse(e.newValue || '[]');
    renderSpeakers();
  } else if (e.key === STORAGE_KEYS.SCHEDULE) {
    AppState.schedule = JSON.parse(e.newValue || '[]');
    renderSchedule();
  } else if (e.key === STORAGE_KEYS.GALLERY) {
    AppState.gallery = JSON.parse(e.newValue || '[]');
    renderGallery();
  }
});
