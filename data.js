/**
 * Tafsir Symposium 2026 - Initial Data Store
 * Department of Tafsīr and Quranic Studies, Ma'din Academy & SABCeR
 */

// Public Program Schedule (Event Timetable / Agenda)
const INITIAL_SCHEDULE = [
  {
    id: "schedule-101",
    timeStart: "06:30 AM",
    timeEnd: "08:00 AM",
    title: "Inaugural Exegesis & Address | പ്രാരംഭ ദർസ്",
    speaker: "Sheikhuna Badrussādat Al Ustad",
    chair: "Department of Tafsīr and Quranic Studies",
    track: "Classical Usul",
    venue: "Main Auditorium",
    description: "Inaugural spiritual assembly and Quranic exegesis discourse.",
    abstract: "Opening spiritual and scholastic session inaugurating the symposium proceedings with Sheikhuna Badrussādat Al Ustad.",
    status: "published"
  },
  {
    id: "schedule-102",
    timeStart: "09:00 AM",
    timeEnd: "10:00 AM",
    title: "മഫാതീഹുൽ ഗൈബ് : ഇമാം റാസി (റ) യുടെ മൻഹജ്",
    speaker: "Shafi Saquafi Ustād Mundambra",
    chair: "Academic Board",
    track: "Classical Usul",
    venue: "Main Auditorium",
    description: "Mafātīh al-Ghayb: A critical study of Imam Fakhr al-Dīn al-Rāzī's hermeneutical methodology (Manhaj).",
    abstract: "Critical analysis of Tafsir al-Kabir (Mafatih al-Ghayb), examining Imam al-Razi's methodologies.",
    status: "published"
  },
  {
    id: "schedule-103",
    timeStart: "10:00 AM",
    timeEnd: "11:15 AM",
    title: "ഇൽമുത്തഫ്സീർ, ത്വബഖാതുൽ മുഫസിറീൻ",
    speaker: "അഹ്മദ് സഖാഫി മമ്പീതി ഉസ്താദ് & Hakeem Adany ഉസ്താദ്",
    chair: "Academic Board",
    track: "Classical Usul",
    venue: "Main Auditorium",
    description: "Ilm al-Tafsīr & Ṭabaqāt al-Mufassirīn: Evolution of exegetical sciences and tiers of classical commentators.",
    abstract: "Scholastic survey on the epistemological framework of Ilm al-Tafsir and the chronological tiers of commentators.",
    status: "published"
  },
  {
    id: "schedule-104",
    timeStart: "11:15 AM",
    timeEnd: "11:30 AM",
    title: "Intermission & Scholarly Networking | BREAK",
    speaker: "Symposium Hospitality Committee",
    chair: "Hospitality Directorate",
    track: "Classical Usul",
    venue: "Hospitality Pavilion",
    description: "Short intermission allowing attendees and scholars to interact.",
    abstract: "Short academic intermission allowing delegates and scholars to interact.",
    status: "published"
  },
  {
    id: "schedule-105",
    timeStart: "11:30 AM",
    timeEnd: "01:00 PM",
    title: "Paper Presentation: ഇൽമുത്തഫ്സീറിലെ കേരളീയ സംഭാവനകൾ",
    speaker: "Nasrudheen Adany Ustad",
    chair: "SABCeR Research Directorate",
    track: "Contemporary Hermeneutics",
    venue: "Main Auditorium",
    description: "Paper presentation on Kerala's historic and scholarly contributions to Ilm al-Tafsīr.",
    abstract: "Research session exploring Malabar Quranic commentaries and manuscript heritage in Kerala.",
    status: "published"
  },
  {
    id: "schedule-106",
    timeStart: "01:00 PM",
    timeEnd: "02:00 PM",
    title: "Lunch BREAK & Midday Prayers",
    speaker: "Symposium Hospitality Committee",
    chair: "Ma'din Central Campus",
    track: "Contemporary Hermeneutics",
    venue: "Dining Hall & Grand Mosque",
    description: "Luncheon and congregational midday prayer.",
    abstract: "Midday prayer assembly followed by delegate luncheon.",
    status: "published"
  },
  {
    id: "schedule-107",
    timeStart: "02:00 PM",
    timeEnd: "03:30 PM",
    title: "ആധുനിക തഫ്‌സീറുകൾ: സമീപിക്കേണ്ട രീതി ശാസ്‌ത്രം",
    speaker: "ഫൈസൽ അഹ്‌സനി രണ്ടത്താണി & Swalih Adany Edakkara",
    chair: "Contemporary Review Panel",
    track: "Contemporary Hermeneutics",
    venue: "Main Auditorium",
    description: "Modern Exegesis: Hermeneutical approaches, methodological frameworks, and evaluation.",
    abstract: "Analytical session investigating modern Tafsir works and evaluating methodological rigor.",
    status: "published"
  },
  {
    id: "schedule-108",
    timeStart: "03:30 PM",
    timeEnd: "04:30 PM",
    title: "An Exordium to Ilm al-Tafsīr (ഇൽമുത്തഫ്സീർ: ഒരാമുഖം)",
    speaker: "Ustād C Muhammed Faizy",
    chair: "Symposium Directorate",
    track: "Valedictory",
    venue: "Main Auditorium Complex",
    description: "Foundational exposition on Ilm al-Tafsīr and symposium valedictory address.",
    abstract: "Synthesizing the core epistemic foundations of Ilm al-Tafsir and valedictory resolutions.",
    status: "published"
  }
];

// Selectable Registration Sessions (Managed in Session Manager for Delegate Registrations)
const INITIAL_SESSIONS = [
  {
    id: "sess-201",
    title: "General Academic Session 2026",
    ledBy: "Sheikhuna Badrussādat Al Ustad & Department Board",
    timeSlot: "09:00 AM – 04:30 PM",
    venue: "Main Auditorium Complex",
    participantLimit: 100,
    description: "Full day delegate participation in all paper sessions and plenary discussions.",
    status: "published"
  }
];

const INITIAL_SPEAKERS = [
  {
    id: "spk-101",
    name: "Sheikhuna Badrussādat Al Ustad",
    role: "Chief Patron & Keynote Plenary Chair",
    affiliation: "Department of Tafsīr and Quranic Studies, Ma'din Academy",
    topic: "Preserving Sanad and Epistemic Continuity in Contemporary Quranic Hermeneutics",
    bio: "Eminent scholar of classical Exegesis and Arabic philology, guiding higher theological research and manuscript studies for over three decades.",
    image: "element.png"
  },
  {
    id: "spk-102",
    name: "Dr. Sayyid Ibrahim Khaleel Al-Bukhari",
    role: "Founder & Chancellor",
    affiliation: "Ma'din Academy & President, Malabar Islamic Council",
    topic: "Bridging Classical Islamic Erudition and Modern Inter-Civilizational Discourse",
    bio: "Renowned educator, humanitarian, and leader overseeing 50+ academic institutions educating over 25,000 students globally.",
    image: "MA'DIN ACADEMY LOGO.png"
  },
  {
    id: "spk-103",
    name: "Shafi Saquafi Ustād Mundambra",
    role: "Senior Scholar & Author",
    affiliation: "Department of Tafsīr and Quranic Studies & SABCeR",
    topic: "Critical Methodology (Manhaj) in Mafātīh al-Ghayb of Imam Fakhr al-Dīn al-Rāzī",
    bio: "Specialist in rational theology (Kalam) and exegesis, with extensive publications on classical exegetical methodologies.",
    image: "SABCeR-06.png"
  },
  {
    id: "spk-104",
    name: "Nasrudheen Adany Ustad",
    role: "Research Fellow & Lecturer",
    affiliation: "SABCeR Research Directorate",
    topic: "Kerala's Historic Contributions to Ilm al-Tafsīr and Arabic Exegetical Literature",
    bio: "Historian of Islamic sciences in Malabar, researching Arabic-Malayalam exegetical manuscripts and regional commentary traditions.",
    image: "element.png"
  }
];

const INITIAL_GALLERY = [];
const INITIAL_REGISTRATIONS = [];
