/**
 * Tafsir Symposium 2026 - Initial Data Store
 * Department of Quranic Exegesis, Ma'din Academy & SABCeR
 */

const INITIAL_SCHEDULE = [
  {
    id: "session-1",
    timeStart: "09:00 AM",
    timeEnd: "09:30 AM",
    title: "Registration & Opening Reception",
    speaker: "Symposium Secretariat & Welcome Delegates",
    chair: "Office of Academic Affairs, Ma'din Academy",
    track: "Classical Usul",
    venue: "Grand Atrium / Hall A",
    description: "Distribution of symposium kits, research proceedings volume I, delegate credential badges, and ceremonial welcome coffee.",
    status: "published",
    abstract: "Welcoming scholars, researchers, and postgraduate fellows from over 18 international universities. Introduction of symposium themes, protocol guidelines, and schedule overview."
  },
  {
    id: "session-2",
    timeStart: "09:30 AM",
    timeEnd: "10:15 AM",
    title: "Inaugural Keynote Address: Hermeneutical Horizons in Contemporary Quranic Studies",
    speaker: "Dr. Sayyid Ibrahim Khaleel Al-Bukhari & Dr. Fatima Al-Zahra",
    chair: "Prof. Dr. Tariq Al-Mansoor",
    track: "Classical Usul",
    venue: "Main Auditorium Complex",
    description: "Opening keynote charting the trajectory of Quranic exegesis from classical codices to 21st-century epistemological challenges.",
    status: "published",
    abstract: "This keynote explores the generative tension between classical exegesis (Tafsir bil-Ma'thur) and contemporary linguistic hermeneutics. It delineates how classical interpretive methodologies provide robust semantic anchors against subjective over-interpretation while engaging with modern philosophical paradigms."
  },
  {
    id: "session-3",
    timeStart: "10:30 AM",
    timeEnd: "12:30 PM",
    title: "Technical Session I: Methodological Continuities in Classical Exegesis",
    speaker: "Prof. Dr. Tariq Al-Mansoor, Dr. Hisham Al-Qadi, Dr. Zaynab Mansoori",
    chair: "Dr. Sayyid Ahmed Bukhari Center Chair",
    track: "Classical Usul",
    venue: "Seminar Hall 1",
    description: "Critical inquiry into foundational tafsir texts (al-Tabari, al-Razi, al-Qurtubi, and Ibn Ashur) and the evolution of hermeneutic rules.",
    status: "published",
    abstract: "This session presents peer-reviewed research analyzing the rigorous textual and semantic continuity within classical Usul al-Tafsir. Papers investigate the role of Isnad validation, Arabic syntax as an interpretive boundary, and the reception history of multi-layered classical commentaries."
  },
  {
    id: "session-4",
    timeStart: "12:30 PM",
    timeEnd: "02:00 PM",
    title: "Lunch & Midday Prayers (Salat al-Dhuhr)",
    speaker: "Symposium Hospitality Committee",
    chair: "Ma'din Central Campus",
    track: "Classical Usul",
    venue: "Dining Pavilion & Grand Mosque",
    description: "Traditional Malabar scholarly luncheon, networking amongst international delegates, and congregational midday prayer.",
    status: "published",
    abstract: "An informal collegiate exchange session allowing postgraduate researchers and keynote speakers to interact, discuss collaborative publishing, and explore research fellowships."
  },
  {
    id: "session-5",
    timeStart: "02:00 PM",
    timeEnd: "03:45 PM",
    title: "Technical Session II: Applied Quranic Hermeneutics & Global Challenges",
    speaker: "Prof. Dr. Abdul Rahman Al-Khatib, Dr. Amina El-Shazly, Dr. Faruq Malik",
    chair: "Dr. Fatima Al-Zahra (Oxford / Al-Azhar)",
    track: "Contemporary Hermeneutics",
    venue: "Auditorium Hall A",
    description: "Exploration of contemporary thematic tafsir (Tafsir Mawdu'i) in bioethics, ecological stewardship, computational linguistics, and social justice.",
    status: "published",
    abstract: "Session II addresses applied contemporary exegesis. Scholars present papers on algorithmic semantic analysis of Quranic vocabulary, bioethical rulings derived from foundational Quranic principles, and the Quranic environmental ethic in the Anthropocene."
  },
  {
    id: "session-6",
    timeStart: "04:00 PM",
    timeEnd: "04:45 PM",
    title: "Valedictory Session & Best Research Paper Award",
    speaker: "Joint Directorate of Ma'din Academy & SABCeR",
    chair: "Chancellor & Academic Board",
    track: "Valedictory",
    venue: "Main Auditorium Complex",
    description: "Presentation of the SABCeR 2026 Young Researcher Award, announcement of the 2026 Symposium Resolution, and distribution of certificates.",
    status: "published",
    abstract: "Concluding plenary session summarizing the academic findings of the symposium. Release of the peer-reviewed conference communique and launch of the Ma'din Journal of Quranic Studies special issue."
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
