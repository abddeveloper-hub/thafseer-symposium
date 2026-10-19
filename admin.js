/**
 * Tafsir Symposium 2026 - Admin Portal Logic
 * Department of Quranic Exegesis, Ma'din Academy & SABCeR
 */

const STORAGE_KEYS = {
  SCHEDULE: 'tafsir_schedule_2026',
  GALLERY: 'tafsir_gallery_2026',
  REGISTRATIONS: 'tafsir_registrations_2026',
  SPEAKERS: 'tafsir_speakers_2026'
};

const AdminState = {
  activeTab: 'schedule',
  schedule: [],
  gallery: [],
  registrations: [],
  speakers: []
};

function initAdminStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.SCHEDULE)) {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(INITIAL_SCHEDULE));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SPEAKERS)) {
    localStorage.setItem(STORAGE_KEYS.SPEAKERS, JSON.stringify(INITIAL_SPEAKERS));
  }

  AdminState.schedule = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCHEDULE));
  AdminState.gallery = JSON.parse(localStorage.getItem(STORAGE_KEYS.GALLERY));
  AdminState.registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS));
  AdminState.speakers = JSON.parse(localStorage.getItem(STORAGE_KEYS.SPEAKERS));
}

function saveAdminState(key) {
  if (key === 'schedule') {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(AdminState.schedule));
  } else if (key === 'gallery') {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(AdminState.gallery));
  } else if (key === 'registrations') {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(AdminState.registrations));
  } else if (key === 'speakers') {
    localStorage.setItem(STORAGE_KEYS.SPEAKERS, JSON.stringify(AdminState.speakers));
  }
}

// ==========================================
// METRICS & TABS
// ==========================================

function switchAdminTab(tabId) {
  AdminState.activeTab = tabId;

  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-admin-tab') === tabId);
  });

  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(`admin-tab-${tabId}`);
  if (targetPane) {
    targetPane.classList.add('active');
  }
}

function renderAdminMetrics() {
  const totalSubmissions = AdminState.registrations.length;
  const approvedPapers = AdminState.registrations.filter(r => r.status === 'Accepted').length;
  const speakersCount = AdminState.speakers.length;
  const galleryCount = AdminState.gallery.length;
  const publishedSessions = AdminState.schedule.filter(s => s.status !== 'unpublished').length;

  const totalEl = document.getElementById('metric-total-submissions');
  const approvedEl = document.getElementById('metric-approved-papers');
  const speakersEl = document.getElementById('metric-speakers-count');
  const galleryEl = document.getElementById('metric-gallery-count');
  const sessionEl = document.getElementById('metric-session-status');

  if (totalEl) totalEl.textContent = totalSubmissions;
  if (approvedEl) approvedEl.textContent = approvedPapers;
  if (speakersEl) speakersEl.textContent = `${speakersCount} Scholars`;
  if (galleryEl) galleryEl.textContent = galleryCount;
  if (sessionEl) sessionEl.textContent = `${publishedSessions} Live`;
}

// ==========================================
// TAB A: SCHEDULE MANAGER
// ==========================================

function renderAdminScheduleTable() {
  const tbody = document.getElementById('admin-schedule-tbody');
  if (!tbody) return;

  tbody.innerHTML = AdminState.schedule.map(session => `
    <tr>
      <td style="font-weight: 700; color: var(--surface-deep-petrol);">${session.timeStart} – ${session.timeEnd}</td>
      <td style="max-width: 240px; font-weight: 700;">${session.title}</td>
      <td><span class="track-tag-badge">${session.track}</span></td>
      <td>${session.speaker}</td>
      <td>
        <span class="status-chip ${session.status === 'unpublished' ? 'declined' : 'accepted'}">
          ${session.status === 'unpublished' ? 'Draft / Hidden' : 'Published'}
        </span>
      </td>
      <td>
        <div class="action-btn-group">
          <button class="btn-table-action edit" onclick="openEditSessionModal('${session.id}')" title="Edit Session Details">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 2px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit
          </button>
          <button class="btn-table-action" onclick="togglePublishSession('${session.id}')">
            ${session.status === 'unpublished' ? 'Publish' : 'Unpublish'}
          </button>
          <button class="btn-table-action decline" onclick="deleteSession('${session.id}')" title="Delete">
            Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function handleAddSessionForm(e) {
  e.preventDefault();
  const form = e.target;
  const newSession = {
    id: `session-${Date.now()}`,
    timeStart: form.timeStart.value.trim(),
    timeEnd: form.timeEnd.value.trim(),
    title: form.title.value.trim(),
    speaker: form.speaker.value.trim(),
    chair: form.chair.value.trim() || "Symposium Academic Board",
    track: form.track.value,
    venue: form.venue.value.trim() || "Auditorium Complex",
    description: form.description.value.trim(),
    abstract: form.abstract.value.trim() || form.description.value.trim(),
    status: 'published'
  };

  AdminState.schedule.push(newSession);
  saveAdminState('schedule');
  renderAdminScheduleTable();
  renderAdminMetrics();
  form.reset();
  showToast('Session Added', `"${newSession.title}" added and live on the public schedule.`);
}

function togglePublishSession(sessionId) {
  const session = AdminState.schedule.find(s => s.id === sessionId);
  if (!session) return;

  session.status = session.status === 'unpublished' ? 'published' : 'unpublished';
  saveAdminState('schedule');
  renderAdminScheduleTable();
  renderAdminMetrics();
  showToast('Schedule Updated', `Session status changed to ${session.status}.`);
}

function deleteSession(sessionId) {
  if (!confirm('Are you sure you want to delete this session?')) return;
  AdminState.schedule = AdminState.schedule.filter(s => s.id !== sessionId);
  saveAdminState('schedule');
  renderAdminScheduleTable();
  renderAdminMetrics();
  showToast('Session Removed', 'Session deleted from schedule.');
}

function openEditSessionModal(sessionId) {
  const session = AdminState.schedule.find(s => s.id === sessionId);
  if (!session) return;

  document.getElementById('edit-session-id').value = session.id;
  document.getElementById('edit-session-timeStart').value = session.timeStart;
  document.getElementById('edit-session-timeEnd').value = session.timeEnd;
  document.getElementById('edit-session-track').value = session.track;
  document.getElementById('edit-session-title').value = session.title;
  document.getElementById('edit-session-venue').value = session.venue;
  document.getElementById('edit-session-speaker').value = session.speaker;
  document.getElementById('edit-session-chair').value = session.chair || '';
  document.getElementById('edit-session-description').value = session.description;
  document.getElementById('edit-session-abstract').value = session.abstract || session.description;

  const modal = document.getElementById('session-edit-modal');
  if (modal) modal.classList.add('open');
}

function handleUpdateSession(e) {
  e.preventDefault();
  const form = e.target;
  const id = form.id.value;
  const session = AdminState.schedule.find(s => s.id === id);
  if (!session) return;

  session.timeStart = form.timeStart.value.trim();
  session.timeEnd = form.timeEnd.value.trim();
  session.track = form.track.value;
  session.title = form.title.value.trim();
  session.venue = form.venue.value.trim();
  session.speaker = form.speaker.value.trim();
  session.chair = form.chair.value.trim();
  session.description = form.description.value.trim();
  session.abstract = form.abstract.value.trim() || session.description;

  saveAdminState('schedule');
  renderAdminScheduleTable();
  renderAdminMetrics();
  closeModal('session-edit-modal');
  showToast('Session Updated', `"${session.title}" updated successfully.`);
}

// ==========================================
// TAB: FACULTY & SPEAKERS MANAGER
// ==========================================

let pendingNewSpeakerImage = '';
let pendingEditSpeakerImage = '';

function renderAdminSpeakersTable() {
  const tbody = document.getElementById('admin-speakers-tbody');
  if (!tbody) return;

  if (AdminState.speakers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 2rem; color: var(--neutral-mid);">
          No faculty scholars registered yet. Use the form above to add a scholar.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = AdminState.speakers.map(speaker => `
    <tr>
      <td>
        <img src="${speaker.image}" alt="${speaker.name}" class="speaker-admin-avatar" onerror="this.onerror=null; this.src='element.png';">
      </td>
      <td>
        <div style="font-weight: 800; color: var(--neutral-dark); font-size: 0.95rem;">${speaker.name}</div>
        <div style="font-size: 0.8rem; font-weight: 600; color: var(--primary-emerald);">${speaker.role}</div>
      </td>
      <td style="font-size: 0.85rem; color: var(--neutral-dark-muted); max-width: 200px;">
        ${speaker.affiliation}
      </td>
      <td style="font-size: 0.85rem; max-width: 250px; font-weight: 500;">
        <em>"${speaker.topic}"</em>
      </td>
      <td>
        <div class="action-btn-group">
          <button class="btn-table-action edit" onclick="openEditSpeakerModal('${speaker.id}')" title="Edit Scholar Dossier">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 2px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit
          </button>
          <button class="btn-table-action decline" onclick="deleteSpeaker('${speaker.id}')" title="Remove Scholar">
            Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function handleAddSpeaker(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const role = form.role.value.trim();
  const affiliation = form.affiliation.value.trim();
  const topic = form.topic.value.trim();
  const bio = form.bio.value.trim();
  const urlFallback = form.imageUrl.value.trim();

  const finalImage = pendingNewSpeakerImage || urlFallback || 'element.png';

  const newSpeaker = {
    id: `spk-${Date.now()}`,
    name: name,
    role: role,
    affiliation: affiliation,
    topic: topic,
    bio: bio,
    image: finalImage
  };

  AdminState.speakers.push(newSpeaker);
  saveAdminState('speakers');
  renderAdminSpeakersTable();
  renderAdminMetrics();

  form.reset();
  pendingNewSpeakerImage = '';
  const previewBox = document.getElementById('speaker-new-preview-box');
  if (previewBox) previewBox.style.display = 'none';

  showToast('Scholar Profile Published', `"${newSpeaker.name}" added to the faculty plenary.`);
}

function clearNewSpeakerPhoto() {
  pendingNewSpeakerImage = '';
  const fileInput = document.getElementById('speaker-new-file-input');
  if (fileInput) fileInput.value = '';
  const previewBox = document.getElementById('speaker-new-preview-box');
  if (previewBox) previewBox.style.display = 'none';
}

function openEditSpeakerModal(speakerId) {
  const speaker = AdminState.speakers.find(s => s.id === speakerId);
  if (!speaker) return;

  pendingEditSpeakerImage = '';
  document.getElementById('edit-speaker-id').value = speaker.id;
  document.getElementById('edit-speaker-name').value = speaker.name;
  document.getElementById('edit-speaker-role').value = speaker.role;
  document.getElementById('edit-speaker-affiliation').value = speaker.affiliation;
  document.getElementById('edit-speaker-topic').value = speaker.topic;
  document.getElementById('edit-speaker-bio').value = speaker.bio;
  document.getElementById('edit-speaker-image-url').value = speaker.image || '';

  const previewImg = document.getElementById('edit-speaker-preview-img');
  if (previewImg) {
    previewImg.src = speaker.image || 'element.png';
  }

  const modal = document.getElementById('speaker-edit-modal');
  if (modal) modal.classList.add('open');
}

function handleUpdateSpeaker(e) {
  e.preventDefault();
  const form = e.target;
  const id = form.id.value;
  const speaker = AdminState.speakers.find(s => s.id === id);
  if (!speaker) return;

  const urlInput = form.image.value.trim();
  const finalImage = pendingEditSpeakerImage || urlInput || speaker.image || 'element.png';

  speaker.name = form.name.value.trim();
  speaker.role = form.role.value.trim();
  speaker.affiliation = form.affiliation.value.trim();
  speaker.topic = form.topic.value.trim();
  speaker.bio = form.bio.value.trim();
  speaker.image = finalImage;

  saveAdminState('speakers');
  renderAdminSpeakersTable();
  renderAdminMetrics();
  closeModal('speaker-edit-modal');
  pendingEditSpeakerImage = '';
  showToast('Faculty Dossier Updated', `Profile details for "${speaker.name}" saved successfully.`);
}

function deleteSpeaker(speakerId) {
  const speaker = AdminState.speakers.find(s => s.id === speakerId);
  const name = speaker ? speaker.name : 'this scholar';
  if (!confirm(`Are you sure you want to remove ${name} from the keynote faculty?`)) return;

  AdminState.speakers = AdminState.speakers.filter(s => s.id !== speakerId);
  saveAdminState('speakers');
  renderAdminSpeakersTable();
  renderAdminMetrics();
  showToast('Scholar Profile Removed', 'Scholar profile removed from faculty plenary.');
}

function setupSpeakerDropzone() {
  // New Speaker Dropzone
  const dropzone = document.getElementById('speaker-new-dropzone');
  const fileInput = document.getElementById('speaker-new-file-input');
  const previewBox = document.getElementById('speaker-new-preview-box');
  const previewImg = document.getElementById('speaker-new-preview-img');
  const urlInput = document.getElementById('speaker-new-url-input');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processNewSpeakerFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        processNewSpeakerFile(e.target.files[0]);
      }
    });
  }

  function processNewSpeakerFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, or WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      pendingNewSpeakerImage = event.target.result;
      if (previewBox && previewImg) {
        previewImg.src = pendingNewSpeakerImage;
        previewBox.style.display = 'flex';
      }
    };
    reader.readAsDataURL(file);
  }

  // Edit Speaker File Input
  const editFileInput = document.getElementById('edit-speaker-file-input');
  const editPreviewImg = document.getElementById('edit-speaker-preview-img');
  const editUrlInput = document.getElementById('edit-speaker-image-url');

  if (editFileInput) {
    editFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          pendingEditSpeakerImage = event.target.result;
          if (editPreviewImg) editPreviewImg.src = pendingEditSpeakerImage;
          if (editUrlInput) editUrlInput.value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (editUrlInput) {
    editUrlInput.addEventListener('input', () => {
      if (editUrlInput.value.trim() && editPreviewImg) {
        editPreviewImg.src = editUrlInput.value.trim();
        pendingEditSpeakerImage = '';
      }
    });
  }

  if (urlInput) {
    urlInput.addEventListener('input', () => {
      if (urlInput.value.trim()) {
        pendingNewSpeakerImage = '';
        if (previewBox && previewImg) {
          previewImg.src = urlInput.value.trim();
          previewBox.style.display = 'flex';
        }
      }
    });
  }
}

// ==========================================
// TAB B: GALLERY / ALBUM UPLOAD
// ==========================================

let pendingGalleryImage = '';

function setupDropzone() {
  const dropzone = document.getElementById('gallery-dropzone');
  const fileInput = document.getElementById('gallery-file-input');
  const previewBox = document.getElementById('gallery-preview-box');
  const previewImg = document.getElementById('gallery-preview-img');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  });

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      pendingGalleryImage = event.target.result;
      if (previewBox && previewImg) {
        previewImg.src = pendingGalleryImage;
        previewBox.style.display = 'flex';
      }
    };
    reader.readAsDataURL(file);
  }
}

function handleAddGalleryItem(e) {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value.trim();
  const category = form.category.value;
  const description = form.description.value.trim();
  const urlFallback = form.imageUrl.value.trim();

  const finalImage = pendingGalleryImage || urlFallback || 'assets/images/gallery-1.jpg';

  const newItem = {
    id: `gal-${Date.now()}`,
    title: title,
    category: category,
    image: finalImage,
    timestamp: "Oct 21, 2026 • Live Update",
    description: description
  };

  AdminState.gallery.unshift(newItem);
  saveAdminState('gallery');
  renderAdminMetrics();

  form.reset();
  pendingGalleryImage = '';
  const previewBox = document.getElementById('gallery-preview-box');
  if (previewBox) previewBox.style.display = 'none';

  showToast('Photo Published', `"${newItem.title}" added to the public album.`);
}

// ==========================================
// TAB C: REGISTRATIONS & ABSTRACTS
// ==========================================

function renderAdminRegistrationsTable() {
  const tbody = document.getElementById('admin-registrations-tbody');
  const searchInput = document.getElementById('admin-reg-search');
  if (!tbody) return;

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const filtered = AdminState.registrations.filter(r => {
    if (!query) return true;
    return (
      r.fullName.toLowerCase().includes(query) ||
      r.institution.toLowerCase().includes(query) ||
      r.paperTitle.toLowerCase().includes(query) ||
      r.track.toLowerCase().includes(query)
    );
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2rem; color: var(--neutral-mid);">
          No matching registrations found.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    const statusClass = r.status === 'Accepted' ? 'accepted' : r.status === 'Declined' ? 'declined' : 'under-review';
    return `
      <tr>
        <td>
          <div style="font-weight: 700; color: var(--neutral-dark);">${r.fullName}</div>
          <div style="font-size: 0.78rem; color: var(--neutral-mid);">${r.email}</div>
        </td>
        <td style="max-width: 180px;">${r.institution}</td>
        <td>
          <div style="font-weight: 600; color: var(--surface-deep-petrol);">${r.regType}</div>
          <div style="font-size: 0.75rem; color: var(--primary-emerald);">${r.track}</div>
        </td>
        <td style="max-width: 220px; font-size: 0.82rem;">
          ${r.paperTitle}
        </td>
        <td><span class="status-chip ${statusClass}">${r.status}</span></td>
        <td style="font-size: 0.8rem; color: var(--neutral-mid);">${r.date}</td>
        <td>
          <div class="action-btn-group">
            <button class="btn-table-action accept" onclick="updateRegistrationStatus('${r.id}', 'Accepted')" title="Accept">✓</button>
            <button class="btn-table-action decline" onclick="updateRegistrationStatus('${r.id}', 'Declined')" title="Decline">✕</button>
            <button class="btn-table-action" onclick="viewRegistrationModal('${r.id}')" title="Details">Info</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function updateRegistrationStatus(regId, newStatus) {
  const reg = AdminState.registrations.find(r => r.id === regId);
  if (!reg) return;

  reg.status = newStatus;
  saveAdminState('registrations');
  renderAdminRegistrationsTable();
  renderAdminMetrics();
  showToast('Status Updated', `${reg.fullName}'s registration is now marked as "${newStatus}".`);
}

function viewRegistrationModal(regId) {
  const reg = AdminState.registrations.find(r => r.id === regId);
  if (!reg) return;

  const modal = document.getElementById('registration-detail-modal');
  const body = document.getElementById('registration-detail-modal-body');

  body.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
      <div>
        <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--neutral-dark);">${reg.fullName}</h4>
        <p style="color: var(--primary-emerald); font-weight: 600; font-size: 0.9rem;">${reg.regType} • ${reg.institution}</p>
        <p style="color: var(--neutral-mid); font-size: 0.85rem;">Email: ${reg.email} | Phone: ${reg.phone || 'N/A'}</p>
      </div>
      <span class="status-chip ${reg.status === 'Accepted' ? 'accepted' : reg.status === 'Declined' ? 'declined' : 'under-review'}">${reg.status}</span>
    </div>

    <div style="background: var(--surface-muted); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--subtle-divider); margin-bottom: 1.25rem;">
      <h5 style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; color: var(--surface-deep-petrol); margin-bottom: 0.35rem;">Track of Interest</h5>
      <p style="font-size: 1.05rem; font-weight: 700; color: var(--neutral-dark);">${reg.track}</p>
      <div style="margin-top: 0.5rem;">
        <span class="track-tag-badge">Category: ${reg.regType}</span>
      </div>
    </div>

    <h5 style="font-size: 0.88rem; font-weight: 700; color: var(--neutral-dark); margin-bottom: 0.4rem;">Notes / Remarks</h5>
    <p style="font-size: 0.92rem; color: var(--neutral-dark-muted); line-height: 1.6; margin-bottom: 1.5rem;">
      ${reg.abstract || 'General symposium registration.'}
    </p>

    <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
      <button class="btn-pill-subtle" onclick="updateRegistrationStatus('${reg.id}', 'Confirmed'); closeModal('registration-detail-modal');">
        Confirm Registration
      </button>
      <button class="btn-pill-subtle" onclick="updateRegistrationStatus('${reg.id}', 'Declined'); closeModal('registration-detail-modal');">
        Decline Registration
      </button>
    </div>
  `;

  modal.classList.add('open');
}

function exportRegistrationsCSV() {
  const headers = ['ID', 'Full Name', 'Email', 'Institution', 'Phone', 'Type', 'Track', 'Paper Title', 'Status', 'Date'];
  const rows = AdminState.registrations.map(r => [
    `"${r.id}"`,
    `"${r.fullName.replace(/"/g, '""')}"`,
    `"${r.email}"`,
    `"${r.institution.replace(/"/g, '""')}"`,
    `"${r.phone || ''}"`,
    `"${r.regType}"`,
    `"${r.track}"`,
    `"${r.paperTitle.replace(/"/g, '""')}"`,
    `"${r.status}"`,
    `"${r.date}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `TafsirSymposium2026_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Roster Exported', 'Attendee registrations exported as CSV.');
}

function openAddSubmissionModal() {
  const modal = document.getElementById('admin-new-sub-modal');
  if (modal) modal.classList.add('open');
}

function handleAdminNewSubmission(e) {
  e.preventDefault();
  const form = e.target;
  const newReg = {
    id: `reg-${Date.now()}`,
    fullName: form.fullName.value.trim(),
    email: form.email.value.trim(),
    institution: form.institution.value.trim(),
    phone: form.phone.value.trim(),
    regType: form.regType.value,
    track: form.track.value,
    paperTitle: 'Delegate Participation',
    status: form.status.value,
    date: new Date().toISOString().slice(0, 10),
    abstract: form.abstract.value.trim() || 'Registered via Admin Directorate.'
  };

  AdminState.registrations.unshift(newReg);
  saveAdminState('registrations');
  renderAdminRegistrationsTable();
  renderAdminMetrics();
  closeModal('admin-new-sub-modal');
  form.reset();
  showToast('Registration Added', `Registration record created for ${newReg.fullName}.`);
}

// ==========================================
// MODAL & TOAST HELPERS
// ==========================================

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
  }
}

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

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
      modal.classList.remove('open');
    });
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initAdminStorage();
  renderAdminMetrics();
  renderAdminScheduleTable();
  renderAdminSpeakersTable();
  renderAdminRegistrationsTable();
  setupDropzone();
  setupSpeakerDropzone();

  const regSearchInput = document.getElementById('admin-reg-search');
  if (regSearchInput) {
    regSearchInput.addEventListener('input', renderAdminRegistrationsTable);
  }
});

// Cross-tab synchronization
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEYS.SPEAKERS) {
    AdminState.speakers = JSON.parse(e.newValue || '[]');
    renderAdminSpeakersTable();
    renderAdminMetrics();
  } else if (e.key === STORAGE_KEYS.SCHEDULE) {
    AdminState.schedule = JSON.parse(e.newValue || '[]');
    renderAdminScheduleTable();
    renderAdminMetrics();
  } else if (e.key === STORAGE_KEYS.REGISTRATIONS) {
    AdminState.registrations = JSON.parse(e.newValue || '[]');
    renderAdminRegistrationsTable();
    renderAdminMetrics();
  }
});
