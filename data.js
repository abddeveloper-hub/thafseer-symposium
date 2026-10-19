/**
 * Tafsir Symposium 2026 - Initial Data Store
 * Department of Quranic Exegesis, Ma'din Academy & SABCeR
 */

const INITIAL_SCHEDULE = [
  {
    id: "session-1",
    timeStart: "06:30 AM",
    timeEnd: "08:00 AM",
    title: "Inaugural Exegesis & Spiritual Address | പ്രാരംഭ ദർസ്",
    speaker: "Sheikhuna Badrussādat Al Ustad",
    chair: "Department of Quranic Exegesis, Ma'din Academy",
    track: "Classical Usul",
    venue: "Main Auditorium Complex",
    description: "Inaugural spiritual assembly and opening Quranic exegesis discourse by Sheikhuna Badrussādat Al Ustad.",
    status: "published",
    abstract: "Opening spiritual and scholastic session inaugurating the symposium proceedings with traditional Sanad-based exegesis by Sheikhuna Badrussādat Sayyid Ibrahim Khaleel Al-Bukhari."
  },
  {
    id: "session-2",
    timeStart: "09:00 AM",
    timeEnd: "10:00 AM",
    title: "മഫാതീഹുൽ ഗൈബ് : ഇമാം റാസി (റ) യുടെ മൻഹജ്",
    speaker: "Shafi Saquafi Ustād Mundambra",
    chair: "Academic Board",
    track: "Classical Usul",
    venue: "Main Auditorium",
    description: "Mafātīh al-Ghayb: A critical study of Imam Fakhr al-Dīn al-Rāzī's hermeneutical methodology (Manhaj).",
    status: "published",
    abstract: "Critical analysis of Tafsir al-Kabir (Mafatih al-Ghayb), examining Imam al-Razi's rational, philosophical, theological, and linguistic methodologies in classical Quranic commentary."
  },
  {
    id: "session-3",
    timeStart: "10:00 AM",
    timeEnd: "11:15 AM",
    title: "ഇൽമുത്തഫ്സീർ, ത്വബഖാതുൽ മുഫസിറീൻ",
    speaker: "അഹ്മദ് സഖാഫി മമ്പീതി ഉസ്താദ് & Hakeem Adany ഉസ്താദ്",
    chair: "Academic Board",
    track: "Classical Usul",
    venue: "Main Auditorium",
    description: "Ilm al-Tafsīr & Ṭabaqāt al-Mufassirīn: Evolution of exegetical sciences and generational tiers of classical commentators.",
    status: "published",
    abstract: "Comprehensive scholastic survey on the epistemological framework of Ilm al-Tafsir and the chronological tiers (Tabaqat) of major Quranic commentators from early Islam through classical eras."
  },
  {
    id: "session-break-1",
    timeStart: "11:15 AM",
    timeEnd: "11:30 AM",
    title: "Morning Intermission & Scholarly Networking",
    speaker: "Symposium Hospitality Committee",
    chair: "Hospitality Directorate",
    track: "Classical Usul",
    venue: "Hospitality Pavilion",
    description: "Morning coffee, traditional Malabar tea, and informal scholastic networking.",
    status: "published",
    abstract: "Short academic intermission allowing attendees, researchers, and scholars to interact and discuss research presentations."
  },
  {
    id: "session-4",
    timeStart: "11:30 AM",
    timeEnd: "01:00 PM",
    title: "Paper Presentation: ഇൽമുത്തഫ്സീറിലെ കേരളീയ സംഭാവനകൾ",
    speaker: "Nasrudheen Adany Ustad",
    chair: "SABCeR Research Directorate",
    track: "Contemporary Hermeneutics",
    venue: "Main Auditorium",
    description: "Scholarly Paper Presentation on Kerala's Historic and Scholarly Contributions to Ilm al-Tafsīr.",
    status: "published",
    abstract: "Peer-reviewed research session exploring indigenous Malabar Arabic and Malayalam Quranic commentaries, local pedagogical traditions, and manuscript heritage in Kerala."
  },
  {
    id: "session-break-2",
    timeStart: "01:00 PM",
    timeEnd: "02:00 PM",
    title: "Luncheon & Midday Prayers (Salat al-Dhuhr)",
    speaker: "Symposium Hospitality Committee",
    chair: "Ma'din Central Campus",
    track: "Contemporary Hermeneutics",
    venue: "Dining Pavilion & Grand Mosque",
    description: "Traditional Malabar luncheon and congregational midday prayer at the Grand Mosque.",
    status: "published",
    abstract: "Midday prayer assembly followed by delegate luncheon and collegiate exchange."
  },
  {
    id: "session-5",
    timeStart: "02:00 PM",
    timeEnd: "03:30 PM",
    title: "ആധുനിക തഫ്സീറുകൾ: സമീപിക്കേണ്ട രീതി ശാസ്ത്രം",
    speaker: "ഫൈസൽ അഹ്സനി രണ്ടത്താണി & Swalih Adany Edakkara",
    chair: "Contemporary Studies Review Panel",
    track: "Contemporary Hermeneutics",
    venue: "Main Auditorium",
    description: "Modern Exegesis: Hermeneutical Approaches, Methodological Frameworks, and Critical Evaluation.",
    status: "published",
    abstract: "In-depth analytical session investigating 20th and 21st-century modern Tafsir works, evaluating ideological currents, methodological rigor, and interpretive boundaries."
  },
  {
    id: "session-6",
    timeStart: "03:30 PM",
    timeEnd: "04:30 PM",
    title: "An Exordium to Ilm al-Tafsīr (ഇൽമുത്തഫ്സീർ: ഒരാമുഖം)",
    speaker: "Ustād C Muhammed Faizy",
    chair: "Symposium Directorate & Academic Board",
    track: "Valedictory",
    venue: "Main Auditorium Complex",
    description: "Foundational exposition on Ilm al-Tafsīr, epistemic continuity, and symposium valedictory address.",
    status: "published",
    abstract: "Authoritative discourse synthesizing the core epistemic foundations of Ilm al-Tafsir, followed by the symposium valedictory summary and resolutions."
  }
];

const INITIAL_SPEAKERS = [
  {
    id: "spk-1",
    name: "Dr. Sayyid Ibrahim Khaleel Al-Bukhari",
    role: "Chairman & Keynote Plenary Patron",
    affiliation: "Ma'din Academy & Chancellor, Jamia Ma'din",
    image: "assets/images/speaker-1.jpg",
    bio: "Visionary academic leader, educator, and peace advocate who founded Ma'din Academy in 1997. He has spearheaded international scholarly forums across Asia, the Middle East, and Europe.",
    topic: "Preserving Sanad and Epistemic Integrity in Modern Islamic Academia"
  },
  {
    id: "spk-2",
    name: "Dr. Fatima Al-Zahra",
    role: "Chair of Quranic Hermeneutics",
    affiliation: "Al-Azhar University / Senior Visiting Fellow, Oxford",
    image: "assets/images/speaker-2.jpg",
    bio: "Renowned specialist in classical Arabic semantic networks, rhetoric (Balagha), and gender discourse in Islamic interpretive traditions. Author of four seminal monographs on classical Tafsir.",
    topic: "Thematic Tafsir (Mawdu'i): Methodological Principles and Modern Application"
  },
  {
    id: "spk-3",
    name: "Prof. Dr. Tariq Al-Mansoor",
    role: "Dean of Faculty of Usul al-Din",
    affiliation: "International Islamic University",
    image: "assets/images/speaker-3.jpg",
    bio: "Distinguished jurist and exegete specializing in the intersections of Usul al-Fiqh and Usul al-Tafsir. Advisory board member for the Encyclopaedia of the Quran.",
    topic: "Methodological Continuities in Classical Exegesis: Tabari to Ibn Ashur"
  },
  {
    id: "spk-4",
    name: "Prof. Dr. Abdul Rahman Al-Khatib",
    role: "Director of Computational Quranic Linguistics",
    affiliation: "Center for Arabic Language Technology, Istanbul University",
    image: "assets/images/speaker-4.jpg",
    bio: "Pioneer in natural language processing (NLP) applied to classical Quranic Arabic texts. Leading large-scale digital corpus tagging initiatives for classical exegesis.",
    topic: "Digital Tools & Computational Linguistics: Mapping Polysemy in the Quran"
  }
];

const INITIAL_GALLERY = [
  {
    id: "gal-1",
    title: "Inaugural Plenary Assembly & Academic Conclave",
    category: "Inauguration",
    image: "assets/images/gallery-1.jpg",
    timestamp: "Oct 21, 2026 • 09:45 AM",
    description: "Opening convocation at the Grand Auditorium Complex with over 1,200 scholars, university chancellors, and delegates in attendance."
  },
  {
    id: "gal-2",
    title: "High-Level Scholarly Panel on Modern Hermeneutics",
    category: "Scholarly Panels",
    image: "assets/images/gallery-2.jpg",
    timestamp: "Oct 21, 2026 • 11:15 AM",
    description: "Distinguished international panelists discussing the role of classical Arabic linguistic frameworks in contemporary philosophical inquiries."
  },
  {
    id: "gal-3",
    title: "Technical Paper Presentation: Morpho-Syntactic Analysis",
    category: "Paper Presentations",
    image: "assets/images/gallery-3.jpg",
    timestamp: "Oct 21, 2026 • 02:30 PM",
    description: "Research fellow delivering an empirical paper on computational syntax and discourse analysis in Surah Al-Fatiha."
  },
  {
    id: "gal-4",
    title: "Rare Classical Quranic Manuscripts & Research Poster Exhibition",
    category: "Posters & Exhibits",
    image: "assets/images/gallery-4.jpg",
    timestamp: "Oct 21, 2026 • 03:15 PM",
    description: "Delegates reviewing 14th-century Andalusian and Ottoman Tafsir manuscripts alongside contemporary algorithmic linguistics posters."
  }
];

const INITIAL_REGISTRATIONS = [
  {
    id: "reg-101",
    fullName: "Dr. Hamza Al-Farouqi",
    email: "h.farouqi@quranstudies.edu",
    institution: "Hamad Bin Khalifa University, Qatar",
    phone: "+974 5512 8904",
    regType: "Paper Presenter",
    track: "Classical Usul",
    paperTitle: "Syntactic Ambiguity and Exegetical Plurality in Al-Kashshaf",
    status: "Accepted",
    date: "2026-10-14",
    abstract: "An examination of Zamakhshari's grammatical justifications for divergent theological interpretations in Surah Al-Baqarah."
  },
  {
    id: "reg-102",
    fullName: "Maryam Salih, M.Phil.",
    email: "maryam.salih@ox.ac.uk",
    institution: "University of Oxford, UK",
    phone: "+44 7911 123456",
    regType: "Paper Presenter",
    track: "Contemporary Hermeneutics",
    paperTitle: "Ecotheology in Tafsir: An Ecological Reading of Surah Al-An'am",
    status: "Accepted",
    date: "2026-10-15",
    abstract: "Developing a structured thematic exegetical framework for climate ethics based on Quranic mizan (balance) and fasad (corruption)."
  },
  {
    id: "reg-103",
    fullName: "Zayd Muhammad Noor",
    email: "zayd.noor@iium.edu.my",
    institution: "International Islamic University Malaysia",
    phone: "+60 12 345 6789",
    regType: "Paper Presenter",
    track: "Contemporary Hermeneutics",
    paperTitle: "Large Language Models & Classical Arabic Tafsir: A Benchmark Evaluation",
    status: "Under Review",
    date: "2026-10-17",
    abstract: "Assessing zero-shot and fine-tuned transformers on answering classical Usul al-Tafsir queries against Tabari and Razi."
  },
  {
    id: "reg-104",
    fullName: "Prof. Dr. Khalid Bin Mansoor",
    email: "khalid.mansoor@alazhar.edu.eg",
    institution: "Al-Azhar University, Cairo",
    phone: "+20 100 234 5678",
    regType: "Delegate",
    track: "Classical Usul",
    paperTitle: "N/A (Attendee Delegate)",
    status: "Accepted",
    date: "2026-10-18",
    abstract: "Attending as institutional observer and representative of the Council of Quranic Exegesis."
  },
  {
    id: "reg-105",
    fullName: "Ayesha Siddiqa",
    email: "ayesha.siddiqa@jnu.ac.in",
    institution: "Jawaharlal Nehru University, New Delhi",
    phone: "+91 98471 23456",
    regType: "Student",
    track: "Classical Usul",
    paperTitle: "Colonial-Era Quranic Translations in the Indian Subcontinent",
    status: "Under Review",
    date: "2026-10-18",
    abstract: "Comparative analysis of Urdu and English exegeses produced during the late 19th and early 20th centuries."
  }
];
